import React, { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import routes, { NoFoundComponent, RouterAccess } from 'config/routers'
import useAuth from 'hooks/useAuth'

const RouterList: React.FC = (): JSX.Element => {
  const { user } = useAuth()

  const filterRouters = useMemo(() => {
    return routes.filter(({ access }) => {
      if (access === RouterAccess.AUTH && user.isGuest() === true) {
        return false
      }

      if (access === RouterAccess.GUEST && user.isGuest() === false) {
        return false
      }

      return true
    })
  }, [user])

  return (
    <Routes>
      {filterRouters.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<NoFoundComponent />} />
    </Routes>
  )
}

export default RouterList
