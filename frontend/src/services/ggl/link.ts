import { gql } from '@apollo/client'
import { Link } from 'types/model/link'
import { Vote } from 'types/model/vote'

export interface LinkQueryQQL {
  links: {
    records: Array<Link>
    __typename: 'LinkRecord'
  }
}

export const LINKS_QUERY_QQL = gql`
  query FeedQuery($paggin: Paggination, $orderBy: LinkOrderByInput) {
    links(paggin: $paggin, orderBy: $orderBy) {
      records {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export interface NewLinksSubscriptionQQL {
  newLink: Link
}

export const NEW_LINKS_SUBSCRIPTION_QQL = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`

export interface VoteMutationQQL {
  vote: Vote
}

export const VOTE_MUTATION_QQL = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`

export type LinksSerchQueryQQL = LinkQueryQQL

export const LINKS_SEARCH_QUERY_QQL = gql`
  query FeedSearchQuery($filter: String!) {
    links(filter: $filter) {
      records {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export interface CreateLinkMutationQQL {
  postLink: Link
}

export const CREATE_LINK_MUTATION_QQL = gql`
  mutation PostMutation($description: String!, $url: String!) {
    postLink(description: $description, url: $url) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`
