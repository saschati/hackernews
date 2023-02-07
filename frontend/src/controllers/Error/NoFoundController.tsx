import { Error } from 'components/Common/Router'
import React from 'react'

const NoFoundController: React.FC = (): JSX.Element => {
  return (
    <div className="mt-60">
      <Error code={404} message="Page not found" />
    </div>
  )
}

export default NoFoundController
