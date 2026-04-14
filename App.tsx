/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-04-06 10:37:04
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-04-14 16:30:39
 * @FilePath: \wanWanRN\App.tsx
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-02-26 13:57:02
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-04-14 16:29:27
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
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, useColorScheme, View } from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import Home from './src/pages/home'
import Login from './src/pages/login'
import { clearToken, initTokenFromStorage, isLoggedIn } from './src/services/auth'
import { eventEmitter } from './src/utils/eventEmitter'

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
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null) // null 表示初始化中
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // 初始化应用状态
    const initializeApp = async () => {
      try {
        // 从存储加载 token
        await initTokenFromStorage()
        // 检查是否已登录
        const logged = isLoggedIn()
        setLoggedIn(logged)
      } catch (error) {
        console.error('初始化应用失败:', error)
        setLoggedIn(false)
      } finally {
        setIsInitialized(true)
      }
    }

    initializeApp()
  }, [])

  useEffect(() => {
    // 监听 401 未授权错误
    const handleUnauthorized = () => {
      clearToken()
      setLoggedIn(false)
    }

    eventEmitter.on('UNAUTHORIZED', handleUnauthorized)

    return () => {
      eventEmitter.off('UNAUTHORIZED', handleUnauthorized)
    }
  }, [])

  const handleLoginSuccess = () => {
    setLoggedIn(true)
  }

  // 初始化时显示加载屏幕
  if (!isInitialized || loggedIn === null) {
    return (
      <View style={styles.container}>
        <View style={[styles.safeTop, { height: insets.top }]} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#409eff" />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* <NewAppScreen templateFileName="App.tsx" safeAreaInsets={insets} /> */}

      {/* 顶部安全区域背景 */}
      <View style={[styles.safeTop, { height: insets.top }]} />

      {loggedIn ? <Home /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeTop: {
    backgroundColor: '#FEDE2B'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})

export default App
