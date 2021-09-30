import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import React from 'react'
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

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo
        title="Invited"
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://invited.vercel.app',
          site_name: 'Invited'
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/images/logo.svg'
          }
        ]}
      />

      <Component {...pageProps} />
    </>
  )
}

export default App
