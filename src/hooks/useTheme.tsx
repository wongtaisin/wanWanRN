import { useMemo } from 'react' // 用于缓存计算结果，避免重复计算
import { Appearance } from 'react-native'

const colorScheme = Appearance.getColorScheme() // 获取当前颜色方案

const useTheme = () => {
  const isDark = useMemo(() => colorScheme === 'dark', [colorScheme])

  const backgroundColor = useMemo(() => (isDark ? '#222222' : '#fff'), [isDark])

  const color = useMemo(() => (isDark ? '#fff' : '#000'), [isDark])

  return { color, isDark, backgroundColor }
}

export default useTheme
