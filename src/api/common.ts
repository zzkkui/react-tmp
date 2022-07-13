import { fetchApi } from 'src/utils/axios'

const path = '/cicd/services'

export default {
  // 获取 cicd 服务列表
  getServices() {
    return fetchApi.get({ url: path, params: { svc_type: 1 } })
  },
}
