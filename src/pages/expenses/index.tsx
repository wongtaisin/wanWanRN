/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-01-28 10:35:28
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-04-14 18:06:05
 * @FilePath: \wanWanRN\src\pages\expenses\index.tsx
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { useEffect, useState } from 'react'
import Header from '../../components/common/Header'
import { ExpenseListResponse, getExpensesDetailList } from '../../services/expenses'

const Expenses = () => {
  const [expensesData, setExpensesData] = useState<ExpenseListResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getExpensesDetailList({
          // "userId": 1,
          // "userName": "大帅",
          expensesName: [
            'eat'
            // "drink",
            // "play",
            // "glad",
            // "tolls",
            // "oil",
            // "parking",
            // "traffic",
            // "supermarket",
            // "online_shopping",
            // "phone_bill",
            // "red_packet",
            // "vip",
            // "other"
          ],
          startDate: '2025-11-01',
          endDate: '2026-04-30',
          page: 1,
          pageSize: 10
          // "sort": "ASC"
        })
        setExpensesData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取数据失败')
        console.error('获取支出列表失败:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchExpenses()
  }, [])

  return (
    <>
      <Header title="流水页" />
    </>
  )
}

export default Expenses
