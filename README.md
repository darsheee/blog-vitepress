# 基于 VitePress 的个人博客

## 项目结构

```
blog
├── .vitepress
│   ├── config.mjs
│   └── theme
│       ├── index.css
│       └── layout.vue
```

## 使用说明

1. 拉下仓库
2. `pnpm install` 安装依赖
3. `pnpm docs:dev` 启动 dev
4. `pnpm docs:build` 构建
5. （可选）配置 Nginx 到 dist 文件夹
