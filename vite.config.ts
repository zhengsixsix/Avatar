import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import { visualizer } from "rollup-plugin-visualizer"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: "sunburst",
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://apis.map.qq.com/ws",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/weather": {
        target: "https://devapi.qweather.com/v7/weather",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weather/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
})
