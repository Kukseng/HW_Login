"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  CreditCard,
  Settings,
  LogOut,
  User,
  Activity,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function DashboardSidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="w-64 bg-gray-50 h-screen p-4 space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-600">Manage your banking</p>
        {user && (
          <div className="text-xs text-gray-500">
            Logged in as: {user.email}
          </div>
        )}
      </div>

      <nav className="space-y-2">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start">
            <Activity className="mr-2 h-4 w-4" />
            Overview
          </Button>
        </Link>

        <Link href="/dashboard/customers">
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Customers
          </Button>
        </Link>

        <Link href="/dashboard/accounts">
          <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="mr-2 h-4 w-4" />
            Accounts
          </Button>
        </Link>

        <Link href="/dashboard/analytics">
          <Button variant="ghost" className="w-full justify-start">
            <TrendingUp className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </Link>

        <Link href="/dashboard/transactions">
          <Button variant="ghost" className="w-full justify-start">
            <DollarSign className="mr-2 h-4 w-4" />
            Transactions
          </Button>
        </Link>
      </nav>

      <div className="pt-4 border-t">
        <Link href="/dashboard/profile">
          <Button variant="ghost" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </Link>

        <Link href="/dashboard/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>

        <Button
          variant="ghost"
          className="w-full justify-start text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
