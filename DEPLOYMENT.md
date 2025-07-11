# 红姐大魔王游戏 - Vercel部署指南

## 🚀 部署到Vercel

### 方法1: 通过Git仓库部署 (推荐)

1. **确保代码已推送到GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin dev
   ```

2. **在Vercel中导入项目**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 选择您的GitHub仓库 `hongJieGame`
   - 选择 `dev` 分支

3. **配置构建设置**
   - Framework Preset: `Other`
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 方法2: 通过Vercel CLI部署

1. **安装Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel --prod
   ```

## 📁 项目结构

```
hongJieGame/
├── src/                    # 源代码
├── assets/                 # 游戏资源
├── dist/                   # 构建输出 (自动生成)
├── vercel.json            # Vercel配置
├── package.json           # 项目配置
└── webpack.hongJie.config.js # Webpack配置
```

## 🔧 构建配置

- **构建命令**: `npm run vercel-build`
- **输出目录**: `dist/`
- **入口文件**: `src/index.ts`
- **HTML模板**: `src/index.html`

## 🎮 游戏特性

- ✅ 恐怖风格"红姐大魔王"标题
- ✅ 自定义头像棋子 (19张图片)
- ✅ Canvas自绘恐怖文字效果
- ✅ 响应式居中布局
- ✅ 完整的Match3游戏机制

## 🌐 访问地址

部署成功后，游戏将在以下地址可用：
- 生产环境: https://hong-jie-game.vercel.app
- 预览环境: https://hong-jie-game-git-dev.vercel.app

## 🔄 自动部署

每次推送到 `dev` 分支时，Vercel会自动重新部署项目。

## 📝 注意事项

1. 确保所有资源文件路径正确
2. 图片资源会自动优化
3. 支持现代浏览器的Canvas和WebGL
4. 游戏尺寸: 340x480px，自动居中显示