import React from 'react'
import Link, { LinkProps } from './Link'
import { Link as LinkModel } from 'types/model/link'
import styles from './LinkList.module.scss'
import classNames from 'classnames'

export type LinkListProps = {
  className?: string
  links: Array<LinkModel>
  onLinkVote: LinkProps['onVote']
}

const LinkList: React.FC<LinkListProps> = ({ links, onLinkVote, className }): JSX.Element => {
  return (
    <div className={classNames(styles.linkList, className)}>
      {links.map((link) => (
        <Link key={link.id} link={link} onVote={onLinkVote} />
      ))}
    </div>
  )
}

export default LinkList
