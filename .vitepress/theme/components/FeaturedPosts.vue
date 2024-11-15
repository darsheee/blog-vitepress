<template>
  <div class="featured-posts">
    <div class="divider"></div>
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
</template>

<script setup>
import { featuredPosts } from "../data/featuredPosts.js";
</script>

<style scoped>
.featured-posts {
  max-width: 1152px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.divider {
  margin-top: 40px;
  height: 1px;
  background-color: var(--vp-c-divider);
  margin-bottom: 2rem;
}

.featured-posts h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
  font-size: 1.5rem;
}

.featured-posts h3 {
  margin-bottom: 2rem;
  font-weight: 500;
  font-size: 1.5rem;
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
