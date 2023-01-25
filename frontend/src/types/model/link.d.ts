import { User } from './user'
import { Vote } from './vote'

export interface Link {
  id: number
  url: string
  description: string
  createdAt: string
  postedBy: User
  votes: Array<Vote>
}
