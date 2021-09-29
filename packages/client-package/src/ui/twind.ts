import { setup } from 'twind'
import * as colors from 'twind/colors'

import 'twind/shim'

setup({
  mode: 'silent',
  darkMode: 'class', // default is 'media',
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        amber: colors.amber,
        coolGray: colors.coolGray,
        lime: colors.lime,
        orange: colors.orange
      }
    }
  }
})
