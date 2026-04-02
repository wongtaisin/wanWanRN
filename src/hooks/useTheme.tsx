import { useColorScheme } from 'react-native'

const useTheme = () => {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const backgroundColor = isDark ? '#222222' : '#fff'
  const color = isDark ? '#fff' : '#000'

  return { color, isDark, backgroundColor }
}

export default useTheme
