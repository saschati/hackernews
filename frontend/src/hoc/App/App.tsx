import React, { useMemo } from 'react'
import { VechaiProvider } from '@vechaiui/react'
import { OperationDefinitionNode } from 'graphql'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { setContext } from '@apollo/client/link/context'
import env from 'config/env'
import { BrowserRouter } from 'react-router-dom'
import { AUTH_TOKEN } from 'config/constants'
import useStorage, { StorageType } from 'hooks/useStorage'
import { getMainDefinition } from '@apollo/client/utilities'

const App: React.FC<React.PropsWithChildren> = ({ children }): JSX.Element => {
  const storage = useStorage(StorageType.LOCAL)

  const [client] = useMemo(() => {
    const token = storage.get<string, null>(AUTH_TOKEN)

    const httpLink = createHttpLink({
      uri: env.apiUrl,
    })

    const wsLink = new GraphQLWsLink(
      createClient({
        url: env.apiWsUrl,
        connectionParams: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      })
    )

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      }
    })

    const link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      authLink.concat(httpLink)
    )

    const client = new ApolloClient({
      link,
      cache: new InMemoryCache(),
    })

    return [client]
  }, [storage])

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <VechaiProvider>{children}</VechaiProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default App
