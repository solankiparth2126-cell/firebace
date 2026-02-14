"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, ShieldCheck, Loader2, UserCircle, ShieldAlert } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const demoUsers = [
    { id: 'admin', name: 'Master Admin', role: 'admin', email: 'admin@moneyflow.pro' },
    { id: 'user1', name: 'User One', role: 'user', email: 'user1@gmail.com' },
    { id: 'user2', name: 'User Two', role: 'user', email: 'user2@gmail.com' },
    { id: 'user3', name: 'User Three', role: 'user', email: 'user3@gmail.com' },
  ]

  const handleSelectUser = (user: any) => {
    setSelectedUser(user.name)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(2)
      toast({ title: `Hello, ${user.name}`, description: "2FA code sent to your registered device." })
    }, 800)
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({ title: "Access Granted", description: "Secure session initialized." })
      router.push("/")
    }, 1000)
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-xl glass-card border-primary/20 shadow-2xl overflow-hidden">
        <div className="bg-primary p-10 flex flex-col items-center gap-3 text-white">
          <div className="h-14 w-14 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
            <Wallet className="h-8 w-8" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">MoneyFlow Pro</h2>
            <p className="text-primary-foreground/70 text-sm">Enterprise Multi-User Financial Suite</p>
          </div>
        </div>
        
        <CardContent className="p-8">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Select Account to Sign In</h3>
                <p className="text-sm text-muted-foreground">Select one of the pre-configured roles for this prototype.</p>
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2">
                {demoUsers.map((user) => (
                  <Button 
                    key={user.id} 
                    variant="outline" 
                    className={`h-auto py-4 flex flex-col items-start gap-1 transition-all hover:border-primary group ${user.role === 'admin' ? 'border-orange-200 bg-orange-50/30' : ''}`}
                    onClick={() => handleSelectUser(user)}
                    disabled={loading}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {user.role === 'admin' ? <ShieldAlert className="h-4 w-4 text-orange-600" /> : <UserCircle className="h-4 w-4 text-primary" />}
                      <span className="font-bold">{user.name}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{user.role} account</span>
                  </Button>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or standard login</span></div>
              </div>

              <form className="space-y-4 opacity-50 pointer-events-none">
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input placeholder="name@company.com" disabled />
                </div>
                <div className="space-y-1">
                  <Label>Password</Label>
                  <Input type="password" disabled />
                </div>
                <Button className="w-full" disabled>Sign In</Button>
              </form>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6 text-center animate-in zoom-in duration-300">
              <div className="space-y-2">
                <ShieldCheck className="h-12 w-12 text-secondary mx-auto mb-2" />
                <h3 className="text-xl font-bold">Two-Step Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Verification code sent to the device linked to <strong>{selectedUser}</strong>.
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Input key={i} className="w-12 h-14 text-center text-xl font-bold focus:ring-secondary" maxLength={1} required />
                ))}
              </div>

              <div className="space-y-3">
                <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white py-6" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Verify Identity"}
                </Button>
                <Button variant="ghost" className="w-full text-xs" onClick={() => setStep(1)}>
                  Cancel and switch account
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}