// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import GiscusComment from "./components/GiscusComment.vue";
import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";
import { onMounted, watch, nextTick } from "vue";
import { useRoute } from "vitepress";
import { Icon } from "@iconify/vue";

import "./theme-enhanced.css";
import "./style.css";

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,

  setup() {
    const route = useRoute();
    let viewer = null; // 保存viewer实例

    const initZoom = () => {
      // 如果已存在实例，先销毁
      if (viewer) {
        viewer.destroy();
      }

      // 创建一个容器实例，而不是为每张图片创建实例
      const container = document.querySelector(".main");
      viewer = new Viewer(container, {
        navbar: false,
        toolbar: false,
        title: false,
        tooltip: false,
        movable: false,
        zoomRatio: 0.3,
        maxZoomRatio: 2,
        backdrop: true,
        loading: true,
        transition: true,
        duration: 200,
        filter(img) {
          return img.parentNode.closest(".main");
        },
        shown() {
          viewer.zoomTo(1);
        },
      });
    };

    onMounted(() => {
      initZoom();
    });

    watch(
      () => route.path,
      () => {
        nextTick(() => {
          initZoom();
        });
      }
    );
  },

  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "doc-after": () => h(GiscusComment),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("Icon", Icon);  
  },
};
