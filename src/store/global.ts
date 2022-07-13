import { atom, selector } from 'recoil'
import { MenuType } from 'src/layout/handleMenu'

export type BreadCrumbType = {
  prev?: string
  paths?: { name: string; path?: string }[]
}

export const collapsedAtom = atom({
  key: 'collapsed',
  default: false,
})

export const hideHeaderAtom = atom({
  key: 'hideHeaderAtom',
  default: false,
})

export const selectedMenuAtom = atom({
  key: 'selectedMenu',
  default: {} as MenuType,
})

export const hideHeaderSelector = selector({
  key: 'hideHeaderSelector',
  get: ({ get }) => !!get(selectedMenuAtom).meta?.hideHeader || get(hideHeaderAtom),
})

export const menuOpenKeysAtom = atom({
  key: 'menuOpenKeysAtom',
  default: [] as string[],
})

export const breadCrumbsAtom = atom({
  key: 'breadCrumbs',
  default: {} as BreadCrumbType,
})

export const projectGlobalAtom = atom({
  key: 'projectGlobal',
  default: {
    projectGroupId: null,
    pmId: '',
  },
})

export const servicesAtom = atom({
  key: 'services',
  default: null,
})
