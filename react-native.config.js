/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-04-03 17:09:51
 * @Description:
 * @FilePath: \wanWanRN\react-native.config.js
 * @LastEditTime: 2026-04-06 08:21:06
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @Description: 配置字体文件路径
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
module.exports = {
  project: {
    ios: {},
    android: {}
  },
  assets: [
    './src/assets/fonts/', // 阿里矢量图
    'node_modules/@ant-design/icons-react-native/fonts' // Ant Design 图标字体文件路径
  ] // 你的资源路径
}
