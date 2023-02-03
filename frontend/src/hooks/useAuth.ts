import { AuthContext, AuthContextValue } from 'hoc/Auth'
import { useContext } from 'react'

const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error('Unable to use auth outside of provider.')
  }

  return context
}

export default useAuth
