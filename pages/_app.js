import { AuthProvider } from "providers/auth-provider"
import Toastify from "components/Toastify"

import '../styles/globals.css'
import '../styles/font.css'
import '../styles/button.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/landingSlider.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Toastify />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
