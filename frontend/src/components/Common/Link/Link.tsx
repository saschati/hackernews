import useAuth from 'hooks/useAuth'
import React, { memo, useMemo } from 'react'
import { Link as LinkModel } from 'types/model/link'
import { timeDifferenceForDate } from 'utils/timeDifference'
import styles from './Link.module.scss'
import classNames from 'classnames'
import { Avatar } from '@vechaiui/react'
import { CheckIcon } from 'components/UI/Icon'

export type LinkProps = {
  link: LinkModel
  onVote(link: LinkModel): void
  className?: string
}

const Link: React.FC<LinkProps> = ({ link, className, onVote }): JSX.Element => {
  const { user } = useAuth()

  const isActive = useMemo(() => {
    if (!link.votes.length || user.isGuest() === true) {
      return false
    }

    return link.votes.some((vote) => vote.user.id === user.get('id'))
  }, [link.votes, user])

  return (
    <div data-testid="link" className={classNames(styles.link, className)}>
      <div className={styles.link__vote}>
        <span className={styles.link__count}>{link.votes.length}</span>
        {!user.isGuest() && (
          <div className={styles.link__icon} onClick={isActive ? undefined : () => onVote(link)}>
            <CheckIcon isActive={isActive} />
          </div>
        )}
      </div>
      <div className={styles.link__content}>
        <div>
          <p className={styles.link__url}>{link.url}</p>
          <p className={styles.link__description}>{link.description}</p>
        </div>
        <div className={styles.link__user}>
          <Avatar name={link.postedBy.name} size="xl" />
          <p className={styles.link__name}>{link.postedBy.name}</p>
          <p className={styles.link__created}>{timeDifferenceForDate(link.createdAt)}</p>
        </div>
      </div>
    </div>
  )
}

export default memo(Link)
