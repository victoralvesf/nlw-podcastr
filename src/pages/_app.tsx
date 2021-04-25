import { Header } from '../components/Header'
import { Player } from '../components/Player'

import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import { PlayerContextProvider } from '../contexts/PlayerContext'
import React from 'react'
import { ThemeContextProvider } from '../contexts/ThemeContext'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <ThemeContextProvider>
            <Header />
          </ThemeContextProvider>
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
