// import { presetDaisy } from '@ameinhardt/unocss-preset-daisy'
import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    // [Error on GH Pages Deploy · Issue #20 · ameinhardt/unocss-preset-daisy](https://github.com/ameinhardt/unocss-preset-daisy/issues/20)
    // presetDaisy(),
  ],
})
