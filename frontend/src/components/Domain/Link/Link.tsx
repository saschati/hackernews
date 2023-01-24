import React from 'react'
import { Link as LinkModel } from 'types/model/link'

type LinkProp = Pick<LinkModel, 'description' | 'url'>

export interface LinkProps {
  link: LinkProp
}

const Link: React.FC<LinkProps> = ({ link }): JSX.Element => {
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  )
}

export default Link
