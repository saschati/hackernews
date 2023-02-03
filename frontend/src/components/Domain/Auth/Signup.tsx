import { useMutation } from '@apollo/client'
import { AUTH_TOKEN } from 'config/constants'
import useAuth from 'hooks/useAuth'
import useStorage, { StorageType } from 'hooks/useStorage'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignupMutationQQL, SIGNUP_MUTATION_QQL } from 'services/ggl/auth'

const Signup: React.FC = (): JSX.Element => {
  const storage = useStorage(StorageType.LOCAL)
  const navigate = useNavigate()
  const { getUser } = useAuth()
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
  })

  const [signup] = useMutation<SignupMutationQQL>(SIGNUP_MUTATION_QQL)

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
    () =>
      signup({
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
      }),
    [signup, formState]
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
