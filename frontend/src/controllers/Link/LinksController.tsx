import React from 'react'
import { LinkList } from 'components/Domain/Link'
import { useParams } from 'react-router-dom'
import { OrderBy } from 'types/model/link'

type LinksRouterParams = {
  page: string
}

const TAKE = 10
const ORDER: Pick<OrderBy, 'createdAt'> = { createdAt: 'desc' }

const LinksController: React.FC = (): JSX.Element => {
  const { page } = useParams<LinksRouterParams>()

  return <LinkList take={TAKE} orderBy={ORDER} skip={page ? Number(page) : undefined} />
}

export default LinksController
