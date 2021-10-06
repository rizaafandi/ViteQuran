import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md  
      ],
      imports: [
        // presets
        'vue',
        'vue-router',
      ],
    }),
    Components({
      dts: false,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: ['src/components', 'src/components/*'],
      deep: true,
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    })
  ]
})
