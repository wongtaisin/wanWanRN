/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-04-14 15:51:08
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-04-14 17:56:03
 * @FilePath: \wanWanRN\src\services\index.ts
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { NativeModules, Platform } from 'react-native'
import { eventEmitter } from '../utils/eventEmitter'

const API_PORT = 3001
const API_PATH = '/api'
const PRODUCTION_API_BASE_URL = `http://8.155.51.40:${API_PORT}${API_PATH}`

const extractHostFromScriptURL = (scriptURL?: string): string | null => {
  if (!scriptURL) {
    return null
  }

  const match = scriptURL.match(/^https?:\/\/([^/:]+)/i)
  return match?.[1] ?? null
}

const getDevHost = (): string | null => {
  const sourceCode = NativeModules.SourceCode as
    | {
        scriptURL?: string
        getConstants?: () => { scriptURL?: string }
      }
    | undefined

  return extractHostFromScriptURL(sourceCode?.scriptURL ?? sourceCode?.getConstants?.().scriptURL)
}

export const getApiBaseURL = (): string => {
  if (!__DEV__) {
    return PRODUCTION_API_BASE_URL
  }

  const devHost = getDevHost()
  if (devHost) {
    return `http://${devHost}:${API_PORT}${API_PATH}`
  }

  if (Platform.OS === 'android') {
    return `http://192.168.93.128:${API_PORT}${API_PATH}`
  }

  return `http://127.0.0.1:${API_PORT}${API_PATH}`
}

const api: AxiosInstance = axios.create({
  baseURL: getApiBaseURL(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401) {
      eventEmitter.emit('UNAUTHORIZED')
    }

    return Promise.reject(error)
  }
)

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>
    const responseMessage = axiosError.response?.data?.message

    if (typeof responseMessage === 'string' && responseMessage.trim()) {
      return responseMessage
    }

    if (axiosError.code === 'ECONNABORTED') {
      return '请求超时，请确认接口服务可用：' + api.defaults.baseURL
    }

    if (axiosError.message === 'Network Error') {
      return '无法连接到接口服务：' + api.defaults.baseURL
    }

    if (axiosError.message) {
      return axiosError.message
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return '请求失败，请稍后重试'
}

export default api
export type { AxiosRequestConfig, AxiosResponse }
