/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-01-30 08:09:33
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-30 08:10:08
 * @FilePath: \wanWanRN\src\components\common\header.tsx
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { StyleSheet, Text, View } from 'react-native'

const Header = (props: { title: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEDE2B',
    width: '100%',
    overflow: 'hidden',
    paddingBottom: 10
  },
  text: {
    fontSize: 18,
    textAlign: 'center'
  }
})

export default Header
