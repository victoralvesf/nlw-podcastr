import { useContext } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import services from '../../services'

import styles from './episode.module.scss'
import { SingleEpisode, Episode } from '../../types'
import { PlayerContext } from '../../contexts/PlayerContext'

export default function EpisodePage({ episode }: SingleEpisode) {
  const pageTitle = episode.title.split(/[\|-]/gm)[1].trim()

  const { checkActiveEpisode, play, isPlaying, setPlayingState } = useContext(PlayerContext);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.episode}>
          <div className={styles.thumbnailContainer}>
            <Link href="/">
              <button type="button">
                <img src="/arrow-left.svg" alt="Voltar" />
              </button>
            </Link>
            <Image
              width={700}
              height={393}
              src={episode.thumbnail}
              objectFit="cover"
            />
            {isPlaying && checkActiveEpisode(episode.id) ? (
              <button type="button" onClick={() => setPlayingState(false)}>
                <img src="/pause.svg" alt="Pausar episódio" style={{ height: 16 }} />
              </button>
            ) : (
              <button type="button" onClick={() => play(episode)}>
                <img src="/play.svg" alt="Tocar episódio" />
              </button>
            )}
          </div>

          <header>
            <div className={styles.titleContainer}>
              <h1 className={checkActiveEpisode(episode.id) ? styles.activeEpisode : ''}>
                {episode.title}
              </h1>
            </div>
            <span>{episode.members}</span>
            <span>{episode.publishedAt}</span>
            <span>{episode.durationAsString}</span>
          </header>

          <section
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { episodes } = await services.episode.getLastTwoEpisodes()

  const paths = episodes.map((episode: Episode) => {
    return {
      params: {
        slug: episode.id
      }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

const oneDayInSeconds = 60 * 60 * 24

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params
  const { episode } = await services.episode.getOne(slug)

  return {
    props: {
      episode
    },
    revalidate: oneDayInSeconds
  }
}