# 友链

## 朋友们

<script setup>
import { friends } from '../../.vitepress/theme/friends.js'
</script>

<div class="friends-wrapper">
  <div v-for="friend in friends" :key="friend.link" class="friend-card">
    <a :href="friend.link" target="_blank" rel="noopener noreferrer">
      <img :src="friend.avatar" :alt="friend.name" class="friend-avatar">
      <div class="friend-info">
        <h3>{{ friend.name }}</h3>
        <p>{{ friend.description }}</p>
      </div>
    </a>
  </div>
</div>

<style scoped>
.friends-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.friend-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.3s;
}

.friend-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.friend-card a {
  display: flex;
  padding: 16px;
  text-decoration: none;
  color: inherit;
}

.friend-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 16px;
}

.friend-info h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.friend-info p {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
</style>

## 友链申请

> TODO