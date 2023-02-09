import React, { memo } from 'react'
import styles from './Title.module.scss'
import classNames from 'classnames'

type TitleSize = 'default'
type TitlePosition = 'default' | 'center'

export type TitleProps = React.PropsWithChildren & {
  className?: string
  size?: TitleSize
  position?: TitlePosition
  as?: keyof JSX.IntrinsicElements | React.FC
}

const SIZE_TO_CLASS = {
  default: styles.title_size_default,
}

const POSITION_TO_CLASS = {
  default: styles.title_position_default,
  center: styles.title_position_center,
}

const Title: React.FC<TitleProps> = ({
  children,
  className,
  size = 'default',
  position = 'default',
  as = 'h1',
}): JSX.Element => {
  const CustomTag = as

  return (
    <CustomTag
      data-testid="text-title"
      className={classNames(
        styles.title,
        SIZE_TO_CLASS[size],
        POSITION_TO_CLASS[position],
        className
      )}
    >
      {children}
    </CustomTag>
  )
}

export default memo(Title)
