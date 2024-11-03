<template>
    <div style="margin-top: 24px">
        <Giscus
            id="comments"
            repo="Calm00/blog"
            repoid="R_kgDONJemfQ"
            category="General"
            categoryid="DIC_kwDONJemfc4Cj7pY"
            mapping="pathname"
            term="Welcome to giscus!"
            reactionsenabled="0"
            emitmetadata="0"
            inputposition="top"
            loading="lazy"
            :theme="isDark ? 'dark' : 'light'"
            :key="route.path"
        ></Giscus>
    </div>
</template>

<script setup>
import Giscus from '@giscus/vue';
import { useRoute, useData } from 'vitepress';

const route = useRoute();
const { isDark } = useData();
</script>