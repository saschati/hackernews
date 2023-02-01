import React from 'react'
import Link, { LinkProps } from './Link'
import { Link as LinkModel } from 'types/model/link'

export type LinkListProps = {
  links: Array<LinkModel>
  onLinkVote: LinkProps['onVote']
}

const LinkList: React.FC<LinkListProps> = ({ links, onLinkVote }): JSX.Element => {
  return (
    <div>
      {links.map((link, index) => (
        <Link key={link.id} link={link} index={index} onVote={onLinkVote} />
      ))}
    </div>
  )
}

export default LinkList
