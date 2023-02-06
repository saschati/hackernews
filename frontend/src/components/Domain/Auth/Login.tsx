import { useMutation } from '@apollo/client'
import { Error, Title } from 'components/UI/Text'
import { AUTH_TOKEN } from 'config/constants'
import Path from 'config/path'
import { Form, Formik } from 'formik'
import useAuth from 'hooks/useAuth'
import useStorage, { StorageType } from 'hooks/useStorage'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginMutationQQL, LOGIN_MUTATION_QQL } from 'services/ggl/auth'
import Yup from 'utils/yup'
import { FormikButton, FormikInput } from '../Formik'
import Link from '../Router/Link'
import styles from './Login.module.scss'

type LoginValues = {
  email: string
  password: string
}

const validateSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
})

const initialValues: LoginValues = {
  email: '',
  password: '',
}

const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const storage = useStorage(StorageType.LOCAL)
  const { getUser } = useAuth()

  const [login, { error }] = useMutation<LoginMutationQQL>(LOGIN_MUTATION_QQL)

  const handlerSubmit = useCallback(
    (values: LoginValues) =>
      login({
        variables: {
          email: values.email,
          password: values.password,
        },
        onCompleted: ({ login }) => {
          storage.set(AUTH_TOKEN, login.token)
          getUser()
          navigate('/')
        },
      }),
    [login]
  )

  return (
    <div className={styles.login}>
      <Title position="center">Login</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={handlerSubmit}
      >
        <Form className={styles.login__form}>
          <Error message={error?.message} />
          <FormikInput name="email" type="text" placeholder="Your email address" />
          <FormikInput
            name="password"
            type="password"
            current-password="true"
            placeholder="Choose a safe password"
          />
          <div className={styles.login__footer}>
            <Link to={Path.AUTH_SIGNUP} className="text-sm">
              Don&apos;t have an account? Sign up!
            </Link>
            <div className={styles.login__button}>
              <FormikButton>Login</FormikButton>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
