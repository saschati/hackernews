import React, { useCallback } from 'react'
import { Link as LinkModel } from 'types/model/link'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import Path from 'config/path'
import {
  CreateLinkMutationQQL,
  CREATE_LINK_MUTATION_QQL,
  LinkQueryQQL,
  LINKS_QUERY_QQL,
} from 'services/ggl/link'
import { LINKS_PER_PAGE } from 'config/constants'
import { Form, Formik } from 'formik'
import Yup from 'utils/yup'
import { FormikButton, FormikInput } from '../Formik'
import styles from './CreateLink.module.scss'

type CreateLinkValues = Pick<LinkModel, 'description' | 'url'>

const validateSchema = Yup.object().shape({
  description: Yup.string().required(),
  url: Yup.string().required().url(),
})

const initialValues: CreateLinkValues = {
  description: '',
  url: '',
}

const CreateLink: React.FC = (): JSX.Element => {
  const navigate = useNavigate()

  const [createLink] = useMutation<CreateLinkMutationQQL>(CREATE_LINK_MUTATION_QQL)

  const handlerSubmit = useCallback(
    (values: CreateLinkValues) => {
      createLink({
        variables: {
          description: values.description,
          url: values.url,
        },
        update: (cache, { data: postData }) => {
          const variables = {
            take: LINKS_PER_PAGE,
            skip: 0,
            orderBy: { createdAt: 'desc' },
          }

          const data = cache.readQuery<LinkQueryQQL>({
            query: LINKS_QUERY_QQL,
            variables,
          })

          cache.writeQuery({
            query: LINKS_QUERY_QQL,
            data: {
              links: {
                records: [...(data?.links.records || []), postData?.postLink],
              },
            },
            variables,
          })
        },
        onCompleted: () => navigate(Path.HOME),
      })
    },
    [createLink]
  )

  return (
    <div className={styles.createLink}>
      <h1 className={styles.createLink__title}>Create Link</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={handlerSubmit}
      >
        <Form className={styles.createLink__form}>
          <FormikInput
            name="description"
            type="text"
            size="xl"
            placeholder="A description for the link"
          />
          <FormikInput name="url" type="text" size="xl" placeholder="The URL for the link" />
          <div className={styles.createLink__button}>
            <FormikButton>Submit</FormikButton>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateLink
