import React, { memo } from 'react'
import classNames from 'classnames'

export type ErrorProps = {
  className?: string
  message?: string
}

const Error: React.FC<ErrorProps> = ({ message, className }): JSX.Element | null => {
  if (!message) {
    return null
  }

  return (
    <p data-testid="text-error" className={classNames('text-sm text-red-600', className)}>
      * {message}
    </p>
  )
}

export default memo(Error)
