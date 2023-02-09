import { UserManager } from 'app/model/user/manager'
import React, { useMemo, useState } from 'react'
import { User } from 'types/model/user'
import AuthContext from './AuthContext'

export type FakeAuthProviderProps = React.PropsWithChildren & {
  isAuth: boolean
}

const userMock: User = {
  id: '1',
  name: 'User',
  email: 'user@user.user',
  votes: [],
  links: [],
}

const FakeAuthProvider: React.FC<FakeAuthProviderProps> = ({
  children,
  isAuth = false,
}): JSX.Element => {
  const [user, setUser] = useState<UserManager<User>>(() => new UserManager<User>(null))

  useMemo(() => {
    setUser(new UserManager<User>(isAuth ? userMock : null))
  }, [isAuth])

  const context = useMemo(() => {
    const getUser = () => {
      setUser(new UserManager<User>(userMock))
    }

    const logout = () => {
      setUser(new UserManager<User>(null))
    }

    return {
      user,
      getUser,
      logout,
      loading: false,
      error: null,
    }
  }, [user])

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export default FakeAuthProvider
