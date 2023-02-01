import Path from 'config/path'
import useAuth from 'hooks/useAuth'
import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = (): JSX.Element => {
  const { user, logout } = useAuth()

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <Link to={Path.HOME} className="no-underline black">
          <div className="fw7 mr1">Hacker News</div>
        </Link>
        <Link to={Path.HOME} className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link to={Path.LINK_CREATE_LINK} className="ml1 no-underline black">
          submit
        </Link>
        <div className="ml1">|</div>
        {!user.isGuest() ? (
          <div className="cursor-pointer" onClick={logout}>
            logout
          </div>
        ) : (
          <>
            <Link to={Path.AUTH_LOGIN} className="ml1 no-underline black">
              login
            </Link>
            <div className="ml1">|</div>
            <Link to={Path.AUTH_SIGNUP} className="ml1 no-underline black">
              signup
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
