import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Sparkles, Lightbulb, TrendingUp, AlertCircle, MessageSquare } from 'lucide-react';
import { githubApi } from '@/services/github-api';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  prompt: z.string().min(1, 'Please enter an analysis prompt'),
});

interface AnalysisInterfaceProps {
  repo: string;
}

export function AnalysisInterface({ repo }: AnalysisInterfaceProps) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const result = await githubApi.analyzeIssues(repo, values.prompt.trim());
      setAnalysis(result.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze issues');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const examplePrompts = [
    {
      icon: TrendingUp,
      text: 'Find themes across recent issues and recommend what the maintainers should fix first',
      category: 'Priority'
    },
    {
      icon: Lightbulb,
      text: 'Summarize the most common feature requests',
      category: 'Features'
    },
    {
      icon: AlertCircle,
      text: 'Identify critical bugs that need immediate attention',
      category: 'Bugs'
    },
    {
      icon: MessageSquare,
      text: 'What are users most frustrated about?',
      category: 'Sentiment'
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>AI-Powered Analysis</CardTitle>
              <CardDescription>
                Ask questions about the cached issues using natural language
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Analysis Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What would you like to know about these issues?"
                        disabled={isAnalyzing}
                        rows={4}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Quick prompts:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {examplePrompts.map((example, index) => {
                    const Icon = example.icon;
                    return (
                      <Button
                        key={index}
                        type="button"
                        variant="outline"
                        onClick={() => form.setValue('prompt', example.text)}
                        disabled={isAnalyzing}
                        className="h-auto py-3 px-4 justify-start text-left hover:bg-primary/5 hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-start gap-3 w-full">
                          <div className="p-1.5 rounded-md bg-primary/10 shrink-0">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-primary mb-1">
                              {example.category}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-2">
                              {example.text}
                            </div>
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-4 rounded-lg border border-destructive/20 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" disabled={isAnalyzing} className="w-full h-12 text-base shadow-lg shadow-primary/20">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Analyze Issues
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {analysis && (
        <Card className="border-primary/30 shadow-xl animate-fade-in">
          <CardHeader className="bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>AI-generated insights for {repo}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {analysis}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
