import { gql } from '@apollo/client'
import { User } from 'types/model/user'

export interface UserQeuryQQL {
  user: User
}

export const USER_QUERY_QQL = gql`
  query User($token: String) {
    user(token: $token) {
      id
      email
      name
    }
  }
`
