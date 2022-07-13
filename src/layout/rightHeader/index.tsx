import React, { FC } from 'react'
import styles from './index.less'
import { Layout } from 'antd'
import CustBreadCrumb from 'src/components/breadCrumb'
import { useRecoilValue } from 'recoil'
import { breadCrumbsAtom, hideHeaderSelector, selectedMenuAtom } from 'src/store/global'

const { Header } = Layout

const RightHeader: FC = () => {
  const hideHeader = useRecoilValue(hideHeaderSelector)
  const breadCrumbs = useRecoilValue(breadCrumbsAtom)
  const selectedMenu = useRecoilValue(selectedMenuAtom)

  return (
    <Header style={{ display: hideHeader && !breadCrumbs.paths ? 'none' : 'block' }}>
      <div className={styles.headerBox}>
        {!hideHeader ? (
          <>
            <span className={styles.titleIcon} />
            <span className={styles.title}>{selectedMenu.title}</span>
          </>
        ) : breadCrumbs.paths ? (
          <CustBreadCrumb />
        ) : null}
      </div>
    </Header>
  )
}

RightHeader.displayName = 'RightHeader'
export default React.memo(RightHeader)
