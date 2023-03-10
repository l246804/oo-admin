import path from 'node:path'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      autoInstall: true,
      scale: 1.2,
      warn: true,
      collections: {
        loc: FileSystemIconLoader(path.resolve(__dirname, 'src/assets/icons'), (svg) => {
          return svg.replace(/(width|height)=['"]([^'"])+['"]/g, '')
        }),
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'm-auto'.split(' '),
})
