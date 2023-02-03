import { useContext } from 'react'
import { LayoutContext, LayoutContextValue } from 'hoc/Layout/Provider'

const useLayout = (): LayoutContextValue => {
  const context = useContext(LayoutContext)

  if (context === null) {
    throw new Error('Unable to use layout outside of provider.')
  }

  return context
}

export default useLayout
