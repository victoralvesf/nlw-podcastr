import React, { useContext } from 'react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import services from '../services'
import { Episodes } from '../types'
import { PlayerContext } from '../contexts/PlayerContext'

import styles from './home.module.scss'

export default function Home({ latestEpisodes, allEpisodes }: Episodes) {
  const { episodeList, currentEpisodeIndex, play, isPlaying, setPlayingState, checkActiveEpisode } = useContext(PlayerContext)

  return (
    <>
      <Head>
        <title>Podcastr | O melhor para você ouvir, sempre</title>
      </Head>
      <div className={styles.homepage}>
        <section className={styles.latestEpisodes}>
          <h2>Últimos lançamentos</h2>

          <ul>
            {latestEpisodes.map(episode => {
              return (
                <li key={episode.id}>
                  <Image
                    className={styles.lastEpisodesThumbnail}
                    width={192}
                    height={192}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />

                  <div className={styles.episode}>
                    <div className={styles.episodeDetails}>
                      <Link href={`/episodes/${episode.id}`}>
                        <a className={checkActiveEpisode(episode.id) ? styles.episodeActive : ''} >
                          {episode.title}
                        </a>
                      </Link>
                      <p title={episode.members}>{episode.members}</p>
                      <span>{episode.publishedAt}</span>
                      <span>{episode.durationAsString}</span>
                    </div>

                    {isPlaying && checkActiveEpisode(episode.id) ? (
                      <button type="button" onClick={() => setPlayingState(false)}>
                        <img src="/pause-green.svg" alt="Pausar episódio" style={{ height: 13 }} />
                      </button>
                    ) : (
                      <button type="button" onClick={() => play(episode)}>
                        <img src="/play-green.svg" alt="Tocar episódio" />
                      </button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
        <section className={styles.allEpisodes}>
          <h2>Todos os episódios</h2>

          <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Podcast</th>
                <th>Integrantes</th>
                <th>Data</th>
                <th>Duração</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map(episode => {
                return (
                  <tr key={episode.id}>
                    <td style={{ width: 80 }}>
                      <Image
                        className={styles.episodeThumbnail}
                        width={120}
                        height={120}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                      />
                    </td>
                    <td>
                      <Link href={`/episodes/${episode.id}`}>
                        <a className={checkActiveEpisode(episode.id) ? styles.episodeActive : ''}>
                          {episode.title}
                        </a>
                      </Link>
                    </td>
                    <td>{episode.members}</td>
                    <td style={{ width: 100 }}>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td>
                      {isPlaying && checkActiveEpisode(episode.id) ? (
                        <button type="button" onClick={() => setPlayingState(false)}>
                          <img src="/pause-green.svg" alt="Pausar episódio" style={{ height: 11 }} />
                        </button>
                      ) : (
                        <button type="button" onClick={() => play(episode)}>
                          <img src="/play-green.svg" alt="Tocar episódio" />
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </div>
    </>
  )
}

const eightHoursInSeconds = 3600 * 8

export const getStaticProps: GetStaticProps = async () => {
  const { latestEpisodes, allEpisodes } = await services.episode.get()

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: eightHoursInSeconds
  }
}
