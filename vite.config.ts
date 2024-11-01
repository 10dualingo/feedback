import { defineConfig } from "vite";
import path from "path";

import vue from "@vitejs/plugin-vue";
import icons from "unplugin-icons/vite";
import routes from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",

  plugins: [
    vue(),
    icons({ compiler: "vue3" }),
    routes({ pagesDir: path.resolve(__dirname, "src/pages") }),
  ],

  build: {
    target: "es6",
  },

  server: {
    port: 3000,
  },
});
