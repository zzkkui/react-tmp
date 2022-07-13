import React, { useEffect, useMemo } from 'react'
import { Layout, Spin } from 'antd'

import SiderMenu from './siderMenu'
import RightHeader from './rightHeader'
import Authorized from 'src/components/authorized'
import routes from 'src/route'
import commonApi from 'src/api/common'

import styles from './style/layout.less'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { handleResData } from 'src/utils'
import getMenu from './handleMenu'
import { servicesAtom } from 'src/store/global'

const { Content } = Layout

function BasicLayout() {
  const [servicesState, setServicesState] = useRecoilState(servicesAtom)

  const hasGotPermission = servicesState && Object.keys(servicesState).length > 0

  const { isFetching, refetch } = useQuery(
    'services',
    async () => {
      const res = await commonApi.getServices()
      if (handleResData(res, '获取服务列表失败')) {
        setServicesState(res.data || {})
      }
    },
    {
      enabled: false,
    },
  )

  const menu = useMemo(() => getMenu(routes), [])

  useEffect(() => {
    if (!hasGotPermission) {
      refetch()
    }
  }, [hasGotPermission])

  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      {isFetching ? (
        <Spin style={{ position: 'absolute', left: '50%', top: '25%' }} size="large" />
      ) : (
        <>
          <SiderMenu menu={menu} />
          <Layout className={styles.siteLayout}>
            <RightHeader />
            <Content>
              <Authorized />
            </Content>
          </Layout>
        </>
      )}
    </Layout>
  )
}

export default BasicLayout
