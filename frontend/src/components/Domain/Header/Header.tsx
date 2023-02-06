import Path from 'config/path'
import useAuth from 'hooks/useAuth'
import React, { useMemo } from 'react'
import { generatePath, Link as RouterLink } from 'react-router-dom'
import Link from '../Router/Link'
import styles from './Header.module.scss'
import HeaderProfile from './HeaderProfile'

const Header: React.FC = (): JSX.Element => {
  const { user } = useAuth()

  const navigateItems = useMemo(() => {
    return [
      {
        href: generatePath(Path.LINKS, { page: null }),
        label: 'links',
      },
    ]
  }, [])

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <RouterLink to={Path.HOME}>Hacker News</RouterLink>
      </div>
      <div className={styles.header__navigate}>
        {navigateItems.map((item) => (
          <Link to={item.href} key={item.href} color="black">
            {item.label}
          </Link>
        ))}
      </div>
      {!user.isGuest() ? (
        <HeaderProfile />
      ) : (
        <Link color="black" to={Path.AUTH_LOGIN} className="hover:text-blue-500">
          login
        </Link>
      )}
    </div>
  )
}

export default Header
