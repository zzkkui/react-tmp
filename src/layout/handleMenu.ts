import cloneDeep from 'lodash/cloneDeep'
import { deepMerge } from 'src/utils'
import { RoutesType } from 'src/route'

export interface MenuType {
  name: string
  path: string
  title: string
  meta?: Recordable
  icon?: string | JSX.Element
  children?: MenuType[]
  url?: string
}

export function findPath<T = any>(tree: any, func: Fn): T | T[] | null {
  const path: T[] = []
  const list = [...tree]
  const visitedSet = new Set()
  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      path.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node.children && list.unshift(...node.children)
      path.push(node)
      if (func(node)) {
        return path
      }
    }
  }
  return null
}

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as MenuType[]
  return (menuList || []).map((item) => item.name)
}

function joinParentPath(menus: MenuType[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    if (menu.path && !menu.path.startsWith('/')) {
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu.children?.length) {
      joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path)
    }
  }
}

function generateMenus(router: RoutesType[]): MenuType[] {
  return router.map((n) => {
    const { name, meta = {}, routes, path } = n
    const { title, icon, url } = meta
    // 如果有 children 但是只有 一条数据 且 没有 path
    if (routes && routes.length === 1 && !routes[0].path) {
      const child = routes[0]
      const _meta = deepMerge(meta, child.meta || {})
      return {
        name,
        path,
        title,
        icon,
        url,
        ..._meta,
      }
    }
    let _children
    if (routes) {
      _children = generateMenus(routes)
    }

    return {
      name,
      path,
      title,
      icon,
      url,
      children: _children || null,
      ...meta,
    }
  })
}

export default function getMenu(routers: RoutesType[]): MenuType[] {
  const cloneRouteModList = cloneDeep(routers).filter((n) => !n.meta?.hideMenu)
  const routeList: RoutesType[] = []

  cloneRouteModList.forEach((item) => {
    if (item.meta?.single) {
      const realItem = item?.routes?.[0]
      realItem && routeList.push({ ...item, ...realItem })
    } else {
      routeList.push(item)
    }
  })

  const menus = generateMenus(cloneRouteModList)
  joinParentPath(menus)
  return menus
}
