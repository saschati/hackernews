import { AUTH_TOKEN } from 'config/constants'
import React from 'react'
import { Link as LinkModel } from 'types/model/link'
import { timeDifferenceForDate } from 'utils/timeDifference'

export interface LinkProps {
  link: LinkModel
  index: number
}

const Link: React.FC<LinkProps> = ({ link, index }): JSX.Element => {
  const authToken = localStorage.getItem(AUTH_TOKEN)

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              console.log('Clicked vote button')
            }}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        }
      </div>
    </div>
  )
}

export default Link
