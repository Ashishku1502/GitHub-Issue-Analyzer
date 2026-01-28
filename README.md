# GitHub Issue Analysis Server

## Project Overview

A backend server application that fetches open issues from GitHub repositories, caches them locally in a database, and provides AI-powered analysis using natural language prompts through LLM integration.

## Features

- **Issue Scanning**: Fetch all open issues from any GitHub repository
- **Local Caching**: Store issues in Supabase PostgreSQL database for fast access
- **AI Analysis**: Analyze cached issues using OpenAI's GPT models with natural language prompts
- **Clean UI**: Modern, responsive interface for interacting with the backend services

## Architecture

### Storage Solution
This application uses **Supabase PostgreSQL** as the storage backend, providing:
- Durable, persistent storage
- Fast query performance with proper indexing
- Easy to inspect and manage data
- Scalable for large datasets

### Backend (Edge Functions)
- **`/scan` endpoint**: Fetches open issues from GitHub API and caches them
- **`/analyze` endpoint**: Retrieves cached issues and sends them to OpenAI for analysis

### Frontend
- React + TypeScript + Tailwind CSS
- shadcn/ui components for consistent design
- Real-time feedback and error handling

## API Endpoints

### POST /scan
Fetches and caches open issues from a GitHub repository.

**Request:**
```json
{
  "repo": "owner/repository-name"
}
```

**Response:**
```json
{
  "repo": "owner/repository-name",
  "issues_fetched": 42,
  "cached_successfully": true
}
```

### POST /analyze
Analyzes cached issues using AI with a natural language prompt.

**Request:**
```json
{
  "repo": "owner/repository-name",
  "prompt": "Find themes across recent issues and recommend what the maintainers should fix first"
}
```

**Response:**
```json
{
  "analysis": "<LLM generated analysis text>"
}
```

## Setup Instructions

### Prerequisites
- Node.js ≥ 20
- npm ≥ 10
- GitHub Personal Access Token
- OpenAI API Key

### Environment Configuration

The application requires two secrets to be configured:

1. **GITHUB_TOKEN**: GitHub Personal Access Token
   - Create one at: https://github.com/settings/tokens
   - Required scopes: `public_repo` (for public repos) or `repo` (for private repos)

2. **OPENAI_API_KEY**: OpenAI API Key
   - Get your API key from: https://platform.openai.com/api-keys

These secrets are configured through the Supabase dashboard and are automatically injected into the Edge Functions.

### Installation

```bash
# Step 1: Download and extract the code package
# Step 2: Open the project in your IDE
# Step 3: Install dependencies
npm i

# Step 4: Start the development server
npm run dev -- --host 127.0.0.1

# If step 4 fails, try:
npx vite --host 127.0.0.1
```

## Database Schema

The application uses a single `issues` table:

```sql
CREATE TABLE issues (
  id BIGINT PRIMARY KEY,           -- GitHub issue ID
  repo TEXT NOT NULL,              -- Repository name (owner/repo)
  title TEXT NOT NULL,             -- Issue title
  body TEXT,                       -- Issue description
  html_url TEXT NOT NULL,          -- GitHub issue URL
  created_at TIMESTAMPTZ NOT NULL, -- Issue creation date
  cached_at TIMESTAMPTZ DEFAULT NOW() -- Cache timestamp
);
```

Indexes are created on `repo` and `created_at` for optimal query performance.

## Usage

1. **Scan a Repository**
   - Enter a GitHub repository in the format `owner/repository-name`
   - Click "Scan Repository" to fetch and cache open issues
   - View the number of issues fetched

2. **Analyze Issues**
   - After scanning, enter a natural language prompt
   - Use example prompts or write your own
   - Click "Analyze Issues" to get AI-powered insights
   - View the analysis results

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui, Vite
- **Backend**: Supabase Edge Functions (Deno runtime)
- **Database**: Supabase PostgreSQL
- **APIs**: GitHub REST API, OpenAI API

## Project Directory

```
├── README.md # Documentation
├── components.json # Component library configuration
├── index.html # Entry file
├── package.json # Package management
├── postcss.config.js # PostCSS configuration
├── public # Static resources directory
│   ├── favicon.png # Icon
│   └── images # Image resources
├── src # Source code directory
│   ├── App.tsx # Entry file
│   ├── components # Components directory
│   ├── context # Context directory
│   ├── db # Database configuration directory
│   ├── hooks # Common hooks directory
│   ├── index.css # Global styles
│   ├── layout # Layout directory
│   ├── lib # Utility library directory
│   ├── main.tsx # Entry file
│   ├── routes.tsx # Routing configuration
│   ├── pages # Pages directory
│   ├── services # Database interaction directory
│   ├── types # Type definitions directory
├── tsconfig.app.json # TypeScript frontend configuration file
├── tsconfig.json # TypeScript configuration file
├── tsconfig.node.json # TypeScript Node.js configuration file
└── vite.config.ts # Vite configuration file
```

## Tech Stack

Vite, TypeScript, React, Supabase

## Development Guidelines

### How to edit code locally?

You can choose [VSCode](https://code.visualstudio.com/Download) or any IDE you prefer. The only requirement is to have Node.js and npm installed.

### Environment Requirements

```
# Node.js ≥ 20
# npm ≥ 10
Example:
# node -v   # v20.18.3
# npm -v    # 10.8.2
```

### Installing Node.js on Windows

```
# Step 1: Visit the Node.js official website: https://nodejs.org/, click download. The website will automatically suggest a suitable version (32-bit or 64-bit) for your system.
# Step 2: Run the installer: Double-click the downloaded installer to run it.
# Step 3: Complete the installation: Follow the installation wizard to complete the process.
# Step 4: Verify installation: Open Command Prompt (cmd) or your IDE terminal, and type `node -v` and `npm -v` to check if Node.js and npm are installed correctly.
```

### Installing Node.js on macOS

```
# Step 1: Using Homebrew (Recommended method): Open Terminal. Type the command `brew install node` and press Enter. If Homebrew is not installed, you need to install it first by running the following command in Terminal:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
Alternatively, use the official installer: Visit the Node.js official website. Download the macOS .pkg installer. Open the downloaded .pkg file and follow the prompts to complete the installation.
# Step 2: Verify installation: Open Command Prompt (cmd) or your IDE terminal, and type `node -v` and `npm -v` to check if Node.js and npm are installed correctly.
```

### After installation, follow these steps:

```
# Step 1: Download the code package
# Step 2: Extract the code package
# Step 3: Open the code package with your IDE and navigate into the code directory
# Step 4: In the IDE terminal, run the command to install dependencies: npm i
# Step 5: In the IDE terminal, run the command to start the development server: npm run dev -- --host 127.0.0.1
# Step 6: if step 5 failed, try this command to start the development server: npx vite --host 127.0.0.1
```

### How to develop backend services?

Configure environment variables and install relevant dependencies.If you need to use a database, please use the official version of Supabase.

## Learn More

You can also check the help documentation: Download and Building the app（ [https://intl.cloud.baidu.com/en/doc/MIAODA/s/download-and-building-the-app-en](https://intl.cloud.baidu.com/en/doc/MIAODA/s/download-and-building-the-app-en)）to learn more detailed content.
# GitHub-Issue-Analyzer
