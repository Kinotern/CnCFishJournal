const fs = require("fs");
const vm = require("vm");

const patchPath = process.argv[2];
if (!patchPath) {
  console.error("Usage: node apply_time_patch.js time-patch.json");
  process.exit(1);
}

const dataPath = "fishdata.js";
const code = fs.readFileSync(dataPath, "utf8").replace(/^\uFEFF/, "");
const patch = JSON.parse(fs.readFileSync(patchPath, "utf8").replace(/^\uFEFF/, ""));
const sandbox = {};

vm.runInNewContext(
  code
    .replace(/const FISH_DATA\s*=/, "this.FISH_DATA =")
    .replace(/const LOCATION_GROUPS\s*=/, "this.LOCATION_GROUPS ="),
  sandbox
);

const fishIds = new Set(sandbox.FISH_DATA.map((fish) => fish.id));
const unknown = Object.keys(patch).filter((id) => !fishIds.has(id));
if (unknown.length) {
  throw new Error(`Unknown fish id(s): ${unknown.join(", ")}`);
}

sandbox.FISH_DATA.forEach((fish) => {
  const time = patch[fish.id];
  if (!time) return;
  fish.timeIcons = Array.isArray(time.timeIcons) ? time.timeIcons : [];
  fish.timeZh = time.timeZh || "-";
  fish.time = time.time || "-";
});

const output =
  "// Fish journal data extracted from Cast n Chill Unity assets.\n" +
  "const FISH_DATA = " +
  JSON.stringify(sandbox.FISH_DATA, null, 2) +
  ";\n\n" +
  "const LOCATION_GROUPS = " +
  JSON.stringify(sandbox.LOCATION_GROUPS, null, 2) +
  ";\n";

fs.writeFileSync(dataPath, output, "utf8");
console.log(`Applied time patch for ${Object.keys(patch).length} fish.`);
