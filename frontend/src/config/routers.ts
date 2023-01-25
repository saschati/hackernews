import { Signup, Login } from 'components/Domain/Auth'
import { CreateLink, LinkList } from 'components/Domain/Link'
import React from 'react'
import Path from './path'

export interface Route {
  path: Path
  Component: React.ComponentType
}

const routes: Array<Route> = [
  {
    path: Path.HOME,
    Component: LinkList,
  },
  {
    path: Path.LINK_CREATE_LINK,
    Component: CreateLink,
  },
  {
    path: Path.AUTH_LOGIN,
    Component: Login,
  },
  {
    path: Path.AUTH_SIGNUP,
    Component: Signup,
  },
]

export default routes
