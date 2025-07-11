# 红姐大魔王 - 恐怖风格Match3游戏

基于网红事件"南京红姐"改编的恐怖风格Match3消除游戏，使用TypeScript和PixiJS开发，采用RobotlegsJS微架构设计。

![cover](img_cover_match3.png)

## 🎮 游戏演示

![gameplay](gif_match3_ts_demo.gif)

## 🩸 恐怖特色

- **恐怖标题**: "红姐大魔王" Canvas自绘滴血字体效果
- **自定义棋子**: 19张个性化头像替换传统宝石
- **特殊效果**: 行消除、列消除、彩虹万能棋子带有独特视觉特效
- **暗黑氛围**: 恐怖背景色调和血红色主题
- **响应式布局**: 完美居中显示，适配各种屏幕

## 🛠️ 技术栈

- **开发语言**: TypeScript
- **图形引擎**: PixiJS
- **架构模式**: RobotlegsJS
- **构建工具**: Webpack
- **测试框架**: Karma + Mocha
- **部署平台**: Vercel

## 📁 项目结构

```
hongJieGame/
├── src/                    # 源代码
│   ├── index.ts           # 入口文件
│   ├── matchthree/        # 游戏核心逻辑
│   └── index.html         # HTML模板
├── assets/                # 游戏资源
│   ├── game_pieces/       # 自定义头像棋子
│   ├── backgrounds/       # 背景图片
│   └── fonts/            # 字体文件
├── test/                  # 测试文件
├── dist/                  # 构建输出
├── vercel.json           # Vercel部署配置
└── DEPLOYMENT.md         # 部署指南
```

## 🚀 快速开始

### 环境要求

- Node.js (推荐v14或更高版本)
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

游戏将在 `http://localhost:8080` 可用

### 构建生产版本

```bash
npm run build
```

### 部署到Vercel

```bash
npm run vercel-build
```

详细部署指南请参考 [DEPLOYMENT.md](DEPLOYMENT.md)

## 🎯 游戏特性

### 核心玩法
- 经典Match3消除玩法
- 流畅的动画效果
- 智能的特殊棋子生成系统
- 完整的评分和星级系统

### 恐怖元素
- 血红色"红姐大魔王"标题
- 暗色恐怖背景氛围
- 自定义头像棋子系统
- 特殊棋子视觉特效

### 技术特色
- Canvas自绘文字效果
- 响应式设计
- 模块化架构
- 完整的测试覆盖

## 🎨 视觉特效系统

### 特殊棋子效果
- **行消除棋子**: 橙色发光边框 + 水平箭头
- **列消除棋子**: 绿色发光边框 + 垂直箭头  
- **彩虹万能棋子**: 多色渐变边框 + 星星装饰

### 恐怖文字渲染
- 自定义Canvas绘制系统
- 血液滴落效果
- 多层阴影渲染
- 字母扭曲变形

## 🌐 在线体验

- **生产环境**: [https://hong-jie-game.vercel.app](https://hong-jie-game.vercel.app)
- **开发分支**: [https://hong-jie-game-git-dev.vercel.app](https://hong-jie-game-git-dev.vercel.app)

## ⚠️ 免责声明

### 内容说明
本游戏基于网络热点事件"南京红姐"进行创意改编，采用恐怖风格设计。游戏内容纯属虚构，与现实人物、事件无关。

### 使用条款
- **仅供娱乐**: 本游戏仅用于娱乐和技术展示目的
- **禁止商用**: 严禁将本游戏用于任何商业用途
- **教育目的**: 可用于编程学习和技术交流
- **开源协议**: 遵循MIT开源协议

### 法律声明
- 游戏开发者不承担因使用本游戏而产生的任何法律责任
- 如有侵权或不当内容，请联系开发者及时处理
- 本游戏不代表开发者的政治立场或价值观念

### 适用人群
- 建议18岁以上用户游玩
- 对恐怖元素敏感者请谨慎体验
- 仅限具备独立判断能力的成年人使用

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进游戏：

1. Fork本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

## 👨‍💻 开发者

**HongJie Game Development Team**

- 游戏设计与开发
- 恐怖视觉效果设计
- 技术架构实现

---

**⚠️ 重要提醒**: 本游戏仅供娱乐和学习使用，请勿用于商业用途。如有任何问题或建议，欢迎通过GitHub Issues联系我们。