"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import RegisterFormComponent from "@/components/AuthComponents/RegisterFormComponent"
import { useRouter } from "next/navigation"

export default function SignupModal() {
  const router = useRouter()

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
        </DialogHeader>
        <RegisterFormComponent />
      </DialogContent>
    </Dialog>
  )
} 