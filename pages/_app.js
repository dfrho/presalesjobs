import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
import CookieConsent from 'react-cookie-consent'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  const [cookieValue, setCookieValue] = useState('false')

  // useEffect will run on the client-side only, and only on mount given no dependencies
  // so user is only prompted once
  useEffect(() => {
    const cookie = getCookieValue('myAwesomeNashVegasCookie2')
    if (cookie === 'true' || cookie === 'false') {
      setCookieValue(cookie)
    }

    function getCookieValue(name) {
      if (typeof window === 'undefined') {
        return null // Return null on the server-side
      }

      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop().split(';').shift()
    }
  }, [])

  // CookieConsent is a component that will show a cookie consent banner and has a callback for onAccept and onDecline
  // so we will reset state on either of those events, triggering a re-render that will turn on or turn off analytics:

  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      {cookieValue === 'true' && <Analytics />}
      <LayoutWrapper>
        <Component {...pageProps} />
        <CookieConsent
          onAccept={() => {
            setCookieValue('true')
          }}
          onDecline={() => {
            setCookieValue('false')
          }}
          enableDeclineButton
          declineButtonStyle={{ color: '#fff', background: 'green', fontSize: '13px' }}
          location="bottom"
          declineButtonText="Nope"
          buttonText="OK Got It"
          cookieName="myAwesomeNashVegasCookie2"
          style={{ background: '#3671B6', display: 'flex', alignItems: 'center' }}
          buttonStyle={{ color: '#fff', background: 'green', fontSize: '13px' }}
          expires={150}
        >
          This app uses cookies to enhance the user experience, as well as analytics that capture
          screen clicks, location, and mouse movements (PostHog.com). That is all we track. Enjoy
          the music 🤠.
        </CookieConsent>
      </LayoutWrapper>
    </ThemeProvider>
  )
}
