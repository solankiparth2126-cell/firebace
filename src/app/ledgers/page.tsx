"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MOCK_LEDGERS } from "@/lib/mock-data"
import { Wallet, PiggyBank, TrendingUp, Plus, MoreVertical, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const iconMap: Record<string, any> = {
  Wallet,
  PiggyBank,
  TrendingUp
}

export default function LedgersPage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Ledgers</h1>
          <p className="text-muted-foreground">Manage your different accounts and financial pots.</p>
        </div>
        <Button className="gap-2 bg-secondary hover:bg-secondary/90 text-white">
          <Plus className="h-4 w-4" />
          Create New Ledger
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_LEDGERS.map((ledger) => {
          const IconComp = iconMap[ledger.icon] || Wallet
          return (
            <Card key={ledger.id} className="glass-card group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <CardHeader className="pb-2">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                  ledger.id === '1' ? 'bg-primary/10 text-primary' : 
                  ledger.id === '2' ? 'bg-secondary/10 text-secondary' : 
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  <IconComp className="h-6 w-6" />
                </div>
                <CardTitle>{ledger.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{ledger.description}</p>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-3xl font-bold mb-1">₹{ledger.balance.toLocaleString('en-IN')}</div>
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Active Account</Badge>
              </CardContent>
              <CardFooter className="pt-0 border-t bg-muted/50 mt-4 px-6 py-4">
                <Button variant="link" asChild className="p-0 h-auto text-primary gap-1 group-hover:translate-x-1 transition-transform cursor-pointer">
                  <Link href={`/ledgers/${ledger.id}`}>
                    View Transactions <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
