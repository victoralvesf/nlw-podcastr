import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import services from '../../services'

import styles from './episode.module.scss'
import { SingleEpisode } from '../../types'

export default function Episode({ episode }: SingleEpisode) {
  const pageTitle = episode.title.split(/[\|-]/gm)[1].trim()

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
            <button type="button">
              <img src="/play.svg" alt="Tocar episódio" />
            </button>
          </div>

          <header>
            <h1>{episode.title}</h1>
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
  return {
    paths: [],
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