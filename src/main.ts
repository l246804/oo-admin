import '@unocss/reset/tailwind.css'
import './styles/index.scss'
import 'uno.css'

import App from './App.vue'
import type { UserModule } from './types/user-module'
import { router } from './router'

// https://github.com/antfu/vite-ssg
const app = createApp(App)

// install all modules under `modules/`
Object.values(
  import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }),
).forEach(i => i.install?.({ app, router }))

app.mount('#app')
