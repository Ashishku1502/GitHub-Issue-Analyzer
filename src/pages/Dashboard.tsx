import { useState } from 'react';
import { RepoInput } from '@/components/RepoInput';
import { ScanResults } from '@/components/ScanResults';
import { AnalysisInterface } from '@/components/AnalysisInterface';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { ScanResponse } from '@/types';
import { Github, Sparkles, Database, Zap, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  const [scanResult, setScanResult] = useState<ScanResponse | null>(null);

  const handleScanComplete = (result: ScanResponse) => {
    setScanResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/20">
                <Github className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                  GitHub Issue Analyzer
                  <Badge variant="secondary" className="text-xs">AI-Powered</Badge>
                </h1>
                <p className="text-xs text-muted-foreground">
                  Intelligent issue analysis and insights
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 py-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Powered by OpenAI GPT-4
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Analyze GitHub Issues with AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fetch open issues from any repository, cache them securely, and get AI-powered insights to help maintainers prioritize and understand their backlog.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Github className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Fetch Issues</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Connect to any public GitHub repository and fetch all open issues instantly
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Cache Locally</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Store issues in Supabase for fast access and efficient analysis
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">AI Analysis</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Ask questions in natural language and get intelligent recommendations
              </p>
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-gradient-to-br from-accent/50 to-accent/30 border border-accent-foreground/20 rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent-foreground/10">
                <Sparkles className="h-5 w-5 text-accent-foreground" />
              </div>
              <div className="space-y-3 flex-1">
                <h3 className="font-semibold text-accent-foreground text-lg">How it works</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-foreground/20 text-accent-foreground text-xs font-bold shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="text-sm text-accent-foreground/90">
                      Enter a GitHub repository (e.g., facebook/react)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-foreground/20 text-accent-foreground text-xs font-bold shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="text-sm text-accent-foreground/90">
                      Scan to fetch and cache all open issues
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-foreground/20 text-accent-foreground text-xs font-bold shrink-0 mt-0.5">
                      3
                    </div>
                    <p className="text-sm text-accent-foreground/90">
                      Ask questions using natural language
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-foreground/20 text-accent-foreground text-xs font-bold shrink-0 mt-0.5">
                      4
                    </div>
                    <p className="text-sm text-accent-foreground/90">
                      Get AI-powered analysis and recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scan Section */}
          <div className="animate-fade-in">
            <RepoInput onScanComplete={handleScanComplete} />
          </div>

          {/* Results Section */}
          {scanResult && (
            <div className="space-y-6 animate-fade-in">
              <ScanResults result={scanResult} />
              
              {scanResult.issues_fetched > 0 && (
                <AnalysisInterface repo={scanResult.repo} />
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Github className="h-4 w-4" />
              <span>© 2026 GitHub Issue Analyzer</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                GitHub API
                <ExternalLink className="h-3 w-3" />
              </a>
              <a 
                href="https://openai.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                OpenAI
                <ExternalLink className="h-3 w-3" />
              </a>
              <a 
                href="https://supabase.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                Supabase
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
