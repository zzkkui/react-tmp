declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  VITE_PORT: number
  VITE_USE_MOCK: boolean
  VITE_USE_PWA: boolean
  VITE_PUBLIC_PATH: string
  VITE_PROXY: [string, string][]
  VITE_GLOB_APP_TITLE: string
  VITE_GLOB_APP_SHORT_NAME: string
  VITE_USE_CDN: boolean
  VITE_DROP_CONSOLE: boolean
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  VITE_LEGACY: boolean
  VITE_USE_IMAGEMIN: boolean
  VITE_GENERATE_UI: string
  VITE_USE_SPRITE: boolean
  VITE_USE_AUTOIMPORT: boolean
}

declare module '*.less' {
  const resource: { [key: string]: string }
  export = resource
}

declare module '@wojtekmaj/enzyme-adapter-react-17'

declare module 'enzyme'

declare module '*.png'

declare const PUBLIC: Record<string, string>

declare module 'virtual:*' {
  const result: any
  export default result
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>

declare type Nullable<T> = T | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}
