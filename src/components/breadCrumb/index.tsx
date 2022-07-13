import React from 'react'
import { useHistory } from 'react-router'

import { Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'

import styles from './index.less'
import { useRecoilValue } from 'recoil'
import { breadCrumbsAtom } from 'src/store/global'

function CustBreadCrumb() {
  const breadCrumbs = useRecoilValue(breadCrumbsAtom)
  const history = useHistory()
  const { paths, prev } = breadCrumbs

  const handleGoBack = () => {
    history.push(prev!)
  }

  const handleGo = (path?: string) => {
    if (path) {
      history.push(path)
    }
  }

  return (
    <div className={styles.breadCrumb}>
      {prev ? (
        <>
          <span className={styles.goBack}>
            <Button type="link" onClick={handleGoBack}>
              返回上一级
            </Button>
          </span>
          <span className={styles.btnLine}></span>
        </>
      ) : null}
      {paths?.map((n, i) => {
        return (
          <span className={styles.path} key={n.name}>
            {n.path ? (
              <Button type="link" onClick={() => handleGo(n.path)}>
                {n.name}
              </Button>
            ) : (
              <span className={styles.name}>{n.name}</span>
            )}

            {i === paths.length - 1 ? null : <RightOutlined className={styles.rightArrow} />}
          </span>
        )
      })}
    </div>
  )
}

export default React.memo(CustBreadCrumb)
