import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import Link from 'components/Common/Link'
import { LinksSerchQueryQQL, LINKS_SEARCH_QUERY_QQL } from 'services/ggl/link'
import useVoteMutation from 'hooks/domain/link/useVoteMutatuon'

const Search: React.FC = (): JSX.Element => {
  const [searchFilter, setSearchFilter] = useState('')
  const [executeSearch, { data }] = useLazyQuery<LinksSerchQueryQQL>(LINKS_SEARCH_QUERY_QQL)

  const handlerLinkVote = useVoteMutation()

  return (
    <>
      <div>
        Search
        <input type="text" onChange={(e) => setSearchFilter(e.target.value)} />
        <button
          onClick={() =>
            executeSearch({
              variables: { filter: searchFilter },
            })
          }
        >
          OK
        </button>
      </div>
      {data?.links.records.map((link, index) => (
        <Link key={link.id} link={link} index={index} onVote={handlerLinkVote} />
      ))}
    </>
  )
}

export default Search
