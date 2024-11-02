# 基于VitePress的个人博客

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
3. `pnpm run docs:dev` 启动dev
4. `pnpm run docs:build` 构建
5. （可选）配置Nginx到dist文件夹