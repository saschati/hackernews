import { LoginController, SignupController } from 'controllers/Auth'
import { CreateLinkController, LinksController } from 'controllers/Link'
import HomeController from 'controllers/Home'
import React from 'react'
import Path from './path'
import { NoFoundController } from 'controllers/Error'

export enum RouterAccess {
  ALL,
  AUTH,
  GUEST,
}

export interface Route {
  path: Path
  Component: React.ComponentType
  access: RouterAccess
}

export const NoFoundComponent = NoFoundController

const routes: Array<Route> = [
  {
    path: Path.HOME,
    Component: HomeController,
    access: RouterAccess.ALL,
  },
  {
    path: Path.LINK_CREATE_LINK,
    Component: CreateLinkController,
    access: RouterAccess.AUTH,
  },
  {
    path: Path.AUTH_LOGIN,
    Component: LoginController,
    access: RouterAccess.GUEST,
  },
  {
    path: Path.AUTH_SIGNUP,
    Component: SignupController,
    access: RouterAccess.GUEST,
  },
  {
    path: Path.LINKS,
    Component: LinksController,
    access: RouterAccess.ALL,
  },
]

export default routes
