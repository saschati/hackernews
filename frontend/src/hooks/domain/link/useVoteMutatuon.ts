import { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { LinkProps } from 'components/Common/Link'
import {
  LinkQueryQQL,
  VoteMutationQQL,
  LINKS_QUERY_QQL,
  VOTE_MUTATION_QQL,
} from 'services/ggl/link'

const useVoteMutation = (variables = {}): LinkProps['onVote'] => {
  const [vote] = useMutation<VoteMutationQQL>(VOTE_MUTATION_QQL)

  return useCallback<LinkProps['onVote']>(
    (link) =>
      vote({
        variables: {
          linkId: link.id,
        },
        update: (cache, { data }) => {
          const vote = data?.vote
          const dataCache = cache.readQuery<LinkQueryQQL>({
            query: LINKS_QUERY_QQL,
            variables,
          })

          const updatedLinks = dataCache?.links.records.map((recordlink) => {
            if (recordlink.id === link.id) {
              return {
                ...recordlink,
                votes: [...link.votes, vote],
              }
            }

            return recordlink
          })

          cache.writeQuery({
            query: LINKS_QUERY_QQL,
            data: {
              links: {
                records: updatedLinks,
              },
            },
            variables,
          })
        },
      }),
    [vote, variables]
  )
}

export default useVoteMutation
