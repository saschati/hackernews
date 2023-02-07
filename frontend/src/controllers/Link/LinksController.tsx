import React, { useCallback } from 'react'
import { LinkList } from 'components/Domain/Link'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { OrderBy } from 'types/model/link'
import Path from 'config/path'
import { LINKS_PER_PAGE } from 'config/constants'

type LinksRouterParams = {
  page: string
}

const TAKE = LINKS_PER_PAGE
const ORDER: Pick<OrderBy, 'createdAt'> = { createdAt: 'desc' }

const LinksController: React.FC = (): JSX.Element => {
  const { page } = useParams<LinksRouterParams>()
  const navigation = useNavigate()

  const handerPageChange = useCallback(
    (page: number) => {
      navigation(generatePath(Path.LINKS, { page: page > 1 ? String(page) : null }))
    },
    [navigation]
  )

  return (
    <div className="pt-5 pb-5 mx-auto w-1/2">
      <LinkList
        take={TAKE}
        orderBy={ORDER}
        page={page ? Number(page) : undefined}
        onPageChange={handerPageChange}
      />
    </div>
  )
}

export default LinksController
