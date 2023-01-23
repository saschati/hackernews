import React from 'react'
import { VechaiProvider, Button } from '@vechaiui/react'

const App: React.FC = () => {
  return (
    <VechaiProvider>
      <Button>test</Button>
    </VechaiProvider>
  )
}

export default App
