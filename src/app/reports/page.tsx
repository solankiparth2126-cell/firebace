"use client"

import { useState } from "react"
import { generateFinancialInsightReport, FinancialInsightReportOutput } from "@/ai/flows/financial-insight-report-flow"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BrainCircuit, Sparkles, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react"
import { MOCK_TRANSACTIONS } from "@/lib/mock-data"
import { Progress } from "@/components/ui/progress"

export default function AIReportsPage() {
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<FinancialInsightReportOutput | null>(null)

  const handleGenerateReport = async () => {
    setLoading(true)
    try {
      const result = await generateFinancialInsightReport({
        transactions: MOCK_TRANSACTIONS,
        reportingPeriod: "March 2024",
        currentBalance: 25000.75
      })
      setReport(result)
    } catch (error) {
      console.error("Failed to generate report", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Financial Insights</h1>
          <p className="text-muted-foreground">Personalized reports powered by MoneyFlow Intelligence.</p>
        </div>
        <Button 
          onClick={handleGenerateReport} 
          disabled={loading}
          className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-lg"
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {report ? "Regenerate Analysis" : "Generate AI Insights"}
        </Button>
      </div>

      {!report && !loading && (
        <Card className="glass-card border-dashed p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <BrainCircuit className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Unlock Deep Insights</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our AI analyzes your spending habits, detects anomalies, and provides actionable recommendations to improve your financial health.
            </p>
            <Button variant="outline" onClick={handleGenerateReport} className="mt-4">
              Get Started with AI Analysis
            </Button>
          </div>
        </Card>
      )}

      {loading && (
        <div className="space-y-6">
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <BrainCircuit className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Analyzing your transactions...</h2>
              <p className="text-muted-foreground mb-6">MoneyFlow AI is crunching the numbers to provide your report.</p>
              <Progress value={45} className="max-w-md mx-auto" />
            </CardContent>
          </Card>
        </div>
      )}

      {report && !loading && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="glass-card md:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary font-bold">
                <CheckCircle2 className="h-5 w-5" />
                Overall Financial Health
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{report.overallFinancialHealth}</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-secondary" />
                Spending Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{report.spendingAnalysis}</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Anomalies Detected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {report.anomaliesDetected.map((anomaly, idx) => (
                  <li key={idx} className="flex gap-3 text-sm">
                    <span className="h-5 w-5 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                      !
                    </span>
                    {anomaly}
                  </li>
                ))}
                {report.anomaliesDetected.length === 0 && (
                  <p className="text-muted-foreground italic">No anomalies detected this period. Great job!</p>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                Saving Recommendations
              </CardTitle>
              <CardDescription>Personalized tips to optimize your budget</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {report.savingRecommendations.map((rec, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                    <p className="text-sm font-medium">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}