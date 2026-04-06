/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-04-06 08:52:43
 * @Description:
 * @FilePath: \wanWanRN\src\components\CustomIcon.tsx
 * @LastEditTime: 2026-04-06 09:28:51
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @Description: 自定义 Icon 组件，用于在应用中使用 iconfont 图标
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */

import { createIconSet } from 'react-native-vector-icons'
import iconfontInfo from '../assets/iconfont/iconfont.json'

// 从 json 文件中提取图标信息，创建 glyphMap
const glyphMap: { [key: string]: string } = {}
iconfontInfo.glyphs.forEach(item => {
  // item.font_class 是图标的类名，如 'icon-home'
  // item.unicode 是图标的 unicode 编码
  glyphMap[item.font_class] = unescape(`%u${item.unicode}`)
})

// 创建自定义 Icon 组件
const CustomIcon = createIconSet(
  glyphMap,
  iconfontInfo.font_family, // 字体族名称，通常是 'iconfont'
  'iconfont.ttf' // 字体文件名
)

export default CustomIcon
