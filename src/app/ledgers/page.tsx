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
      toast({ variant: "destructive", title: "Required Fields Missing" })
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
    toast({ title: "Ledger Created", description: `${formData.name} is now active.` })
  }

  const handleEditLedger = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingLedger || !formData.name) return
    const updated = ledgers.map(l => 
      l.id === editingLedger.id ? { ...l, ...formData, balance: parseFloat(formData.balance) } : l
    )
    setLedgers(updated as Ledger[])
    setIsEditOpen(false)
    resetForm()
    toast({ title: "Ledger Updated" })
  }

  const handleDeleteLedger = (id: string) => {
    setLedgers(ledgers.filter(l => l.id !== id))
    toast({ title: "Ledger Removed" })
  }

  const openEdit = (l: Ledger) => {
    setEditingLedger(l)
    setFormData({ name: l.name, description: l.description || "", balance: l.balance.toString(), icon: l.icon })
    setIsEditOpen(true)
  }

  const resetForm = () => setFormData({ name: "", description: "", balance: "", icon: "Wallet" })

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts & Ledgers</h1>
          <p className="text-muted-foreground">Manage your banking and credit accounts in ₹.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild><Button className="gap-2 bg-secondary text-white"><Plus className="h-4 w-4" /> New Ledger</Button></DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateLedger}>
              <DialogHeader><DialogTitle>Create Ledger</DialogTitle></DialogHeader>
              <div className="grid gap-4 py-4">
                <Input placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <Input type="number" placeholder="Balance (₹)" value={formData.balance} onChange={e => setFormData({...formData, balance: e.target.value})} />
                <Select value={formData.icon} onValueChange={v => setFormData({...formData, icon: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wallet">Bank</SelectItem>
                    <SelectItem value="CreditCard">Credit Card</SelectItem>
                    <SelectItem value="Banknote">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter><Button type="submit">Create</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ledgers.map((l) => {
          const IconComp = iconMap[l.icon] || Wallet
          return (
            <Card key={l.id} className="glass-card group relative">
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => openEdit(l)}><Pencil className="h-4 w-4 mr-2" /> Rename</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteLedger(l.id)} className="text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2"><IconComp className="h-5 w-5" /></div>
                <CardTitle>{l.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-xl font-bold ${l.balance < 0 ? 'text-destructive' : ''}`}>₹{l.balance.toLocaleString('en-IN')}</div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-4 py-2">
                <Button variant="link" asChild className="p-0 h-auto text-primary text-xs"><Link href={`/ledgers/${l.id}`}>View Details <ArrowRight className="h-3 w-3 ml-1" /></Link></Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
