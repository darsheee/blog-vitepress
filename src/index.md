---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "云朵角落"
  text: "Honahec's Blog"
  tagline: 好记性不如烂笔头
  actions:
    - theme: brand
      text: 关于我
      link: /about
    - theme: alt
      text: Blog
      link: /blog
    - theme: alt
      text: 个人导览页
      link: https://honahec.cc

features:
  - title: VitePress
    details: 本站基于VitePress搭建
  - title: Giscus
    details: 使用Giscus评论系统
  - title: 学习记录
    details: 计算机、物理、数学...
  - title: To be continue...
    details: 希望接收到一些完善建议
---

<script setup>
const featuredPosts = [
  {
    title: 'Nginx 教程',
    description: '详细介绍了 Nginx 的安装、配置和使用方法',
    link: '/blog/nginx',
    date: '2024-11-10'
  },
  {
    title: 'Git 教程',
    description: '最全面的 Git 使用教程',
    link: '/blog/git',
    date: '2024-11-10'
  }
]
</script>

<div class="featured-posts">
  <h2>精选文章</h2>
  <div class="post-grid">
    <div v-for="post in featuredPosts" :key="post.link" class="post-card">
      <a :href="post.link" class="post-link">
        <h3>{{ post.title }}</h3>
        <p class="post-desc">{{ post.description }}</p>
        <span class="post-date">{{ post.date }}</span>
      </a>
    </div>
  </div>
</div>

<style scoped>
.featured-posts {
  max-width: 1152px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.featured-posts h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.post-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.post-link {
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
}

.post-link h3 {
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: var(--vp-c-brand-1);
}

.post-desc {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.post-date {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}
</style>
