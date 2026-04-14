/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-04-14 16:06:14
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-04-14 18:02:00
 * @FilePath: \wanWanRN\src\services\auth.ts
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import api from '.'
import { getTokenStorage } from '../utils/tokenStorage'

export interface LoginRequest {
  user_name: string
  password: string
}

export interface LoginResponse {
  code: number
  data?: {
    token?: string
    user?: {
      id: string
      username: string
      [key: string]: any
    }
    [key: string]: any
  }
  token?: string
  message: string
}

let authToken: string | null = null

export const initTokenFromStorage = async (): Promise<void> => {
  try {
    const storage = getTokenStorage()
    const token = await storage.getToken()
    if (token) {
      await setToken(token)
    }
  } catch (error) {
    console.error('初始化 token 失败:', error)
  }
}

export const signIn = async (params: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>('/login/signIn', params)
  const token = res.data?.data?.token ?? res.data?.token

  if (token) {
    await setToken(token)
  }

  return res.data
}

export const setToken = async (token: string): Promise<void> => {
  authToken = token
  api.defaults.headers.common.Authorization = `Bearer ${token}`

  const storage = getTokenStorage()
  try {
    await storage.setToken(token)
  } catch (error) {
    console.error('保存 token 失败:', error)
  }
}

export const getToken = (): string | null => {
  return authToken
}

export const clearToken = async (): Promise<void> => {
  authToken = null
  delete api.defaults.headers.common.Authorization

  const storage = getTokenStorage()
  try {
    await storage.removeToken()
  } catch (error) {
    console.error('清除 token 失败:', error)
  }
}

export const isLoggedIn = (): boolean => {
  return authToken !== null
}

export default {
  signIn,
  setToken,
  getToken,
  clearToken,
  isLoggedIn,
  initTokenFromStorage
}
