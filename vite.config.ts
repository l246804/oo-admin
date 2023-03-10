import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Inspect from 'vite-plugin-inspect'
import Inspector from 'vite-plugin-vue-inspector'
import Unocss from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    // https://vue-macros.sxzz.moe/zh-CN/macros/
    VueMacros({
      plugins: {
        vue: Vue(),
        vueJsx: VueJsx(),
      },
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      exclude: [
        '**/hooks/**/*.ts',
        '**/utils/**/*.ts',
        '**/constants/**/*.ts',
        '**/components/**/*.ts',
      ],
      extensions: ['vue', 'ts'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

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
        'src/composables',
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
    }),

    // https://github.com/antfu/vite-plugin-inspect
    // Visit http://localhost:5173/__inspect/ to see the inspector
    Inspect(),

    // https://github.com/webfansplz/vite-plugin-vue-inspector
    Inspector({
      toggleButtonVisibility: 'never',
    }),
  ],
})
