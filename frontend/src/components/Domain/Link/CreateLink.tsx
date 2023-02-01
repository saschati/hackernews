import React, { useCallback, useState } from 'react'
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

type CreateLinkForm = Pick<LinkModel, 'description' | 'url'>

const CreateLink: React.FC = (): JSX.Element => {
  const navigate = useNavigate()

  const [formState, setFormState] = useState<CreateLinkForm>({
    description: '',
    url: '',
  })

  const [createLink] = useMutation<CreateLinkMutationQQL>(CREATE_LINK_MUTATION_QQL)

  const handlerSubmit = useCallback<React.FormEventHandler>(
    (e) => {
      e.preventDefault()

      createLink({
        variables: {
          description: formState.description,
          url: formState.url,
        },
        update: (cache, { data: postData }) => {
          const data = cache.readQuery<LinkQueryQQL>({
            query: LINKS_QUERY_QQL,
          })

          cache.writeQuery({
            query: LINKS_QUERY_QQL,
            data: {
              links: {
                records: [...(data?.links.records || []), postData?.postLink],
              },
            },
          })
        },
        onCompleted: () => navigate(Path.HOME),
      })
    },
    [createLink, formState]
  )

  const handlerDescriptionChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setFormState({
        ...formState,
        description: e.target.value,
      })
    },
    [formState]
  )

  const handlerUrl = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setFormState({
        ...formState,
        url: e.target.value,
      })
    },
    [formState]
  )

  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <div>
          <input
            value={formState.description}
            onChange={handlerDescriptionChange}
            type="text"
            placeholder="A description for the link"
          />
          <input
            value={formState.url}
            onChange={handlerUrl}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateLink
