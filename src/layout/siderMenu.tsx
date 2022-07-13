import React, { FC, useEffect, useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Layout } from 'antd'
import CollapseBtn from './collapseBtn'
import { useRecoilState } from 'recoil'
import { getAllParentPath, MenuType } from './handleMenu'
import { collapsedAtom, menuOpenKeysAtom, selectedMenuAtom } from 'src/store/global'

const { Sider } = Layout

interface SiderMenuProps {
  menu: MenuType[]
}

const { SubMenu } = Menu

function getSelectedMenu(path: string, menu: MenuType[]): MenuType | undefined {
  if (path === '/') {
    return undefined
  } else {
    for (let i = 0; i < menu.length; i++) {
      const currMenu = menu[i]
      if (path === currMenu.path) {
        return currMenu
      }
      if (currMenu.children) {
        const res = getSelectedMenu(path, currMenu.children)
        if (res) {
          return res
        }
      }
      continue
    }
  }
}

const SiderMenu: FC<SiderMenuProps> = (props) => {
  const [selectedMenuState, setSelectedMenuState] = useRecoilState(selectedMenuAtom)
  const [collapsedState, setCollapsedState] = useRecoilState(collapsedAtom)
  const [openKeys, setOpenKeys] = useRecoilState(menuOpenKeysAtom)
  const { pathname } = useLocation()

  const { menu } = props

  const selectedKeys = selectedMenuState.name

  const handleOpenKeys = () => {
    if (!menu || menu.length === 0) {
      setOpenKeys([])
    } else {
      setOpenKeys(getAllParentPath(menu, pathname))
    }
  }

  const onCollapse = (collapsed: boolean) => {
    if (collapsed) {
      setOpenKeys([])
    }
    setCollapsedState(collapsed)
  }

  const onOpenChange = (_openKeys: string[]) => {
    setOpenKeys(_openKeys)
  }

  useEffect(() => {
    handleOpenKeys()
  }, [menu])

  useEffect(() => {
    if (pathname) {
      const selected = getSelectedMenu(pathname, menu)
      setSelectedMenuState(selected || ({} as MenuType))
    }
  }, [pathname])

  useLayoutEffect(() => {
    if (!collapsedState) {
      handleOpenKeys()
    }
  }, [collapsedState])
  return (
    <Sider width={216} theme="light" trigger={null} collapsed={collapsedState}>
      <CollapseBtn collapse={collapsedState} onChange={onCollapse} />
      <Menu mode="inline" openKeys={openKeys} selectedKeys={[selectedKeys]} onOpenChange={onOpenChange}>
        {menu.map((item) => {
          return item.children?.length ? (
            <SubMenu
              key={item.name}
              title={
                <span>
                  {item.icon ? item.icon : ''}
                  <span>{item.title}</span>
                </span>
              }
            >
              {item.children.map((child) => {
                return (
                  <Menu.Item key={child.name}>
                    {child.path && selectedKeys === child.path ? (
                      <span title={child.title}>{child.title}</span>
                    ) : (
                      <Link to={child.path!} title={child.title}>
                        <span title={child.title}>{child.title}</span>
                      </Link>
                    )}
                  </Menu.Item>
                )
              })}
            </SubMenu>
          ) : (
            <Menu.Item key={item.name} title={item.title}>
              {item.path && selectedKeys === item.path ? (
                <>
                  {item.icon ? item.icon : ''}
                  <span title={item.title}>{item.title}</span>
                </>
              ) : (
                <Link to={item.path!}>
                  {item.icon ? item.icon : ''}
                  <span title={item.title}>{item.title}</span>
                </Link>
              )}
            </Menu.Item>
          )
        })}
      </Menu>
    </Sider>
  )
}

SiderMenu.displayName = 'SiderMenu'
export default SiderMenu
