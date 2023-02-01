import useAuth from 'hooks/useAuth'
import React, { memo } from 'react'
import { Link as LinkModel } from 'types/model/link'
import { timeDifferenceForDate } from 'utils/timeDifference'

export type LinkProps = {
  link: LinkModel
  index: number
  onVote(link: LinkModel): void
}

const Link: React.FC<LinkProps> = ({ link, index, onVote }): JSX.Element => {
  const { user } = useAuth()

  return (
    <div>
      <div>
        <span>{index + 1}.</span>
        {!user.isGuest() && <div onClick={() => onVote(link)}>▲</div>}
      </div>
      <div>
        <div>
          {link.description} ({link.url})
        </div>
        {
          <div>
            {link.votes.length} votes | by {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        }
      </div>
    </div>
  )
}

export default memo(Link)
