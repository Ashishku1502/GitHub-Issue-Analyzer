import { supabase } from '@/db/supabase';
import type { ScanResponse, AnalyzeResponse } from '@/types';

export const githubApi = {
  async scanRepository(repo: string): Promise<ScanResponse> {
    const { data, error } = await supabase.functions.invoke<ScanResponse>('scan', {
      body: { repo },
      method: 'POST',
    });

    if (error) {
      throw new Error(error.message || 'Failed to scan repository');
    }

    if (!data) {
      throw new Error('No data returned from scan');
    }

    return data;
  },

  async analyzeIssues(repo: string, prompt: string): Promise<AnalyzeResponse> {
    const { data, error } = await supabase.functions.invoke<AnalyzeResponse>('analyze', {
      body: { repo, prompt },
      method: 'POST',
    });

    if (error) {
      throw new Error(error.message || 'Failed to analyze issues');
    }

    if (!data) {
      throw new Error('No data returned from analysis');
    }

    return data;
  },
};
