import React from 'react'
import { Link } from 'react-router-dom'

import styles from './index.less'

function Redis() {
  return (
    <div className={styles.redis}>
      Redis
      <Link to={'/redis/aaa'}>redis-aaa</Link>
    </div>
  )
}

export default Redis
