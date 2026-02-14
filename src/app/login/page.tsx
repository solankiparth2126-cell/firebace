"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, ShieldCheck, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false); setStep(2)
      toast({ title: "Verification required", description: "Code sent to your device." })
    }, 1000)
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({ title: "Access Granted" })
      router.push("/")
    }, 1000)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card border-primary/20 shadow-2xl overflow-hidden">
        <div className="bg-primary/5 p-8 flex flex-col items-center gap-2">
          <div className="h-12 w-12 rounded bg-primary text-white flex items-center justify-center"><Wallet /></div>
          <h2 className="text-xl font-bold">MoneyFlow Pro</h2>
        </div>
        <CardContent className="p-8">
          {step === 1 ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <Label>Email</Label><Input type="email" required />
              <Label>Password</Label><Input type="password" required />
              <Button type="submit" className="w-full" disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : "Secure Login"}</Button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4 text-center">
              <p className="text-sm mb-4">Enter 2FA Code</p>
              <div className="flex justify-center gap-2">
                {[1,2,3,4,5,6].map(i => <Input key={i} className="w-10 text-center" maxLength={1} />)}
              </div>
              <Button type="submit" className="w-full mt-4" disabled={loading}>Verify</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
