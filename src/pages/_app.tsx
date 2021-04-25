import { useState } from 'react'

import { Header } from '../components/Header'
import { Player } from '../components/Player'

import { PlayerContext } from '../contexts/PlayerContext'
import { Episode } from '../types'

import '../styles/global.scss'
import styles from '../styles/app.module.scss'

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setcurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode: Episode) {
    if (episode.id === episodeList[currentEpisodeIndex]?.id && !isPlaying) {
      setIsPlaying(true)
      return
    }
    setEpisodeList([episode])
    setcurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  function checkActiveEpisode(id: string) {
    return id === episodeList[currentEpisodeIndex]?.id
  }

  return (
    <PlayerContext.Provider value={
      {
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        setPlayingState,
        checkActiveEpisode
      }
    }>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
