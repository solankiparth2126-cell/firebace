"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileUp, Sparkles, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { parseBankStatement, ParseStatementOutput } from "@/ai/flows/parse-statement-flow"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function ImportPage() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ParseStatementOutput | null>(null)
  const { toast } = useToast()

  const handleProcess = async () => {
    if (!text.trim()) {
      toast({
        variant: "destructive",
        title: "Empty Content",
        description: "Please paste your statement text first."
      })
      return
    }

    setLoading(true)
    try {
      const output = await parseBankStatement({ statementText: text })
      setResult(output)
      toast({
        title: "Analysis Complete",
        description: `Successfully parsed ${output.transactions.length} transactions.`
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Processing Failed",
        description: "An error occurred while analyzing the statement."
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAll = () => {
    toast({
      title: "Success",
      description: "Transactions have been imported to your records."
    })
    setResult(null)
    setText("")
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statement Import</h1>
        <p className="text-muted-foreground">Upload or paste your bank statement to automatically categorize entries.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileUp className="h-5 w-5 text-primary" />
              Raw Statement Text
            </CardTitle>
            <CardDescription>
              Paste the text from your bank CSV or PDF statement here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="01-Mar-2024, ZOMATO PAY, -450.00..." 
              className="min-h-[300px] font-mono text-xs"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button 
              className="w-full gap-2 bg-gradient-to-r from-primary to-secondary text-white" 
              onClick={handleProcess}
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              AI Categorize Entries
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
              AI Analysis Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!result && !loading && (
              <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                <AlertCircle className="h-10 w-10 mb-2 opacity-20" />
                <p>Paste statement text and click "Categorize" to see results.</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="font-medium">AI is reading your statement...</p>
                <p className="text-sm text-muted-foreground">This usually takes a few seconds.</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                  <p className="text-sm font-medium text-secondary-foreground">{result.summary}</p>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
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
                      {result.transactions.map((tx, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="text-xs">{tx.date}</TableCell>
                          <TableCell className="font-medium text-xs">{tx.description}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[10px]">{tx.category}</Badge>
                          </TableCell>
                          <TableCell className={`text-right font-bold text-xs ${tx.type === 'income' ? 'text-secondary' : 'text-foreground'}`}>
                            {tx.type === 'income' ? '+' : ''}₹{tx.amount.toLocaleString('en-IN')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={() => setResult(null)}>
                    Clear Result
                  </Button>
                  <Button className="flex-1 bg-secondary text-white hover:bg-secondary/90" onClick={handleSaveAll}>
                    Import to Transactions
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
