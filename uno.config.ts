import { presetDaisy } from '@ameinhardt/unocss-preset-daisy'
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetDaisy(),
  ],
})
