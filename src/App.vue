<script setup lang="ts">
const { isPreferredDark } = useSysTheme()
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'oo-admin',
  meta: [
    { name: 'description', content: '一个中后台管理系统模板。' },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() =>
        isPreferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
      ),
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
