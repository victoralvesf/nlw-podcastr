export type Episode = {
  id: string
  title: string
  members: string
  published_at: string
  publishedAt: string
  thumbnail: string
  durationAsString: string
  description: string
  duration: number
  url: string
  file: {
    url: string
    type: string
    duration: number
  }
}

export type SingleEpisode = {
  episode: Episode
}

export type Episodes = {
  latestEpisodes: Episode[]
  allEpisodes: Episode[]
}
