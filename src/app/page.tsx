
import { SummaryCards } from "@/components/dashboard/summary-cards"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MOCK_TRANSACTIONS, MOCK_LEDGERS } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { ReceiptText, TrendingUp, NotebookTabs } from "lucide-react"

export default function Dashboard() {
  const recentTransactions = MOCK_TRANSACTIONS.slice(0, 5)
  const topLedgers = MOCK_LEDGERS.slice(0, 4)

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
                    <TableCell className="font-medium text-xs">{tx.date}</TableCell>
                    <TableCell className="text-xs">{tx.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">{tx.category}</Badge>
                    </TableCell>
                    <TableCell className={`text-right font-bold text-xs ${tx.type === 'income' ? 'text-secondary' : 'text-foreground'}`}>
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
            <CardTitle className="flex items-center gap-2 text-lg">
              <NotebookTabs className="h-5 w-5 text-secondary" />
              Primary Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topLedgers.map((ledger) => (
                <div key={ledger.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{ledger.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{ledger.description}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${ledger.balance < 0 ? 'text-destructive' : ''}`}>
                      ₹{ledger.balance.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase">Active</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-semibold">Spending is optimized!</p>
                <p className="text-xs text-muted-foreground">Your savings rate is looking healthy this month.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
