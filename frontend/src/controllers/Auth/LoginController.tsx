import { Login } from 'components/Domain/Auth'
import React from 'react'

const LoginController: React.FC = (): JSX.Element => {
  return (
    <div className="w-96 m-60 mx-auto">
      <Login />
    </div>
  )
}

export default LoginController
