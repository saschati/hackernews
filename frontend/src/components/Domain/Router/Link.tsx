import React, { memo } from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import Path from 'config/path'
import { Link as LinkUI, LinkProps as LinkUILinkProps } from '@vechaiui/react'
import classNames from 'classnames'

type LinkColor = 'blue' | 'black' | 'none'

export type LinkProps = React.PropsWithChildren &
  LinkUILinkProps &
  RouterLinkProps & {
    to: Path | string
    color?: LinkColor
    className?: string
  }

const COLOR_TO_CLASS = {
  blue: 'text-blue-500',
  black: 'text-black',
  none: undefined,
}

const Link: React.FC<LinkProps> = ({
  to,
  className,
  children,
  color = 'blue',
  ...rest
}): JSX.Element => {
  return (
    <LinkUI
      as={RouterLink}
      className={classNames(COLOR_TO_CLASS[color], className, 'cursor-pointer')}
      to={to}
      {...rest}
    >
      {children}
    </LinkUI>
  )
}

export default memo(Link)
