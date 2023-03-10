import { router } from '@/router'
import type { UserModule } from '@/types/user-module'

export const install: UserModule = ({ app }) => {
  app.use(router)
}
