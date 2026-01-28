import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GitHubIssue {
  id: number;
  title: string;
  body: string | null;
  html_url: string;
  created_at: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { repo } = await req.json();

    if (!repo || typeof repo !== 'string' || !repo.includes('/')) {
      return new Response(
        JSON.stringify({ error: 'Invalid repo format. Expected "owner/repository-name"' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const githubToken = Deno.env.get('GITHUB_TOKEN');
    if (!githubToken) {
      return new Response(
        JSON.stringify({ error: 'GitHub token not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch open issues from GitHub API
    const githubUrl = `https://api.github.com/repos/${repo}/issues?state=open&per_page=100`;
    const githubResponse = await fetch(githubUrl, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Issue-Analyzer',
      },
    });

    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      return new Response(
        JSON.stringify({ 
          error: `GitHub API error: ${githubResponse.status} ${githubResponse.statusText}`,
          details: errorText 
        }),
        { status: githubResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const issues: GitHubIssue[] = await githubResponse.json();

    // Filter out pull requests (GitHub API returns PRs as issues)
    const actualIssues = issues.filter(issue => !issue.html_url.includes('/pull/'));

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Delete existing issues for this repo
    await supabase.from('issues').delete().eq('repo', repo);

    // Insert new issues
    if (actualIssues.length > 0) {
      const issuesData = actualIssues.map(issue => ({
        id: issue.id,
        repo,
        title: issue.title,
        body: issue.body || '',
        html_url: issue.html_url,
        created_at: issue.created_at,
      }));

      const { error: insertError } = await supabase
        .from('issues')
        .insert(issuesData);

      if (insertError) {
        return new Response(
          JSON.stringify({ error: 'Failed to cache issues', details: insertError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({
        repo,
        issues_fetched: actualIssues.length,
        cached_successfully: true,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
