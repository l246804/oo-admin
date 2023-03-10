import { createHead } from '@vueuse/head'
import type { UserModule } from '@/types/user-module'

const head = createHead()

export const install: UserModule = ({ app }) => {
  app.use(head)
}
