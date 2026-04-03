/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-02-26 13:57:02
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-04-03 09:24:27
 * @FilePath: \wanWanRN\App.tsx
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen' // 示例模板
import React from 'react'
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import Home from './src/pages/Home'

function App() {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  )
}

function AppContent() {
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      {/* <NewAppScreen templateFileName="App.tsx" safeAreaInsets={insets} /> */}

      {/* 顶部安全区域背景 */}
      <View style={[styles.safeTop, { height: insets.top }]} />
      <Home />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeTop: {
    backgroundColor: '#FEDE2B'
  }
})

export default App
