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
      toast({ variant: "destructive", title: "Empty Content", description: "Paste statement text first." })
      return
    }
    setLoading(true)
    try {
      const output = await parseBankStatement({ statementText: text })
      setResult(output)
      toast({ title: "Analysis Complete", description: `Parsed ${output.transactions.length} entries.` })
    } catch (e) {
      toast({ variant: "destructive", title: "AI Error", description: "Could not parse text." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Statement Import</h1>
        <p className="text-muted-foreground">Paste raw text from bank PDFs/CSVs to automatically categorize entries in ₹.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileUp className="h-5 w-5 text-primary" /> Input Area</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea placeholder="Paste bank statement text here..." className="min-h-[300px] text-xs font-mono" value={text} onChange={e => setText(e.target.value)} />
            <Button className="w-full gap-2 bg-primary text-white" onClick={handleProcess} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Extract & Categorize
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 glass-card">
          <CardHeader><CardTitle>AI Results</CardTitle></CardHeader>
          <CardContent>
            {!result && !loading && <div className="py-20 text-center opacity-40"><AlertCircle className="mx-auto h-8 w-8 mb-2" /><p>Waiting for analysis...</p></div>}
            {loading && <div className="py-20 text-center"><Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-2" /><p>AI is reading...</p></div>}
            {result && (
              <div className="space-y-4">
                <div className="p-3 bg-secondary/10 rounded border border-secondary/20 text-sm italic">{result.summary}</div>
                <div className="border rounded overflow-hidden">
                  <Table>
                    <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Desc</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {result.transactions.map((tx, i) => (
                        <TableRow key={i}>
                          <TableCell className="text-[10px]">{tx.date}</TableCell>
                          <TableCell className="text-[10px] font-medium">{tx.description} <Badge variant="outline" className="scale-75">{tx.category}</Badge></TableCell>
                          <TableCell className={`text-right text-[10px] font-bold ${tx.type === 'income' ? 'text-secondary' : ''}`}>₹{tx.amount.toLocaleString('en-IN')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Button className="w-full bg-secondary text-white" onClick={() => { toast({ title: "Imported" }); setResult(null); setText(""); }}>Import to Ledgers</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
