"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  DollarSign,
} from "lucide-react";
import {
  useGetAccountsQuery,
  useDeleteAccountMutation,
} from "@/redux/services/account/account";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function AccountsPage() {
  console.log("AccountsPage: Component rendered");

  const [searchTerm, setSearchTerm] = useState("");
  const { data: accountsData, isLoading, error } = useGetAccountsQuery();
  const [deleteAccount] = useDeleteAccountMutation();

  console.log("AccountsPage: Query result", { accountsData, isLoading, error });

  const accounts = accountsData?.data || [];

  const filteredAccounts = accounts.filter(
    (account) =>
      account.actName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.actNo.includes(searchTerm) ||
      account.phoneNumber.includes(searchTerm)
  );

  const handleDeleteAccount = async (actNo: string) => {
    try {
      await deleteAccount(actNo).unwrap();
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );
  const activeAccounts = accounts.filter(
    (account) => account.isActive !== false
  ).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
          <p className="text-gray-600">Manage your account database</p>
        </div>
        <Link href="/dashboard/accounts?action=create">
          <Button>
            <Plus className="mr-2 w-4 h-4" />
            Add Account
          </Button>
        </Link>
      </div>

      {/* Debug Info */}
      <Card>
        <CardHeader>
          <CardTitle>Debug Information</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs">
            {JSON.stringify(
              { isLoading, error, accountsCount: accounts.length },
              null,
              2
            )}
          </pre>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Accounts
            </CardTitle>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeAccounts} active accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalBalance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Average Balance
            </CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {accounts.length > 0
                ? (totalBalance / accounts.length).toLocaleString()
                : "0"}
            </div>
            <p className="text-xs text-muted-foreground">Per account</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search accounts by name, number, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Accounts List */}
      <Card>
        <CardHeader>
          <CardTitle>All Accounts</CardTitle>
          <CardDescription>
            {isLoading
              ? "Loading accounts..."
              : `${filteredAccounts.length} accounts found`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center">Loading accounts...</div>
          ) : error ? (
            <div className="py-8 text-center text-red-600">
              Error loading accounts: {JSON.stringify(error)}
            </div>
          ) : filteredAccounts.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No accounts found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex justify-between items-center p-4 rounded-lg border hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex justify-center items-center w-10 h-10 bg-green-100 rounded-full">
                      <CreditCard className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{account.actName}</h3>
                      <p className="text-sm text-gray-600">
                        Account: {account.actNo}
                      </p>
                      <p className="text-sm text-gray-500">
                        Phone: {account.phoneNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <p className="font-medium">
                        ${account.balance.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {account.actCurrency}
                      </p>
                    </div>

                    <Badge
                      variant={
                        account.isActive === false ? "destructive" : "default"
                      }
                    >
                      {account.isActive === false ? "Inactive" : "Active"}
                    </Badge>
                    <Badge variant="outline">{account.accountType}</Badge>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 w-4 h-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 w-4 h-4" />
                          Edit Account
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteAccount(account.actNo)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 w-4 h-4" />
                          Delete Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
