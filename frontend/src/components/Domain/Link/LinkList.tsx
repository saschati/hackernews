import React from 'react'
import Link from './Link'
import { useQuery, gql } from '@apollo/client'
import { Link as LinkModel } from 'types/model/link'

interface LinkData {
  links: {
    records: Array<LinkModel>
  }
}

const LINKS_QUERY = gql`
  {
    links {
      records {
        id
        createdAt
        url
        description
      }
    }
  }
`

const LinkList: React.FC = (): JSX.Element => {
  const { data } = useQuery<LinkData>(LINKS_QUERY)

  return (
    <div>
      {data?.links.records.map((link) => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  )
}

export default LinkList
