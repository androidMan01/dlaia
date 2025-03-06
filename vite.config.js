import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
// import postcssPxToViewport from 'postcss-px-to-viewport';
import postcssPxToRem from 'postcss-pxtorem'

// https://vite.dev/config/
export default defineConfig({
  base: '/site/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    'process.env.VITE_API_TARGET': JSON.stringify('https://site.monsd.com/api')
  },
  server: {
    host: '0.0.0.0',
    port:'8000',
    proxy: {
      "^/api": {
        target: "https://site.monsd.com/api", //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssPxToRem({
          rootValue: 16, // 根元素字体大小，可以根据设计稿调整
          propList: ['*'], // 需要转换的属性列表，'*' 表示所有属性
          selectorBlackList: [], // 要忽略的选择器列表
          minPixelValue: 2 // 最小转换值，小于该值的 px 不转换
        })
      ]
    }
  }
  // css: {
  //   postcss: {
  //     plugins: [
  //       postcssPxToViewport({
  //         unitToConvert: 'px',
  //         viewportWidth: 1920,
  //         mediaQuery: true,
  //         unitPrecision: 5,
  //         propList: ['*'],
  //         viewportUnit: 'vw',
  //         fontViewportUnit: 'vw',
  //         selectorBlackList: [],
  //         minPixelValue: 1,
  //         replace: true,
  //         exclude: [/node_modules/],
  //         include: undefined,
  //         landscape: false,
  //         landscapeUnit: 'vw',
  //         landscapeWidth: 1920
  //       })
  //     ]
  //   }
  // }
})
