import React, { Suspense } from 'react'
import { Spin } from 'antd'
import { AppstoreOutlined, BookOutlined } from '@ant-design/icons'

export interface CusRouteMeta {
  // 是否为单级菜单
  single?: boolean
  title?: string
  hideBreadcrumb?: boolean
  hideMenu?: boolean
  orderNo?: number
  icon?: string | React.ReactNode
  isMenu?: boolean
  hideHeader?: boolean
  url?: string
}

export type RoutesType = {
  name: string
  path?: string
  component?: any
  routes?: RoutesType[]
  meta?: CusRouteMeta
  redirect?: string
}

const Overview = React.lazy(() => import('src/pages/overview'))
const Redis = React.lazy(() => import('src/pages/redis'))
const RedisDetail = React.lazy(() => import('src/pages/redis/detail'))

export const withSuspense = (Component: any) => (
  <Suspense fallback={<Spin style={{ position: 'absolute', left: '50%', top: '25%' }} size="large" />}>
    <Component />
  </Suspense>
)

const routes: RoutesType[] = [
  {
    path: '/overview',
    name: 'overview',
    meta: {
      title: '总览',
      isMenu: true,
      icon: <AppstoreOutlined />,
    },
    component: withSuspense(Overview),
  },
  {
    name: 'database',
    // path: '/redis',
    redirect: '/redis',
    meta: {
      title: '数据库',
      isMenu: true,
      icon: <BookOutlined />,
    },
    routes: [
      {
        path: '/redis',
        name: 'redis',
        meta: {
          title: 'Redis',
          isMenu: true,
        },
        component: withSuspense(Redis),
        routes: [
          {
            path: '/:id',
            name: 'RedisDetail',
            meta: {
              hideHeader: true,
            },
            component: withSuspense(RedisDetail),
          },
        ],
      },
    ],
  },
]

export default routes
