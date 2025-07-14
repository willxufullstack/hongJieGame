# 红姐大魔王 - Horror Match3 Game

一款以恐怖为主题的三消益智游戏，使用 TypeScript 和 PixiJS 构建，具有独特的恐怖氛围和流畅的游戏体验。

![cover](img_cover_match3.png)

## 🎮 游戏特色

- **经典三消玩法**: 匹配3个或更多相同棋子来消除它们
- **恐怖主题设计**: 
  - 🩸 血腥视觉效果和动画
  - 👻 恐怖文字渲染系统
  - 🌙 阴森的背景和氛围
  - 💀 骷髅加载动画
- **特殊道具系统**: 
  - 行消除器: 清除整行棋子
  - 列消除器: 清除整列棋子  
  - 彩虹棋子: 清除所选颜色的所有棋子
- **多关卡挑战**: 渐进式难度，不同的目标和挑战
- **流畅动画**: 基于PixiJS的高性能动画效果
- **响应式设计**: 完美支持桌面和移动设备
- **计分系统**: 追踪进度和最高分数记录

## 🚀 快速开始

### 环境要求

- Node.js (推荐 v14 或更高版本)
- npm 或 yarn

### 安装步骤

1. 克隆仓库:
```bash
git clone <repository-url>
cd hongjie-horror-match3
```

2. 安装依赖:
```bash
npm install
```

3. 启动开发服务器:
```bash
npm start
```

4. 打开浏览器访问 `http://localhost:8080`

### 其他命令

```bash
# 代码格式化
npm run autoformat

# 运行测试
npm test

# 代码检查
npm run lint
```

## 🛠️ 技术栈

- **TypeScript**: 类型安全的JavaScript开发
- **PixiJS**: 高性能2D WebGL渲染器
- **RobotlegsJS**: 依赖注入和MVC架构框架
- **Webpack**: 模块打包和开发服务器
- **CSS3**: 恐怖主题样式和动画效果
- **自定义恐怖文字渲染器**: 专为恐怖氛围设计的文字效果系统

## 📁 项目结构

```
hongJieGame/
├── src/                           # 源代码
│   ├── index.ts                  # 入口文件
│   ├── index.html               # 主HTML文件（恐怖主题加载页面）
│   └── matchthree/              # 游戏核心逻辑
│       ├── configs/             # 游戏配置
│       ├── events/              # 游戏事件
│       ├── game/               # 核心游戏逻辑
│       │   ├── commands/       # 游戏命令
│       │   ├── displays/       # 显示对象
│       │   ├── managers/       # 游戏管理器
│       │   ├── models/         # 数据模型
│       │   └── utils/          # 游戏工具类
│       ├── mediators/          # 视图中介器
│       ├── services/           # 游戏服务
│       ├── utils/              # 工具类
│       │   ├── HorrorTextRenderer.ts  # 恐怖文字渲染器
│       │   ├── AtlasKeys.ts           # 资源键值管理
│       │   └── PixiFactory.ts         # PixiJS工厂类
│       └── views/              # 游戏视图
│           └── components/     # UI组件
├── assets/                     # 游戏资源
│   ├── atlas/                 # 精灵图集
│   ├── backgrounds/           # 背景图片
│   │   ├── hongjie.jpeg      # 游戏内背景
│   │   └── horror_loading_bg.jpg  # 恐怖加载背景
│   └── fonts/                # 字体文件
├── test/                      # 测试文件
├── package.json              # 项目配置
├── webpack.hongJie.config.js # Webpack配置
└── tsconfig.json             # TypeScript配置
```

## 🎨 恐怖主题特性

### 加载页面
- 使用恐怖背景图片
- 血红色骷髅加载动画
- 滴血文字效果
- 闪烁和发光动画

### 游戏内效果
- 恐怖文字渲染系统支持中英文
- 血滴动画效果
- 阴影和裂纹特效
- 暗色调界面设计

### 文字渲染器功能
- 自动检测中英文字符
- 中文字符血红色发光效果
- 英文字符手绘恐怖效果
- 动态血滴和裂纹装饰

## 🎯 游戏玩法

1. **基础消除**: 交换相邻棋子，形成3个或更多相同棋子的连线
2. **特殊棋子**: 
   - 4个连线生成行/列消除器
   - 5个连线生成彩虹棋子
3. **关卡目标**: 每关都有特定的消除目标和移动次数限制
4. **分数系统**: 连击和特殊消除可获得更高分数

## 🔧 开发架构

本项目采用模块化架构，主要模块包括：

- **游戏管理器**: 游戏状态和流程管理
- **网格系统**: 棋盘网格逻辑
- **棋子系统**: 游戏棋子管理
- **动画系统**: 流畅的动画效果
- **计分系统**: 分数计算和记录
- **恐怖效果系统**: 专门的恐怖主题渲染

## 📱 兼容性

- ✅ 现代桌面浏览器 (Chrome, Firefox, Safari, Edge)
- ✅ 移动设备浏览器 (iOS Safari, Android Chrome)
- ✅ 响应式设计，自适应不同屏幕尺寸

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进游戏！

## 📄 许可证

MIT License

---

**红姐游戏工作室** - 专注恐怖主题游戏开发