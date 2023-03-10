import ElementPlus from 'element-plus'
import type { UserModule } from '@/types/user-module'

export const install: UserModule = ({ app }) => {
  app.use(ElementPlus)
}
