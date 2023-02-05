import React, { useMemo } from 'react'
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

export type LinkListProps = {
  take?: number
  page?: number
  orderBy?: OrderBy
}

const LinkList: React.FC<LinkListProps> = ({
  take = LINKS_PER_PAGE,
  page,
  orderBy,
}): JSX.Element => {
  const variables = useMemo(() => {
    const skip = page ? (page - 1) * take : 0

    return {
      paggin: {
        take,
        skip,
      },
      orderBy,
    }
  }, [take, page, orderBy])

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
            totla: prev.links.records.length + 1,
            __typename: prev.links.__typename,
          },
        }
      },
    })
  }, [subscribeToMore])

  if (!data) {
    return <>Items not found.</>
  }

  return <CommonLinkList links={data.links.records} onLinkVote={handlerLinkVote} />
}

export default LinkList
