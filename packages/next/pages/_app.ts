import App from 'next/app'
import { setup } from 'twind'

import { forms } from '@twind/forms'

import '@fontsource/inter'
import 'twind/shim'

setup({
  mode: 'silent',
  darkMode: 'class',
  plugins: { forms },
  preflight: (preflight) => ({
    ...preflight,
    body: {
      'font-family': 'Inter'
    }
  })
})

export default App
