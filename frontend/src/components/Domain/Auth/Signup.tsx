import { gql, useMutation } from '@apollo/client'
import LocalStorage from 'app/storage/local'
import { AUTH_TOKEN } from 'config/constants'
import useAuth from 'hooks/useAuth'
import useStorage, { StorageType } from 'hooks/useStorage'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'types/model/user'

type AuthToken = Pick<Auth, 'token'>
interface SignupData {
  signup: AuthToken
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const Signup: React.FC = (): JSX.Element => {
  const storage = useStorage<LocalStorage>(StorageType.LOCAL)
  const navigate = useNavigate()
  const { getUser } = useAuth()
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
  })

  const [signup] = useMutation<SignupData>(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      storage.set(AUTH_TOKEN, signup.token)
      getUser()
      navigate('/')
    },
  })

  const handlerName = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setFormState({
        ...formState,
        name: e.target.value,
      })
    },
    [formState]
  )

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
    () => signup(),
    [signup]
  )

  return (
    <div>
      <h4 className="mv3">Sign Up</h4>
      <div className="flex flex-column">
        <input value={formState.name} onChange={handlerName} type="text" placeholder="Your name" />
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
          create account
        </button>
      </div>
    </div>
  )
}

export default Signup
