import { Link } from './link'
import { User } from './user'

export interface Vote {
  id: string
  user: User
  link: Link
}
