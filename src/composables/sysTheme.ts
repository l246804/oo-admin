export const useSysTheme = () => {
  const isPreferredDark = usePreferredDark()
  const isDark = useDark()
  const toggleDark = useToggle(isDark)
  return { isDark, toggleDark, isPreferredDark }
}
