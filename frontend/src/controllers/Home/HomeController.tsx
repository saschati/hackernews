import { LinkList } from 'components/Domain/Link'
import React from 'react'
import { OrderBy } from 'types/model/link'

const TAKE = 10
const ORDER: Pick<OrderBy, 'createdAt'> = { createdAt: 'desc' }

const HomeController: React.FC = (): JSX.Element => {
  return <LinkList take={TAKE} orderBy={ORDER} />
}

export default HomeController
