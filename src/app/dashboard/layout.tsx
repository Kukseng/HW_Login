import { ReactNode } from "react"
import AuthGuard from "@/components/AuthGuard"

interface DashboardLayoutProps {
  children: ReactNode
  sidebar: ReactNode
  modal: ReactNode
}

export default function DashboardLayout({ children, sidebar, modal }: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <div className="flex h-screen">
        {sidebar}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        {modal}
      </div>
    </AuthGuard>
  )
} 