import { Signup } from 'components/Domain/Auth'
import React from 'react'

const SignupController: React.FC = (): JSX.Element => {
  return (
    <div className="w-96 mt-60 mx-auto">
      <Signup />
    </div>
  )
}

export default SignupController
