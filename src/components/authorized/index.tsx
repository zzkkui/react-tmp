import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import NoPermission from 'src/pages/sys/403'
import NotFound from 'src/pages/sys/404'

import routes, { RoutesType } from 'src/route'

const baseUrl = '/'

function flattenRouteHandle(routes: RoutesType[], permission?: Record<string, string>, path?: string) {
  return routes.reduce((prev: RoutesType[], curr) => {
    if (!permission || (permission && permission[curr.name])) {
      if (curr.path) {
        prev = [...prev, { ...curr, path: path ? `${path}${curr.path}` : curr.path }]
      }
      if (curr.routes) {
        const _path = path ? `${path}${curr.path}` : curr.path
        prev = [...prev, ...flattenRouteHandle(curr.routes, permission, _path)]
      }
    } else if (permission && !permission[curr.name] && curr.component) {
      const _path = path ? `${path}${curr.path}` : curr.path
      prev = [...prev, { ...curr, component: NoPermission, path: _path }]
    }
    return prev
  }, [])
}

const Auth = () => {
  const flattenRoute = flattenRouteHandle(routes).map((n) => {
    delete n.routes
    return n
  })

  const defaultRoute = flattenRoute.find((n) => !n.meta?.hideHeader && n.path && n.component !== NoPermission)

  return (
    <Switch>
      <Redirect from={baseUrl} to={defaultRoute?.path || '/'} exact />
      {flattenRoute.map((item: RoutesType) => {
        return (
          <Route
            exact
            path={item.path}
            key={item.path}
            render={() => {
              return item.component
            }}
          />
        )
      })}
      <Route component={NotFound}></Route>
    </Switch>
  )
}

export default Auth
