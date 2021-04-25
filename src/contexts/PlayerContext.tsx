import { createContext, useState, ReactNode, useContext } from 'react'

type Episode = {
  id: string
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

type PlayerContextData = {
  episodeList: Episode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  isLooping: boolean
  isShuffling: boolean
  isSinglePlaylist: boolean
  play: (episode: Episode) => void
  setPlaylist: (list: Episode[], index: number) => void
  togglePlay: () => void
  toggleLoop: () => void
  toggleShuffle: () => void
  setPlayingState: (state: boolean) => void
  clearPlayerState: () => void
  checkActiveEpisode: (id: string) => boolean
  playNext: () => void
  playPrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
  children: ReactNode
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episode: Episode) {
    if (checkActiveEpisode(episode.id) && !isPlaying) {
      setIsPlaying(true)
      return
    }
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function setPlaylist(list: Episode[], index: number) {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  function checkActiveEpisode(id: string) {
    return id === episodeList[currentEpisodeIndex]?.id
  }

  function clearPlayerState() {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
    setIsPlaying(false)
    setIsLooping(false)
    setIsShuffling(false)
  }

  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length
  const hasPrevious = currentEpisodeIndex > 0
  const isSinglePlaylist = episodeList.length === 1

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)

      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        setPlaylist,
        isPlaying,
        isLooping,
        isShuffling,
        isSinglePlaylist,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        clearPlayerState,
        checkActiveEpisode,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}
