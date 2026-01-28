import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Search, AlertCircle, Github } from 'lucide-react';
import { githubApi } from '@/services/github-api';
import type { ScanResponse } from '@/types';

const formSchema = z.object({
  repo: z.string()
    .min(1, 'Please enter a repository name')
    .refine((val) => val.includes('/'), {
      message: 'Repository format should be "owner/repository-name"',
    }),
});

interface RepoInputProps {
  onScanComplete: (result: ScanResponse) => void;
}

export function RepoInput({ onScanComplete }: RepoInputProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      repo: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    setIsScanning(true);

    try {
      const result = await githubApi.scanRepository(values.repo.trim());
      onScanComplete(result);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan repository');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Github className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Scan GitHub Repository</CardTitle>
            <CardDescription>
              Enter a GitHub repository to fetch and cache its open issues
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="repo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="owner/repository-name"
                        disabled={isScanning}
                        className="pl-10 h-12"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Example: <span className="font-mono text-primary">facebook/react</span> or <span className="font-mono text-primary">microsoft/vscode</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-4 rounded-lg border border-destructive/20 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <Button 
              type="submit" 
              disabled={isScanning} 
              className="w-full h-12 text-base shadow-lg shadow-primary/20"
            >
              {isScanning ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Scanning Repository...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Scan Repository
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
