import React, { useCallback, useState } from 'react'
import { Link as LinkModel } from 'types/model/link'
import { useMutation, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import Path from 'config/path'

type CreateLinkForm = Pick<LinkModel, 'description' | 'url'>

interface PostLinkData {
  post: LinkModel
}

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    postLink(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`

const CreateLink: React.FC = (): JSX.Element => {
  const navigate = useNavigate()

  const [formState, setFormState] = useState<CreateLinkForm>({
    description: '',
    url: '',
  })

  const [createLink] = useMutation<PostLinkData>(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    onCompleted: () => navigate(Path.HOME),
  })

  const handlerSubmit = useCallback<React.FormEventHandler>(
    (e) => {
      e.preventDefault()

      createLink()
    },
    [createLink]
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
