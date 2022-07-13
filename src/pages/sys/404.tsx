import React, { useEffect, useRef } from 'react'
import { Button } from 'antd'
import lottie from 'lottie-web'
import { useHistory } from 'react-router'

import styles from './index.less'
import { useSetRecoilState } from 'recoil'
import { hideHeaderAtom } from 'src/store/global'

const STATIC_PATH = import.meta.env.PROD ? '/api/getNotfound/' : window?.STATIC_PATH

function NotFound() {
  const gifRef = useRef<HTMLDivElement>(null)
  const history = useHistory()
  const setHideHeaderState = useSetRecoilState(hideHeaderAtom)

  const goToIndex = () => {
    history.push('/')
  }

  useEffect(() => {
    setHideHeaderState(true)
    if (STATIC_PATH) {
      lottie.loadAnimation({
        container: gifRef.current!,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: STATIC_PATH + '404.json',
      })
    }
    return () => {
      setHideHeaderState(false)
    }
  }, [])

  return (
    <div className={styles.notFount}>
      <div className={styles.error}>
        <div ref={gifRef} className={styles.gif}></div>
        <p className={styles.title}>哎呀来晚了，页面已经被偷走了！</p>
        <p className={styles.desc}>抱歉，您访问的页面不存在或已被删除！</p>
        <div className={styles.button}>
          <Button type="primary" onClick={goToIndex}>
            返回首页
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
