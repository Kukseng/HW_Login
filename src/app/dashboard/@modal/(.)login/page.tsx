"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import LoginFormComponent from "@/components/AuthComponents/LoginFormComponent"
import { useRouter } from "next/navigation"

export default function LoginModal() {
  const router = useRouter()

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <LoginFormComponent />
      </DialogContent>
    </Dialog>
  )
} 