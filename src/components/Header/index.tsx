import styles from './styles.module.scss';

import { formattedDate } from '../../utils/currentDate'

export function Header() {
  const currentDate = formattedDate()

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Podcastr" />

      <p>O melhor para você ouvir, sempre</p>

      <span>{currentDate}</span>
    </header>
  )
}
