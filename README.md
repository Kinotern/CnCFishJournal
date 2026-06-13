# Cast n Chill Fish Journal
快速进入：
Kinotern.github.io/CnCFishJournal


这是一个基于《Cast n Chill》本地 Unity 资源整理出来的鱼类图鉴网页。页面尽量复刻游戏内图鉴的像素书本界面，并使用真实鱼类数据、地点顺序、鱼类缩略图、鱼类大图、钓竿图标、钓饵图标和出现时间图标。

## 入口

- 打开 `fish_journal.html` 即可使用。
- 页面默认按 PC 端 200% 比例显示。
- 支持中文/英文切换。

## 项目文件

- `fish_journal.html`：网页入口，包含布局、样式和交互逻辑。
- `fishdata.js`：鱼类数据和地点分组数据。
- `sprites/`：网页使用的 PNG 素材。
- `sprites/game/time/`：游戏中的出现时间图标。
- `zpix.ttf`：像素字体。
- `cast_n_chill_localization.json`：游戏本地化参考数据。
- `image_map.json`：素材映射参考数据。
- `DEVELOPMENT.md`：开发和维护说明。

## 功能

- 按游戏地点顺序展示鱼类。
- 支持按钓场、名称、稀有度排序。
- 左页显示选中鱼类的大图、稀有度、钓竿、钓饵、钓点、区域、出现时间、尺寸、长度和重量。
- 右页使用游戏中的鱼类缩略图和缩略框。
- 图片禁止拖拽，避免影响点击体验。

## 数据说明

当前数据来自游戏资源提取结果：

- 鱼类数量：68
- 地点分组：17
- 地点鱼类槽位：85
- 当前 PNG 素材数量：186

同一种鱼可能出现在多个钓点中。右页按钓点槽位展示，不只展示唯一鱼种。

## 引用

本项目引用和依赖以下资源：

- 游戏安装目录：`O:\SteamLibrary\steamapps\common\Cast n Chill`
- 鱼类和地点数据资源包：`O:\SteamLibrary\steamapps\common\Cast n Chill\castnchill_Data\StreamingAssets\aa\StandaloneWindows64\build#prod_assets_all.bundle`
- 时间图标资源包：`O:\SteamLibrary\steamapps\common\Cast n Chill\castnchill_Data\StreamingAssets\aa\StandaloneWindows64\core_assets_all.bundle`
- 游戏截图参考：`O:\SteamLibrary\steamapps\common\Cast n Chill\3483740_47.jpg`
- 开发说明：`DEVELOPMENT.md`

本项目仅用于本地整理和查看游戏图鉴信息，方便游玩时查询鱼类、钓点、装备和出现时间。游戏素材版权归原游戏及其权利方所有。
