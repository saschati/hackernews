import React from 'react'
import { Title } from 'components/UI/Text'
import styles from './Error.module.scss'

export type ErrorProps = {
  code: number
  message: string
}

const Error: React.FC<ErrorProps> = ({ code, message }): JSX.Element => {
  return (
    <div data-testid="error" className={styles.error}>
      <Title position="center">Error: {code}</Title>
      <p className={styles.error__message}>{message}</p>
    </div>
  )
}

export default Error
