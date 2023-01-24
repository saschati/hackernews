import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from 'config/routers'

const RouterList: React.FC = (): JSX.Element => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  )
}

export default RouterList
