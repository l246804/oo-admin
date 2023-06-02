import path from 'node:path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Inspect from 'vite-plugin-inspect'
import VueDevtools from 'vite-plugin-vue-devtools'
import Unocss from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import { createToolkit } from '@lei-xx/vite-toolkit'
import type { ViteEnv } from './types/env'

export default defineConfig((configEnv) => {
  const toolkit = createToolkit<ViteEnv>(configEnv, {
    allowMountToProcessEnv: true,
  })
  const env = toolkit.loadEnv()

  return {
    base: env.VITE_BASE_URL,

    server: {
      // proxy server
      proxy: {
        //
      },
    },

    define: {
      __ENV__: env,
      __DEV__: toolkit.isDev(),
      __PROD__: toolkit.isProd(),
      __TEST__: toolkit.isTest(),
    },

    esbuild: {
      drop: ['console', 'debugger'],
    },

    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [
      // https://github.com/vitejs/vite-plugin-vue
      Vue({
        script: {
          propsDestructure: true,
          defineModel: true,
        },
      }),
      VueJsx(),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        exclude: [
          '**/hooks/**/*',
          '**/utils/**/*',
          '**/constants/**/*',
          '**/components/**/*',
        ],
        extensions: ['vue', 'ts'],
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts({
        exclude: ['**/components/**/*'],
      }),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'vue/macros',
          '@vueuse/head',
          '@vueuse/core',
          'pinia',
        ],
        dts: 'src/types/auto-imports.d.ts',
        dirs: [
          'src/hooks',
          'src/stores',
        ],
        vueTemplate: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        // allow auto import and register components used in vue
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'src/types/components.d.ts',
        resolvers: [VueUseComponentsResolver()],
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),

      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, 'locales/**')],
        defaultSFCLang: 'yaml',
      }),

      // https://github.com/antfu/vite-plugin-inspect
      // Visit http://localhost:5173/__inspect/ to see the inspector
      Inspect(),

      // https://github.com/webfansplz/vite-plugin-vue-devtools
      VueDevtools(),

      splitVendorChunkPlugin(),
    ],
  }
})
