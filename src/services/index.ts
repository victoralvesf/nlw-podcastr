import axios from 'axios'
import episodeService from './episodeService'

const baseURL = process.env.APP_URL || 'http://localhost:3333/'

const httpClient = axios.create({
  baseURL
})

export default {
  episode: episodeService(httpClient)
}
