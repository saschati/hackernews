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

export type LinkListProps = {
  take?: number
  skip?: number
  orderBy?: OrderBy
}

const LinkList: React.FC<LinkListProps> = ({ take, skip, orderBy }): JSX.Element => {
  const variables = useMemo(() => {
    return {
      paggin: {
        take,
        skip,
      },
      orderBy,
    }
  }, [take, skip, orderBy])

  const { data, subscribeToMore } = useQuery<LinkQueryQQL>(LINKS_QUERY_QQL, {
    variables,
  })

  const handlerLinkVote = useVoteMutation()

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

  if (!data) {
    return <>Items not found.</>
  }

  return <CommonLinkList links={data.links.records} onLinkVote={handlerLinkVote} />
}

export default LinkList
