import React, { memo } from 'react'
import styles from './CheckIcon.module.scss'
import classNames from 'classnames/bind'

const ctx = classNames.bind(styles)

export type CheckIconProps = {
  isActive?: boolean
}

const CheckIcon: React.FC<CheckIconProps> = ({ isActive = false }): JSX.Element => {
  return (
    <div
      data-testid="checkicon"
      className={ctx({ checkIcon: true, checkIcon_type_active: isActive })}
    />
  )
}

export default memo(CheckIcon)
