
"use client"

import { use } from "react"
import { MOCK_LEDGERS, MOCK_TRANSACTIONS } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Wallet, ReceiptText, TrendingUp, PiggyBank, CreditCard, Banknote } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const iconMap: Record<string, any> = {
  Wallet,
  PiggyBank,
  TrendingUp,
  CreditCard,
  Banknote
}

export default function LedgerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const ledger = MOCK_LEDGERS.find(l => l.id === id)
  
  if (!ledger) {
    return notFound()
  }

  const ledgerTransactions = MOCK_TRANSACTIONS.filter(t => t.ledgerId === id)
  const IconComp = iconMap[ledger.icon] || Wallet

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/ledgers">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{ledger.name}</h1>
          <p className="text-muted-foreground">{ledger.description}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card md:col-span-1">
          <CardHeader className="pb-2">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <IconComp className="h-6 w-6" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${ledger.balance < 0 ? 'text-destructive' : ''}`}>
              ₹{ledger.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-secondary mt-1 font-medium">
              {ledger.balance < 0 ? 'Outstanding Dues' : 'Available Balance'}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ReceiptText className="h-5 w-5 text-primary" />
              Transactions for this Ledger
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ledgerTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-xs">{tx.date}</TableCell>
                    <TableCell className="font-medium">
                      {tx.description}
                      <div className="md:hidden">
                        <Badge variant="outline" className="text-[10px] scale-75 origin-left">{tx.category}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className={`text-right font-bold ${tx.type === 'income' ? 'text-secondary' : 'text-foreground'}`}>
                      {tx.type === 'income' ? '+' : ''}₹{tx.amount.toLocaleString('en-IN')}
                    </TableCell>
                  </TableRow>
                ))}
                {ledgerTransactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                      No transactions found for this ledger.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
