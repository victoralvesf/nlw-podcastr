import '../styles/global.scss'

import { Header } from '../components/Header'
import { Player } from '../components/Player'

import styles from '../styles/app.module.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <div className={styles.pageContainer}>
          <Component {...pageProps} />
        </div>
      </main>

      <Player />
    </div>
  )
}

export default MyApp
