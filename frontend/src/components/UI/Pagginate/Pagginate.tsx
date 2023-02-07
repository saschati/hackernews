import React, { memo, useCallback } from 'react'
import styles from './Pagginate.module.scss'
import classNames from 'classnames'
import ReactPaginate, { type ReactPaginateProps } from 'react-paginate'

type ReactPaginatePropsRequired = Required<Pick<ReactPaginateProps, 'onPageChange'>>

export type PagginateProps = ReactPaginateProps & {
  onChange(page: number): void
  pageCount: number
  forcePage: number
}

const Pagginate: React.FC<PagginateProps> = ({
  className,
  onChange,
  pageCount,
  forcePage,
  ...rest
}): JSX.Element => {
  const handlerZero = useCallback(() => null, [])
  const handlerPageChange = useCallback<ReactPaginatePropsRequired['onPageChange']>(
    ({ selected }) => onChange(selected + 1),
    [onChange]
  )

  return (
    <ReactPaginate
      className={classNames(styles.pagginate, className)}
      pageCount={pageCount}
      pageRangeDisplayed={4}
      marginPagesDisplayed={2}
      onPageChange={handlerPageChange}
      forcePage={forcePage && forcePage - 1}
      renderOnZeroPageCount={handlerZero}
      disableInitialCallback={true}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      breakClassName={styles.pagginate__break}
      breakLinkClassName={styles.pagginate__link}
      pageClassName={styles.pagginate__item}
      pageLinkClassName={styles.pagginate__link}
      previousClassName={classNames(styles.pagginate__previous, styles.pagginate__item)}
      previousLinkClassName={styles.pagginate__link}
      nextClassName={classNames(styles.pagginate__next, styles.pagginate__item)}
      nextLinkClassName={styles.pagginate__link}
      activeClassName={styles.pagginate__item_type_active}
      disabledClassName={styles.pagginate__item_type_disabled}
      {...rest}
    />
  )
}

export default memo(Pagginate)
