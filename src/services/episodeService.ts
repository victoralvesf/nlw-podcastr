import { AxiosInstance } from 'axios'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'
import { Episode } from '../types'

function formatEpisodes (data: Episode[]) {
  return data.map((episode: Episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(episode.file.duration),
      description: episode.description,
      url: episode.file.url
    }
  })
}

function formatSingleEpisode (data: Episode) {
  return {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(data.file.duration),
    description: data.description,
    url: data.file.url
  }
}

export default function episodeService (httpClient: AxiosInstance) {  
  return {
    get: async () => {
      const { data } = await httpClient.get('episodes', {
        params: {
          _limit: 12,
          _sort: 'published_at',
          _order: 'desc'
        }
      })

      const episodes = formatEpisodes(data)

      const latestEpisodes = episodes.slice(0, 2)
      const allEpisodes = episodes.slice(2, episodes.length)

      return { latestEpisodes, allEpisodes }
    },

    getOne: async (id: string | string[]) => {
      const { data } = await httpClient.get(`/episodes/${id}`)

      const episode = formatSingleEpisode(data)

      return { episode }
    },

    getLastTwoEpisodes: async () => {
      const { data } = await httpClient.get('episodes', {
        params: {
          _limit: 2,
          _sort: 'published_at',
          _order: 'desc'
        }
      })

      const episodes = formatEpisodes(data)

      return { episodes }
    }
  }
}