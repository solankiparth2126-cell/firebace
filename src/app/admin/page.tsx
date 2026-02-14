"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users, ShieldAlert, Activity, Banknote, CreditCard, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const users = [
    { id: '1', name: 'User One', email: 'user1@gmail.com', status: 'Active', accounts: 2, lastLogin: '2 mins ago', role: 'Standard' },
    { id: '2', name: 'User Two', email: 'user2@gmail.com', status: 'Active', accounts: 4, lastLogin: '1 hour ago', role: 'Standard' },
    { id: '3', name: 'User Three', email: 'user3@gmail.com', status: 'Inactive', accounts: 1, lastLogin: '3 days ago', role: 'Standard' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Master Admin Control</h1>
        <p className="text-muted-foreground">System-wide overview and user management.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-1">1 Admin, 3 Users</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Real-time connectivity</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Ledgers</CardTitle>
            <Banknote className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Across all accounts</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Security Audits</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">Critical issues pending</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Monitor activity and manage permissions for all standard users.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ledgers</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold">{user.name}</span>
                      <span className="text-[10px] text-muted-foreground">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'secondary' : 'outline'} className="rounded-sm">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.accounts}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Manage <ChevronRight className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}