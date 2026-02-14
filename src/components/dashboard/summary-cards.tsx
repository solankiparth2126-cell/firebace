import { Card, CardContent } from "@/components/ui/card"
import { Wallet, ArrowUpCircle, ArrowDownCircle, Percent } from "lucide-react"

export function SummaryCards() {
  const stats = [
    {
      title: "Total Balance",
      value: "₹2,50,000.75",
      description: "+2.5% from last month",
      icon: Wallet,
      color: "text-primary"
    },
    {
      title: "Monthly Income",
      value: "₹54,500.00",
      description: "2 sources active",
      icon: ArrowUpCircle,
      color: "text-secondary"
    },
    {
      title: "Monthly Expenses",
      value: "₹18,322.34",
      description: "45% of income",
      icon: ArrowDownCircle,
      color: "text-destructive"
    },
    {
      title: "Savings Rate",
      value: "66.4%",
      description: "Goal: 70%",
      icon: Percent,
      color: "text-blue-500"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
