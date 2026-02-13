import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Stethoscope,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  ShieldAlert,
} from "lucide-react";
import FileUpload from "./components/FileUpload";
import SpecialistCard from "./components/SpecialistCard";
import LoadingAnalysis from "./components/LoadingAnalysis";

const API_URL = "https://medi-analyser.onrender.com";

export default function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [rateLimited, setRateLimited] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${API_URL}/analyze`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResults(response.data);
    } catch (err) {
      if (err.response?.status === 429) {
        setRateLimited(true);
        setError(null);
      } else {
        setError(
          err.response?.data?.detail ||
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResults(null);
    setError(null);
    setRateLimited(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* ── Background Effects ──────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-primary/3 blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full bg-purple-500/3 blur-[80px] md:blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[150px] md:w-[300px] h-[150px] md:h-[300px] rounded-full bg-teal-500/2 blur-[60px] md:blur-[100px]" />
      </div>

      {/* ── Header ─────────────────────────────────────── */}
      <header className="relative z-10 border-b border-border/40 backdrop-blur-md bg-background/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
              <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                Medi Analyser
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground hidden xs:block">
                AI-Powered Medical Report Analysis
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-[10px] sm:text-xs bg-primary/5 text-primary border-primary/20 hidden sm:inline-flex">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by Gemini AI
          </Badge>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────── */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {!results ? (
          /* ── Upload Section ─────────────────────────── */
          <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
            {/* Hero */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Activity className="w-3 h-3" />
                Multi-Specialist AI Analysis
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Get Expert Medical
                <span className="block bg-gradient-to-r from-primary via-teal-300 to-purple-400 bg-clip-text text-transparent">
                  Insights in Seconds
                </span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto text-xs sm:text-sm leading-relaxed px-2 sm:px-0">
                Upload your medical report and receive comprehensive analysis
                from our AI-powered Cardiologist, Psychologist, and
                Pulmonologist — plus a unified team diagnosis.
              </p>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: ShieldCheck, label: "Private & Secure" },
                { icon: Zap, label: "Instant Analysis" },
                { icon: Sparkles, label: "3 Specialists" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 text-xs text-muted-foreground"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </div>
              ))}
            </div>

            {/* Upload Card */}
            <Card className="glass-card border-border/50">
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                <FileUpload onFileSelect={setFile} disabled={loading} />

                {rateLimited && (
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/25 animate-slide-up">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-300">
                          Daily limit reached
                        </p>
                        <p className="text-xs text-amber-400/70 mt-0.5">
                          You've used all <span className="font-semibold text-amber-300">5 free analyses</span> for today.
                          Please come back tomorrow to analyze more reports.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {error && !rateLimited && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-slide-up">
                    {error}
                  </div>
                )}

                {loading ? (
                  <div className="py-4">
                    <LoadingAnalysis />
                  </div>
                ) : (
                  <Button
                    onClick={handleAnalyze}
                    disabled={!file || rateLimited}
                    className="w-full h-12 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 group"
                    id="analyze-button"
                  >
                    Analyze Report
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          /* ── Results Section ────────────────────────── */
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  Analysis Results
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Comprehensive review by 3 AI specialists + team summary
                </p>
              </div>
              <Button
                onClick={handleReset}
                variant="outline"
                className="gap-2 border-border/50 hover:bg-secondary w-full sm:w-auto"
                id="reset-button"
              >
                <RotateCcw className="w-4 h-4" />
                New Analysis
              </Button>
            </div>

            <Separator className="opacity-30" />

            {/* Specialist Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              <SpecialistCard
                type="cardiologist"
                content={results.cardiologist_report}
                delay={0}
              />
              <SpecialistCard
                type="psychologist"
                content={results.psychologist_report}
                delay={100}
              />
              <SpecialistCard
                type="pulmonologist"
                content={results.pulmonologist_report}
                delay={200}
              />
              <SpecialistCard
                type="team"
                content={results.multidisciplinary_summary}
                delay={300}
              />
            </div>

            {/* Disclaimer */}
            <div className="text-center text-xs text-muted-foreground/60 pt-4">
              ⚠️ This analysis is AI-generated and for informational purposes
              only. Always consult a qualified healthcare professional.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
