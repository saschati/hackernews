import { Title } from 'components/UI/Text'
import React from 'react'

const HomeController: React.FC = (): JSX.Element => {
  return (
    <div className="w-96 mt-60 mx-auto">
      <Title position="center">Hacker News</Title>
      <p className="text-center mt-5">
        A small demo project, React works with GraphQL powered by ApolloClient
      </p>
    </div>
  )
}

export default HomeController
