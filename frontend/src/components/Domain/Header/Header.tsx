import path from 'config/path'
import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = (): JSX.Element => {
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <Link to={path.HOME} className="no-underline black">
          <div className="fw7 mr1">Hacker News</div>
        </Link>
        <Link to={path.HOME} className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link to={path.LINK_CREATE_LINK} className="ml1 no-underline black">
          submit
        </Link>
      </div>
    </div>
  )
}

export default Header
