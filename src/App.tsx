import React, { FC, useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { RecoilRoot, useRecoilSnapshot } from 'recoil'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Layout from './layout/basicLayout'
import loginApi from 'src/api/login'

moment.locale('zh-cn')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const App: FC = () => {
  const { isFetching } = useQuery('login', loginApi.testLogin)
  return (
    <ConfigProvider locale={zhCN}>
      {!isFetching ? (
        <Layout />
      ) : (
        <Spin
          spinning={true}
          style={{
            width: '100%',
            height: '564px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></Spin>
      )}
    </ConfigProvider>
  )
}

function DebugObserver() {
  const snapshot = useRecoilSnapshot()
  useEffect(() => {
    console.debug('The following atoms were modified:')
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.log(node.key, snapshot.getLoadable(node))
    }
  }, [snapshot])

  return null
}

function QueryProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RecoilRoot>
        <HashRouter>
          <DebugObserver />
          <App />
        </HashRouter>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default QueryProvider
