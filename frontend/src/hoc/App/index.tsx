import React from 'react'
import { VechaiProvider, Button } from '@vechaiui/react'

const App: React.FC = (): JSX.Element => {
  return (
    <VechaiProvider>
      <Button>test</Button>
    </VechaiProvider>
  )
}

export default App
