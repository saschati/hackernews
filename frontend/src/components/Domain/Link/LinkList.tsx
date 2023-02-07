import React, { useCallback, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { LinkList as CommonLinkList } from 'components/Common/Link'
import {
  LinkQueryQQL,
  LINKS_QUERY_QQL,
  NewLinksSubscriptionQQL,
  NEW_LINKS_SUBSCRIPTION_QQL,
} from 'services/ggl/link'
import useVoteMutation from 'hooks/domain/link/useVoteMutatuon'
import { OrderBy } from 'types/model/link'
import { LINKS_PER_PAGE } from 'config/constants'
import Pagginate, { PagginateProps } from 'components/UI/Pagginate'

export type LinkListProps = {
  take?: number
  page?: number
  orderBy?: OrderBy
  onPageChange: PagginateProps['onChange']
}

const LinkList: React.FC<LinkListProps> = ({
  take = LINKS_PER_PAGE,
  page,
  orderBy,
  onPageChange,
}): JSX.Element => {
  const getVariables = useCallback(
    (page?: number) => {
      const skip = page ? (page - 1) * take : 0

      return {
        paggin: {
          take,
          skip,
        },
        orderBy,
      }
    },
    [take, orderBy]
  )

  const variables = useMemo(() => getVariables(page), [take, page, orderBy])

  const { data, subscribeToMore } = useQuery<LinkQueryQQL>(LINKS_QUERY_QQL, {
    variables,
  })

  const handlerLinkVote = useVoteMutation(variables)

  useMemo(() => {
    subscribeToMore<NewLinksSubscriptionQQL>({
      document: NEW_LINKS_SUBSCRIPTION_QQL,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev
        }

        const newLink = subscriptionData.data.newLink
        const exists = prev.links.records.find(({ id }) => id === newLink.id)

        if (exists) {
          return prev
        }

        return {
          ...prev,
          links: {
            records: [newLink, ...prev.links.records],
            total: prev.links.records.length + 1,
            __typename: prev.links.__typename,
          },
        }
      },
    })
  }, [subscribeToMore])

  if (!data) {
    return <>Items not found.</>
  }

  return (
    <div>
      <CommonLinkList links={data.links.records} onLinkVote={handlerLinkVote} />
      <div className="flex justify-center mt-4 mx-auto">
        <Pagginate
          onChange={onPageChange}
          pageCount={data.links.total / take}
          forcePage={page || 1}
        />
      </div>
    </div>
  )
}

export default LinkList
