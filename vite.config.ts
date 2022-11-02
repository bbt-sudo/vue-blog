import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
  '@': pathResolve('src'),
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       additionalData: '@import "./node_modules//vant/lib/index.css";',
  //     },
  //   },
  // },
  resolve: {
    // ****************** 路径配置新增
    alias, // ****************** 路径配置新增
  },
})
