"use client"
import React, { createContext, useContext, useState } from 'react'
import dayjs from 'dayjs'

type DateContextType = {
  date: string
  setDate: React.Dispatch<React.SetStateAction<string>>
}

const DateContext = createContext<DateContextType | undefined>(undefined)

export const useDateContext = () => {
  const context = useContext(DateContext)
  if (!context) {throw new Error('useDateContext must be used within a DateProvider')}
  return context
}

type DateProviderProps = {
  children: React.ReactNode
}

export const DateProvider = ({ children }: DateProviderProps) => {
  const today = dayjs().format('YYYY-MM-DD')
  const [date, setDate] = useState(today)
  const value = { date, setDate }

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>
}
