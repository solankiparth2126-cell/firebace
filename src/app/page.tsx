import { SummaryCards } from "@/components/dashboard/summary-cards"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MOCK_TRANSACTIONS } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { ReceiptText, TrendingUp, NotebookTabs } from "lucide-react"

export default function Dashboard() {
  const recentTransactions = MOCK_TRANSACTIONS.slice(0, 5)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, User</h1>
        <p className="text-muted-foreground">Here's your financial overview for March 2024.</p>
      </div>

      <SummaryCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ReceiptText className="h-5 w-5 text-primary" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.date}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{tx.category}</Badge>
                    </TableCell>
                    <TableCell className={`text-right font-bold ${tx.type === 'income' ? 'text-secondary' : 'text-foreground'}`}>
                      {tx.type === 'income' ? '+' : ''}₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              < NotebookTabs className="h-5 w-5 text-secondary" />
              Active Ledgers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Checking", balance: 4500.50, trend: "+12%" },
                { name: "Savings", balance: 12000.00, trend: "+2.5%" },
                { name: "Investments", balance: 8500.25, trend: "-4%" },
              ].map((ledger) => (
                <div key={ledger.name} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{ledger.name}</p>
                    <p className="text-xs text-muted-foreground">Main ledger account</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">₹{ledger.balance.toLocaleString('en-IN')}</p>
                    <p className={`text-xs ${ledger.trend.startsWith('+') ? 'text-secondary' : 'text-destructive'}`}>
                      {ledger.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-semibold">Spending is down!</p>
                <p className="text-xs text-muted-foreground">You spent 15% less on entertainment this week.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
