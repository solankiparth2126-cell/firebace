
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MOCK_LEDGERS } from "@/lib/mock-data"
import { Wallet, PiggyBank, TrendingUp, Plus, MoreVertical, ArrowRight, CreditCard, Banknote, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Ledger } from "@/lib/types"

const iconMap: Record<string, any> = {
  Wallet,
  PiggyBank,
  TrendingUp,
  CreditCard,
  Banknote
}

export default function LedgersPage() {
  const [ledgers, setLedgers] = useState<Ledger[]>(MOCK_LEDGERS)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingLedger, setEditingLedger] = useState<Ledger | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    balance: "",
    icon: "Wallet"
  })

  const handleCreateLedger = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.balance) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      })
      return
    }

    const newLedger: Ledger = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      description: formData.description,
      balance: parseFloat(formData.balance),
      icon: formData.icon
    }

    setLedgers([...ledgers, newLedger])
    setIsAddOpen(false)
    resetForm()
    toast({
      title: "Success",
      description: `${formData.name} ledger has been created.`,
    })
  }

  const handleEditLedger = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingLedger || !formData.name) return

    const updatedLedgers = ledgers.map(l => 
      l.id === editingLedger.id 
        ? { ...l, name: formData.name, description: formData.description, icon: formData.icon, balance: parseFloat(formData.balance) }
        : l
    )

    setLedgers(updatedLedgers)
    setIsEditOpen(false)
    setEditingLedger(null)
    resetForm()
    toast({
      title: "Ledger Updated",
      description: "Changes have been saved successfully.",
    })
  }

  const handleDeleteLedger = (id: string) => {
    const ledgerToDelete = ledgers.find(l => l.id === id)
    setLedgers(ledgers.filter(l => l.id !== id))
    toast({
      title: "Ledger Removed",
      description: `${ledgerToDelete?.name} has been deleted.`,
    })
  }

  const openEditDialog = (ledger: Ledger) => {
    setEditingLedger(ledger)
    setFormData({
      name: ledger.name,
      description: ledger.description || "",
      balance: ledger.balance.toString(),
      icon: ledger.icon
    })
    setIsEditOpen(true)
  }

  const resetForm = () => {
    setFormData({ name: "", description: "", balance: "", icon: "Wallet" })
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Ledgers</h1>
          <p className="text-muted-foreground">Manage your bank accounts, cash, and credit cards in ₹.</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-secondary hover:bg-secondary/90 text-white">
              <Plus className="h-4 w-4" />
              Create New Ledger
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateLedger}>
              <DialogHeader>
                <DialogTitle>Create New Ledger</DialogTitle>
                <DialogDescription>
                  Add a new account or fund to track your transactions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Ledger Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g., HDFC Savings, Amex Card" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="balance">Initial Balance (₹)</Label>
                  <Input 
                    id="balance" 
                    type="number" 
                    placeholder="0.00" 
                    value={formData.balance}
                    onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={formData.icon} onValueChange={(val) => setFormData({ ...formData, icon: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wallet">Wallet (Bank)</SelectItem>
                      <SelectItem value="PiggyBank">Savings</SelectItem>
                      <SelectItem value="TrendingUp">Investments</SelectItem>
                      <SelectItem value="CreditCard">Credit Card</SelectItem>
                      <SelectItem value="Banknote">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="desc">Description (Optional)</Label>
                  <Textarea 
                    id="desc" 
                    placeholder="What is this ledger for?" 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full sm:w-auto">Create Ledger</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ledgers.map((ledger) => {
          const IconComp = iconMap[ledger.icon] || Wallet
          const isNegative = ledger.balance < 0

          return (
            <Card key={ledger.id} className="glass-card group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditDialog(ledger)} className="gap-2">
                      <Pencil className="h-4 w-4" /> Rename / Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteLedger(ledger.id)} className="gap-2 text-destructive">
                      <Trash2 className="h-4 w-4" /> Remove Ledger
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardHeader className="pb-2">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                  ledger.icon === 'CreditCard' ? 'bg-destructive/10 text-destructive' : 
                  ledger.icon === 'PiggyBank' ? 'bg-secondary/10 text-secondary' : 
                  'bg-primary/10 text-primary'
                }`}>
                  <IconComp className="h-6 w-6" />
                </div>
                <CardTitle className="pr-8 text-lg">{ledger.name}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-1">{ledger.description}</p>
              </CardHeader>
              <CardContent className="pt-4">
                <div className={`text-2xl font-bold mb-1 ${isNegative ? 'text-destructive' : ''}`}>
                  ₹{ledger.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                  {isNegative ? 'Outstanding' : 'Available'}
                </Badge>
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

      <Dialog open={isEditOpen} onOpenChange={(open) => { setIsEditOpen(open); if (!open) setEditingLedger(null); }}>
        <DialogContent>
          <form onSubmit={handleEditLedger}>
            <DialogHeader>
              <DialogTitle>Edit Ledger</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Ledger Name</Label>
                <Input 
                  id="edit-name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-balance">Current Balance (₹)</Label>
                <Input 
                  id="edit-balance" 
                  type="number" 
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-icon">Icon</Label>
                <Select value={formData.icon} onValueChange={(val) => setFormData({ ...formData, icon: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wallet">Wallet (Bank)</SelectItem>
                    <SelectItem value="PiggyBank">Savings</SelectItem>
                    <SelectItem value="TrendingUp">Investments</SelectItem>
                    <SelectItem value="CreditCard">Credit Card</SelectItem>
                    <SelectItem value="Banknote">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-desc">Description</Label>
                <Textarea 
                  id="edit-desc" 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
