import { defineConfig } from "vitepress";
import { nav } from './config/nav'
import { sidebar } from './config/sidebar'
import { meta } from './config/meta'
import { footer } from './config/footer'

export default defineConfig({
  ...meta,
  themeConfig: {
    logo: "https://image.honahec.cc/avatar-circle.png",
    nav,
    sidebar,
    
    footer,
    
    socialLinks: [
      { icon: "github", link: "https://github.com/Honahec/blog" }
    ],

    

    outline: {
      level: [2, 6],
      label: "文章目录",
    },

    

   
  }
})
