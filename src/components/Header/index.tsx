import Link from 'next/link'
import Switch from 'react-switch'

import { useTheme } from '../../contexts/ThemeContext'
import { formattedDate } from '../../utils/currentDate'

import styles from './styles.module.scss'

export function Header() {
  const currentDate = formattedDate()

  const { theme, setDarkTheme, SunEmoji, MoonEmoji } = useTheme()

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <img src={theme ? '/logo-dark.svg' : '/logo.svg'} alt="Podcastr" />
      </Link>

      <p>O melhor para você ouvir, sempre</p>

      <span>{currentDate}</span>
      <Switch
        className={styles.switch}
        onColor="#8257E5"
        onChange={setDarkTheme}
        checked={theme}
        checkedIcon={<MoonEmoji />}
        uncheckedIcon={<SunEmoji />}
      />
    </header>
  )
}
