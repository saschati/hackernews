import { gql, useLazyQuery } from '@apollo/client'
import { UserManager } from 'app/model/user/manager'
import LocalStorage from 'app/storage/local'
import { AUTH_TOKEN } from 'config/constants'
import useStorage, { StorageType } from 'hooks/useStorage'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { User } from 'types/model/user'
import AuthContext from './AuthContext'

interface UserData {
  user: User
}

const USER_QUERY = gql`
  query User($token: String) {
    user(token: $token) {
      id
      email
      name
    }
  }
`
const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }): JSX.Element => {
  const [user, setUser] = useState<UserManager<User>>(() => new UserManager<User>(null))
  const storage = useStorage<LocalStorage>(StorageType.LOCAL)

  const [getUser, { loading, error }] = useLazyQuery<UserData>(USER_QUERY, {
    onCompleted: (data) => {
      setUser(new UserManager(data?.user || null))
    },
  })
  const logout = useCallback((): void => {
    storage.remove(AUTH_TOKEN)
    setUser(new UserManager<User>(null))
  }, [storage])

  useEffect(() => {
    if (!storage.has(AUTH_TOKEN)) {
      return
    }

    if (!user.isGuest()) {
      return
    }

    getUser()
  }, [getUser, user, storage])

  useEffect(() => {
    const listener = async (e: StorageEvent) => {
      if (e.key === AUTH_TOKEN) {
        if (e.newValue !== null) {
          getUser({ variables: { token: e.newValue } })
        } else {
          setUser(new UserManager<User>(null))
        }
      }
    }
    window.addEventListener('storage', listener)
    return () => window.removeEventListener('storage', listener)
  }, [])

  const context = useMemo(() => {
    return {
      user,
      getUser,
      logout,
      loading,
      error: error?.message || null,
    }
  }, [loading, error, user, getUser, logout])

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export default AuthProvider
