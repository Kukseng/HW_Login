"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CreditCard,
  TrendingUp,
  DollarSign,
  Plus,
  Search,
} from "lucide-react";
import { useGetCustomersQuery } from "@/redux/services/customer/customer";
import { useGetAccountsQuery } from "@/redux/services/account/account";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const {
    data: customersData,
    isLoading: customersLoading,
    error: customersError,
  } = useGetCustomersQuery();
  const {
    data: accountsData,
    isLoading: accountsLoading,
    error: accountsError,
  } = useGetAccountsQuery();

  const customers = customersData?.data || [];
  const accounts = accountsData?.data || [];

  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );
  const activeCustomers = customers.filter(
    (customer) => customer.isActive !== false
  ).length;
  const activeAccounts = accounts.filter(
    (account) => account.isActive !== false
  ).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your banking dashboard</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/customers">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </Link>
          <Link href="/dashboard/accounts">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customersLoading ? "Loading..." : customers.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {activeCustomers} active customers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Accounts
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {accountsLoading ? "Loading..." : accounts.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {activeAccounts} active accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${accountsLoading ? "Loading..." : totalBalance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">From last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Customers</CardTitle>
            <CardDescription>Latest customer registrations</CardDescription>
          </CardHeader>
          <CardContent>
            {customersLoading ? (
              <div className="text-center py-4">Loading customers...</div>
            ) : customersError ? (
              <div className="text-center py-4 text-red-600">
                Error loading customers
              </div>
            ) : customers.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No customers found
              </div>
            ) : (
              <div className="space-y-4">
                {customers.slice(0, 5).map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{customer.fullName}</p>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          customer.isActive === false
                            ? "destructive"
                            : "default"
                        }
                      >
                        {customer.isActive === false ? "Inactive" : "Active"}
                      </Badge>
                      <Badge variant="outline">
                        {customer.customerSegment}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Accounts</CardTitle>
            <CardDescription>Latest account creations</CardDescription>
          </CardHeader>
          <CardContent>
            {accountsLoading ? (
              <div className="text-center py-4">Loading accounts...</div>
            ) : accountsError ? (
              <div className="text-center py-4 text-red-600">
                Error loading accounts
              </div>
            ) : accounts.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No accounts found
              </div>
            ) : (
              <div className="space-y-4">
                {accounts.slice(0, 5).map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{account.actName}</p>
                      <p className="text-sm text-gray-600">{account.actNo}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          account.isActive === false ? "destructive" : "default"
                        }
                      >
                        {account.isActive === false ? "Inactive" : "Active"}
                      </Badge>
                      <Badge variant="outline">{account.accountType}</Badge>
                      <p className="font-medium">
                        ${account.balance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dashboard/customers">
              <Button variant="outline" className="w-full h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                <span>Manage Customers</span>
              </Button>
            </Link>

            <Link href="/dashboard/accounts">
              <Button variant="outline" className="w-full h-20 flex-col">
                <CreditCard className="h-6 w-6 mb-2" />
                <span>Manage Accounts</span>
              </Button>
            </Link>

            <Link href="/dashboard/analytics">
              <Button variant="outline" className="w-full h-20 flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span>Analytics</span>
              </Button>
            </Link>

            <Link href="/dashboard/transactions">
              <Button variant="outline" className="w-full h-20 flex-col">
                <DollarSign className="h-6 w-6 mb-2" />
                <span>Transactions</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
