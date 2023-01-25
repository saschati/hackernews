import { Link } from './link'
import { Vote } from './vote'

export interface User {
  id: string
  name: string
  email: string
  links: Array<Link>
  votes: Array<Vote>
}

export interface Auth {
  token: string
  user: User
}
