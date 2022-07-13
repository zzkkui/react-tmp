import { fetchApi } from 'src/utils/axios'

export default {
  testLogin(params: any) {
    return fetchApi.post({
      url: '/ticketlogin/a?cicd_debug=1',
    })
  },
}
