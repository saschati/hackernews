import { useMutation } from '@apollo/client'
import { Error, Title } from 'components/UI/Text'
import { AUTH_TOKEN } from 'config/constants'
import Path from 'config/path'
import { Form, Formik } from 'formik'
import useAuth from 'hooks/useAuth'
import useStorage, { StorageType } from 'hooks/useStorage'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignupMutationQQL, SIGNUP_MUTATION_QQL } from 'services/ggl/auth'
import Yup from 'utils/yup'
import { FormikButton, FormikInput } from '../Formik'
import Link from '../Router/Link'
import styles from './Signup.module.scss'

type SignupValues = {
  name: string
  email: string
  password: string
}

const validateSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .required()
    .min(6)
    .matches(/[a-zA-Z]/),
})

const initialValues: SignupValues = {
  name: '',
  email: '',
  password: '',
}

const Signup: React.FC = (): JSX.Element => {
  const storage = useStorage(StorageType.LOCAL)
  const navigate = useNavigate()
  const { getUser } = useAuth()

  const [signup, { error }] = useMutation<SignupMutationQQL>(SIGNUP_MUTATION_QQL)

  const handlerSubmit = useCallback(
    (values: SignupValues) =>
      signup({
        variables: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
        onCompleted: ({ signup }) => {
          storage.set(AUTH_TOKEN, signup.token)
          getUser()
          navigate('/')
        },
      }),
    [signup]
  )

  return (
    <div className={styles.signup}>
      <Title position="center">Sign Up</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={handlerSubmit}
      >
        <Form className={styles.signup__form}>
          <Error message={error?.message} />
          <FormikInput name="name" type="text" placeholder="Your name" />
          <FormikInput name="email" type="email" placeholder="Your email address" />
          <FormikInput
            name="password"
            type="password"
            current-password="true"
            placeholder="Choose a safe password"
          />
          <div className={styles.signup__footer}>
            <Link className="text-sm" to={Path.AUTH_LOGIN}>
              Already have an account? Log in!
            </Link>
            <div className={styles.signup__button}>
              <FormikButton>Create account</FormikButton>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Signup
