import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, FileText, Clock } from 'lucide-react';
import type { ScanResponse } from '@/types';

interface ScanResultsProps {
  result: ScanResponse;
}

export function ScanResults({ result }: ScanResultsProps) {
  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/20">
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Scan Complete</CardTitle>
            <CardDescription>Issues have been cached successfully</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card/50 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Repository</span>
              <Badge variant="outline" className="font-mono text-xs">
                {result.repo}
              </Badge>
            </div>
          </div>
          
          <div className="bg-card/50 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Issues Found</span>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-bold text-2xl text-primary">{result.issues_fetched}</span>
              </div>
            </div>
          </div>
        </div>
        
        {result.issues_fetched === 0 ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <Clock className="h-4 w-4" />
            <span>No open issues found in this repository. The project might be well-maintained!</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 p-3 rounded-lg">
            <CheckCircle2 className="h-4 w-4" />
            <span>Ready for analysis! Use the form below to ask questions about these issues.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
