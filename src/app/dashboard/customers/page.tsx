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
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import {
  useGetCustomersQuery,
  useDeleteCustomerMutation,
  useDisableCustomerMutation,
} from "@/redux/services/customer/customer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function CustomersPage() {
  console.log("CustomersPage: Component rendered");

  const [searchTerm, setSearchTerm] = useState("");
  const { data: customersData, isLoading, error } = useGetCustomersQuery();
  const [deleteCustomer] = useDeleteCustomerMutation();
  const [disableCustomer] = useDisableCustomerMutation();

  console.log("CustomersPage: Query result", {
    customersData,
    isLoading,
    error,
  });

  const customers = customersData?.data || [];

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phoneNumber.includes(searchTerm)
  );

  const handleDeleteCustomer = async (phoneNumber: string) => {
    try {
      await deleteCustomer(phoneNumber).unwrap();
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  const handleDisableCustomer = async (phoneNumber: string) => {
    try {
      await disableCustomer(phoneNumber).unwrap();
    } catch (error) {
      console.error("Failed to disable customer:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer database</p>
        </div>
        <Link href="/dashboard/customers?action=create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
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
              { isLoading, error, customersCount: customers.length },
              null,
              2
            )}
          </pre>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Customers List */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            {isLoading
              ? "Loading customers..."
              : `${filteredCustomers.length} customers found`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading customers...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              Error loading customers: {JSON.stringify(error)}
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No customers found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{customer.fullName}</h3>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                      <p className="text-sm text-gray-500">
                        {customer.phoneNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        customer.isActive === false ? "destructive" : "default"
                      }
                    >
                      {customer.isActive === false ? "Inactive" : "Active"}
                    </Badge>
                    <Badge variant="outline">{customer.customerSegment}</Badge>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Customer
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleDisableCustomer(customer.phoneNumber)
                          }
                          className="text-orange-600"
                        >
                          {customer.isActive === false ? "Activate" : "Disable"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleDeleteCustomer(customer.phoneNumber)
                          }
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Customer
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
