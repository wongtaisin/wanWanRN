/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-04-14 15:58:05
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-04-14 18:03:21
 * @FilePath: \wanWanRN\src\services\expenses.ts
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import api from '.'

export interface ExpenseItem {
  id: string
  category: string
  amount: number
  date: string
  description?: string
  [key: string]: any
}

export interface ExpenseListResponse {
  code: number
  data: ExpenseItem[]
  message: string
}

/**
 * 获取支出详情列表
 */
export const getExpensesDetailList = async (params: any): Promise<ExpenseListResponse> => {
  const response = await api.post('/expensesDetail/list', { params })
  return response.data
}

export default {
  getExpensesDetailList
}
