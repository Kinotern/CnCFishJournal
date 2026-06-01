# Development Notes

本文档记录当前鱼类图鉴网页的结构、维护方式和容易踩坑的位置。

## 目录结构

```text
outputs/
  fish_journal.html
  fishdata.js
  sprites/
  zpix.ttf
  cast_n_chill_localization.json
  image_map.json
  README.md
  DEVELOPMENT.md
```

## 运行方式

这是静态页面，不需要构建工具。直接用浏览器打开：

```text
fish_journal.html
```

如果后续浏览器限制本地资源加载，可以在 `outputs/` 目录启动任意静态文件服务器。

## 核心文件

### `fish_journal.html`

负责页面结构、CSS 和交互逻辑。

重点区域：

- `.book-wrapper`：整体 200% 缩放。
- `.fish-panel`：左页鱼类详情图框。
- `.rarity-text`：稀有度文字。它按 `book_fishpanel.png` 的真实像素坐标放置，当前位置为 `left:80px; top:64px; width:42px; height:7px`。
- `.right-page`：右页鱼类列表。
- `.fish-thumb`：右页鱼类缩略图框，当前框体比原始小 2%。
- `.sort-popup-bg` / `.sort-popup`：排序弹窗，层级必须高于右页排序标签。

交互函数：

- `toggleLang()`：中英文切换。
- `toggleSort()`：打开/关闭排序菜单。
- `sortBy(m)`：切换排序依据。
- `selectFish(fish, group, rerender)`：选中鱼并刷新左页详情。
- `renderGrid()`：渲染右页鱼类列表。

### `fishdata.js`

包含两个全局常量：

- `FISH_DATA`：鱼类数据。
- `LOCATION_GROUPS`：按游戏地点顺序排列的分组数据。

鱼类字段：

- `id`：唯一 ID。
- `order`：鱼类原始顺序。
- `en` / `zh`：英文名和中文名。
- `rarity` / `rarityZh`：稀有度。
- `size` / `sizeZh`：尺寸等级。
- `length` / `lengthZh`：长度范围。
- `weight` / `weightZh`：重量范围。
- `sprite`：详情大图。
- `thumb`：右页像素缩略图。
- `rod` / `rodZh` / `rodIcon`：钓竿名称和图标。
- `lure` / `lureZh` / `lureIcon`：钓饵名称和图标。

地点分组字段：

- `id`：地点 ID。
- `area` / `areaZh`：区域名。
- `spot` / `spotZh`：钓点名。
- `fish`：该钓点下按游戏顺序显示的鱼类 ID。
- `ice`：是否使用冰钓缩略框。

## 素材规则

`sprites/` 里只保留页面实际引用的 PNG。

主要目录：

- `sprites/game/fish/`：鱼类详情大图。
- `sprites/thumbs/`：鱼类缩略图。
- `sprites/game/rods/cropped/`：裁剪后的钓竿图标。原图顶部多余一行已裁掉，只保留完整鱼竿。
- `sprites/game/lures/`：钓饵图标。
- `sprites/game/time/`：从游戏 `core_assets_all.bundle` 导出的时间图标，包括 `time.png`、`timeday.png`、`timedawn.png`、`timedusk.png`、`timenight.png`。
- `sprites/Book_*.png` 和 `sprites/book_*.png`：书本 UI、缩略框、排序菜单等界面素材。

清理 PNG 时必须同时考虑：

- HTML 中直接写死的 `sprites/*.png`。
- `fishdata.js` 中的 `sprite`、`thumb`、`rodIcon`、`lureIcon`。
- JS 动态生成的缩略框文件名：
  - `Book_Thumb_Found_01.png` 到 `Book_Thumb_Found_05.png`
  - `book_thumb_found_ice_01.png` 到 `book_thumb_found_ice_05.png`
  - `book_fishpanel.png`
  - `book_fishpanel_ice.png`
  - `Book_Thumb_Selector.png`
  - `book_icon_foundlocation.png`
  - `game/time/time.png`
  - `game/time/timeday.png`
  - `game/time/timedawn.png`
  - `game/time/timedusk.png`
  - `game/time/timenight.png`

## UI 注意事项
- 中文空状态应为 `请选择一条鱼`。
- 详情标签使用：`钓点`、`区域`、`时间`、`尺寸`、`长度`、`重量`。
- 尺寸、长度、重量必须拆开显示，不要合并成一行。
- 当前 `FishData` 资源里没有直接序列化每条鱼的精确 `timesOfDay` 字段；页面已支持 `timeIcons`、`timeZh`、`time` 字段，缺省显示 `全天 / All day`。如果后续从其他资源定位到精确时段，直接补到 `fishdata.js` 即可。
- 右页按地点槽位展示，同一条鱼允许出现在多个地点。
- 排序弹窗层级要高于右上角排序标签，否则会被覆盖。
- 所有图片应禁止拖拽，避免用户拖动鱼图标或背景图。

## 验证清单

修改后建议检查：

- 打开 `fish_journal.html`，确认页面能直接加载。
- 中文和英文切换正常。
- 排序菜单打开时不会被右上角排序标签盖住。
- 排序选项文字在深色背景上可读。
- 选中鱼后左页详情图、稀有度、钓竿、钓饵、地点、时间、尺寸、长度、重量正常显示。
- 右页每组鱼按游戏地点顺序显示。
- 图片不能被浏览器拖动。
- `sprites/` 中没有未使用 PNG，也没有缺失引用。
