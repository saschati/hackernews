import { gql, useMutation } from '@apollo/client'
import LocalStorage from 'app/storage/local'
import { AUTH_TOKEN } from 'config/constants'
import useAuth from 'hooks/useAuth'
import useStorage, { StorageType } from 'hooks/useStorage'
import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'types/model/user'

type AuthToken = Pick<Auth, 'token'>
interface LoginData {
  login: AuthToken
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const storage = useStorage<LocalStorage>(StorageType.LOCAL)
  const { getUser } = useAuth()
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  const [login] = useMutation<LoginData>(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      storage.set(AUTH_TOKEN, login.token)
      getUser()
      navigate('/')
    },
  })

  const handlerEmail = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setFormState({
        ...formState,
        email: e.target.value,
      })
    },
    [formState]
  )

  const handlerPassword = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setFormState({
        ...formState,
        password: e.target.value,
      })
    },
    [formState]
  )

  const handleSubmit = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    () => login(),
    [login]
  )

  return (
    <div>
      <h4 className="mv3">Login</h4>
      <div className="flex flex-column">
        <input
          value={formState.email}
          onChange={handlerEmail}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={handlerPassword}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button className="pointer mr2 button" onClick={handleSubmit}>
          login
        </button>
      </div>
    </div>
  )
}

export default Login
