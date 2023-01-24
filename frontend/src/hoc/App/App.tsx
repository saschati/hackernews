import React from 'react'
import { VechaiProvider } from '@vechaiui/react'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import env from 'config/env'
import { BrowserRouter } from 'react-router-dom'

const httpLink = createHttpLink({
  uri: env.apiUrl,
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const App: React.FC<React.PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <VechaiProvider>{children}</VechaiProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default App
