import React from 'react'
import Path from './path'
import { NoFoundController } from 'controllers/Error'

const HomeController = React.lazy(() => import('controllers/Home'))
const LoginController = React.lazy(() =>
  import('controllers/Auth').then((module) => ({ default: module.LoginController }))
)
const SignupController = React.lazy(() =>
  import('controllers/Auth').then((module) => ({ default: module.SignupController }))
)
const CreateLinkController = React.lazy(() =>
  import('controllers/Link').then((module) => ({ default: module.CreateLinkController }))
)
const LinksController = React.lazy(() =>
  import('controllers/Link').then((module) => ({ default: module.LinksController }))
)

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
