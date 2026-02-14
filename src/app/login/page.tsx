
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
  const [step, setStep] = useState(1) // 1: Login, 2: 2FA
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(2)
      toast({
        title: "Credentials verified",
        description: "Please enter the 6-digit code sent to your phone.",
      })
    }, 1200)
  }

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Login Successful",
        description: "Welcome back to MoneyFlow Pro.",
      })
      router.push("/")
    }, 1200)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card border-primary/20 shadow-2xl overflow-hidden">
        <div className="bg-primary/10 p-8 flex flex-col items-center gap-4 text-center">
          <div className="h-16 w-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
            <Wallet className="h-10 w-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">MoneyFlow Pro</h2>
            <p className="text-sm text-muted-foreground">Secure your financial future</p>
          </div>
        </div>

        <CardContent className="p-8">
          {step === 1 ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="p-0 h-auto text-xs">Forgot password?</Button>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                Sign In Securely
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerify2FA} className="space-y-4">
              <div className="text-center space-y-2 mb-6">
                <CardTitle className="text-lg">Two-Step Verification</CardTitle>
                <CardDescription>Enter the verification code to continue</CardDescription>
              </div>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Input 
                    key={i} 
                    className="w-10 h-12 text-center text-lg font-bold" 
                    maxLength={1} 
                    pattern="\d*"
                  />
                ))}
              </div>
              <Button type="submit" className="w-full gap-2 mt-4" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify and Login"}
              </Button>
              <Button variant="ghost" className="w-full text-xs" onClick={() => setStep(1)}>
                Use a different method
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="bg-muted/30 px-8 py-4 flex justify-between items-center text-[10px] text-muted-foreground border-t">
          <span>Protected by AES-256 Encryption</span>
          <div className="flex gap-2">
            <span className="hover:text-primary cursor-pointer">Help</span>
            <span className="hover:text-primary cursor-pointer">Privacy</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
