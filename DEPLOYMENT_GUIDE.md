# 🚀 部署指南

## Google Analytics 配置

### 1. 获取 Google Analytics ID

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建新的属性或使用现有属性
3. 获取测量ID（格式：G-XXXXXXXXXX）

## Google AdSense 配置

### 1. AdSense 集成

- **客户端ID**: `ca-pub-2388810610392492`
- **已集成**: 自动广告和手动广告位
- **追踪**: AdSense加载状态追踪

### 2. 配置 Analytics ID

在部署前，请修改 `src/config.js` 文件：

```javascript
window.CONFIG = {
    GA_MEASUREMENT_ID: 'G-YOUR-ACTUAL-ID', // 替换为你的实际GA ID
    // ... 其他配置
};
```

### 3. 部署到 Netlify

1. 连接 GitHub 仓库到 Netlify
2. 设置构建命令：`npm run build`
3. 设置发布目录：`dist`
4. 域名已配置为：`https://game.nzpowercompare.com`

## SEO 优化清单

### ✅ 已完成
- [x] Meta标签优化（title, description, keywords）
- [x] Open Graph标签（社交媒体分享）
- [x] Twitter Card标签
- [x] Sitemap.xml
- [x] Robots.txt
- [x] PWA Manifest
- [x] Favicon和图标
- [x] Google Analytics集成
- [x] 结构化数据准备

### 📋 部署后需要做的
- [ ] 在Google Search Console中提交sitemap
- [ ] 在百度站长工具中提交sitemap
- [ ] 设置Google Analytics目标和转化
- [ ] 监控Core Web Vitals
- [ ] 设置社交媒体分享测试

## 性能优化建议

1. **图片优化**：考虑将favicon转换为WebP格式
2. **CDN**：使用Netlify的全球CDN
3. **缓存策略**：设置适当的缓存头
4. **压缩**：启用Gzip/Brotli压缩

## 监控和分析

### Google Analytics 事件追踪
- `page_load`: 页面加载完成
- `game_start`: 游戏开始
- `engagement`: 用户参与度（每分钟）
- `adsense_loaded`: AdSense加载成功

### AdSense 收益优化
- **自动广告**: 已启用，Google自动优化位置
- **手动广告位**: 可在游戏界面添加横幅广告
- **移动端优化**: 响应式广告设计

### 可以添加的额外事件
- 关卡完成
- 游戏失败
- 特殊道具使用
- 分享行为

## 域名和SSL

确保：
1. 使用HTTPS（Netlify自动提供）
2. 设置自定义域名（可选）
3. 配置重定向规则（如需要）