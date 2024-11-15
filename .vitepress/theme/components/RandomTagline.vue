<script setup>
import { ref, onMounted } from "vue";

const tagline = ref("好记性不如烂笔头");
const author = ref("网络");

onMounted(async () => {
  try {
    const response = await fetch("https://api.honahec.cc/yiyan/get/");
    const data = await response.json();
    tagline.value = data.content;
    author.value = data.author;
  } catch (error) {
    console.error("获取一言失败：", error);
  }
});
</script>

<template>
  <div class="tagline-container">
    <div class="tagline-wrapper">
      <div class="tagline">{{ tagline }}</div>
    </div>
    <div class="author-wrapper">
      <div class="author">--{{ author }}</div>
    </div>
  </div>
</template>

<style scoped>
.tagline-container {
  margin-top: 10px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.tagline-wrapper {
  height: 60px;
  display: flex;
  align-items: center;
}

.author-wrapper {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 430px; 
}

.tagline {
  max-width: 600px;
  font-size: 22px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.author {
  max-width: 400px;
  font-size: 20px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
