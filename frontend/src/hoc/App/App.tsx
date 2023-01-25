import React, { useMemo } from 'react'
import { VechaiProvider } from '@vechaiui/react'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import env from 'config/env'
import { BrowserRouter } from 'react-router-dom'
import { AUTH_TOKEN } from 'config/constants'
import useStorage, { StorageType } from 'hooks/useStorage'
import LocalStorage from 'app/storage/local'

const App: React.FC<React.PropsWithChildren> = ({ children }): JSX.Element => {
  const storage = useStorage<LocalStorage>(StorageType.LOCAL)

  const [client] = useMemo(() => {
    const httpLink = createHttpLink({
      uri: env.apiUrl,
    })

    const authLink = setContext((_, { headers }) => {
      const token = storage.get<string, null>(AUTH_TOKEN)

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      }
    })

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
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
