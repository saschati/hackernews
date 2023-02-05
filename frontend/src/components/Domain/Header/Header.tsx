import Path from 'config/path'
import useAuth from 'hooks/useAuth'
import React, { useMemo } from 'react'
import { generatePath, Link as RouterLink } from 'react-router-dom'
import { Link } from '@vechaiui/react'
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
          <Link as="div" className="text-black" key={item.href}>
            <RouterLink to={item.href}>{item.label}</RouterLink>
          </Link>
        ))}
      </div>
      {!user.isGuest() ? (
        <HeaderProfile />
      ) : (
        <Link as="div" className="text-black hover:text-blue-500">
          <RouterLink to={Path.AUTH_LOGIN}>login</RouterLink>
        </Link>
      )}
    </div>
  )
}

export default Header
