import { createPinia } from 'pinia'
import type { UserModule } from '@/types/user-module'

// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = ({ app }) => {
  const pinia = createPinia()
  app.use(pinia)
}
