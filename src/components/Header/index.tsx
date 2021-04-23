import Link from 'next/link'

import styles from './styles.module.scss'

import { formattedDate } from '../../utils/currentDate'

export function Header() {
  const currentDate = formattedDate()

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <img src="/logo.svg" alt="Podcastr" />
      </Link>

      <p>O melhor para você ouvir, sempre</p>

      <span>{currentDate}</span>
    </header>
  )
}
