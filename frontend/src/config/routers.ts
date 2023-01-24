import { CreateLink, LinkList } from 'components/Domain/Link'
import React from 'react'
import path from './path'

export interface Route {
  path: string
  Component: React.ComponentType
}

const routes: Array<Route> = [
  {
    path: path.HOME,
    Component: LinkList,
  },
  {
    path: path.LINK_CREATE_LINK,
    Component: CreateLink,
  },
]

export default routes
