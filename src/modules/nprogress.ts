import NProgress from 'nprogress'
import type { UserModule } from '@/types/user-module'

export const install: UserModule = ({ router }) => {
  router.beforeEach((to, from) => {
    if (to.path !== from.path)
      NProgress.start()
  })
  router.afterEach(() => {
    NProgress.done()
  })
}
