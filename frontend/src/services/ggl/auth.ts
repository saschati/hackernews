import { gql } from '@apollo/client'
import { Auth } from 'types/model/user'

export interface LoginMutationQQL {
  login: Auth
}

export const LOGIN_MUTATION_QQL = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export interface SignupMutationQQL {
  signup: Auth
}

export const SIGNUP_MUTATION_QQL = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`
