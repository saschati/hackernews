import React from 'react'
import styles from './Footer.module.scss'

const date = new Date()

const Footer: React.FC = (): JSX.Element => {
  return <div className={styles.footer}>© {date.getFullYear()} All rights reserved.</div>
}

export default Footer
