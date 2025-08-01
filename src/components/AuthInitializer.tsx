"use client"

import { useEffect } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { initializeAuth } from '@/redux/features/auth/authSlice'

interface AuthInitializerProps {
  children: React.ReactNode
}

export default function AuthInitializer({ children }: AuthInitializerProps) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Initialize authentication state from stored tokens
    dispatch(initializeAuth())
  }, [dispatch])

  return <>{children}</>
} 