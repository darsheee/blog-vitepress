import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "云朵角落",
  description: "Honahec's Blog",
  head: [
    [
      "link",
      { rel: "icon", href: "https://image.honahec.cc/favicon-blue.png" },
    ],
  ],
  outDir: "dist",
  srcDir: "src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: "https://image.honahec.cc/avatar-circle.png",

    nav: [
      { text: "Home", link: "/" },
      { text: "关于我", link: "/about/" },
      { text: "Blog", link: "/blog/" },
      { text: "友链", link: "/friends/" },
      { text: "TODO", link: "/todo/" },
    ],

    sidebar: {
      "/about/": [
        {
          text: "关于我",
        },
      ],

      "/blog/": [
        {
          text: "Blog",
          link: "/blog/",
          items: [
            {
              text: "项目管理",
              items: [{ text: "git", link: "/blog/git.md" }],
            },
            {
              text: "前端",
              items: [
                { text: "Nginx", link: "/blog/nginx.md" },
                { text: "SSL证书", link: "/blog/ssl.md" },
              ],
            },
          ],
        },
      ],

      "/friends/": [
        {
          text: "友链",
          link: "/friends/",
        },
        {
          text: "友链申请",
          link: "/friends/apply.md",
        },
      ],

      "/todo/": [
        {
          text: "TODO",
          link: "/todo/",
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/Calm00" }],

    search: {
      provider: "local",
      options: {
        miniSearch: {
          options: {},
          searchOptions: {},
        },
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除搜索条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },

    footer: {
      message: `<a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备2024119517号-1</a>`,
      copyright: `Copyright © 2024 Honahec`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      level: [2, 6],
      label: "文章目录",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },

    langMenuLabel: "选择语言",
    returnToTopLabel: "返回顶部",
    sidebarMenuLabel: "导航栏",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "浅色模式",
    darkModeSwitchTitle: "深色模式",
  },
});
