// pages/_app.tsx
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Providers } from "../components/Providers"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
