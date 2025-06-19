# ARIA Platform Deployment Guide

## Overview

This guide covers the complete deployment process for the ARIA Platform, including infrastructure setup, security configuration, monitoring, and maintenance procedures.

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN/WAF       │    │   Load Balancer │    │   App Servers   │
│   (Cloudflare)  │◄──►│   (Nginx)       │◄──►│   (Node.js)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       ▼                       │
         │              ┌─────────────────┐              │
         │              │   Database      │              │
         │              │   (Supabase)    │              │
         │              └─────────────────┘              │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Static Assets │    │   File Storage  │    │   Monitoring    │
│   (Netlify)     │    │   (Supabase)    │    │   (Sentry)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Prerequisites

### Required Accounts & Services
- [Netlify](https://netlify.com) - Static site hosting
- [Supabase](https://supabase.com) - Database and backend services
- [Google Cloud](https://cloud.google.com) - Gemini AI API
- [Cloudflare](https://cloudflare.com) - CDN and security (optional)
- [Sentry](https://sentry.io) - Error monitoring (optional)

### Required Tools
- Node.js 18+ and npm
- Git
- Netlify CLI (optional)
- Supabase CLI (for database management)

## Environment Setup

### 1. Environment Variables

Create environment files for different stages:

#### `.env.local` (Development)
```env
# Gemini AI
VITE_GEMINI_API_KEY=your_development_gemini_key

# Supabase
VITE_SUPABASE_URL=your_development_supabase_url
VITE_SUPABASE_ANON_KEY=your_development_supabase_anon_key

# Application
VITE_APP_ENV=development
VITE_APP_VERSION=1.0.0
VITE_APP_NAME=ARIA Platform

# External APIs
VITE_PUBMED_API_URL=https://eutils.ncbi.nlm.nih.gov/entrez/eutils
VITE_PATENT_API_URL=https://api.patentsview.org/patents
VITE_ARXIV_API_URL=https://export.arxiv.org/api

# Rate Limiting
VITE_API_RATE_LIMIT=100
VITE_API_RATE_WINDOW=3600000

# Monitoring (optional)
VITE_SENTRY_DSN=your_sentry_dsn
```

#### `.env.production` (Production)
```env
# Gemini AI
VITE_GEMINI_API_KEY=your_production_gemini_key

# Supabase
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key

# Application
VITE_APP_ENV=production
VITE_APP_VERSION=1.0.0
VITE_APP_NAME=ARIA Platform

# External APIs (same as development)
VITE_PUBMED_API_URL=https://eutils.ncbi.nlm.nih.gov/entrez/eutils
VITE_PATENT_API_URL=https://api.patentsview.org/patents
VITE_ARXIV_API_URL=https://export.arxiv.org/api

# Rate Limiting (production values)
VITE_API_RATE_LIMIT=1000
VITE_API_RATE_WINDOW=3600000

# Monitoring
VITE_SENTRY_DSN=your_production_sentry_dsn
```

## Database Setup (Supabase)

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project
3. Note down the project URL and anon key
4. Set up the database schema

### 2. Database Schema Migration

Run the following SQL in the Supabase SQL editor:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM (
  'researcher', 'inventor', 'attorney', 'manager', 
  'investor', 'student', 'admin'
);

CREATE TYPE organization_type AS ENUM (
  'university', 'corporation', 'startup', 'government',
  'law_firm', 'research_institute', 'individual'
);

CREATE TYPE project_status AS ENUM (
  'planning', 'active', 'paused', 'completed', 'cancelled'
);

CREATE TYPE analysis_type AS ENUM (
  'literature_review', 'patent_search', 'novelty_check',
  'market_analysis', 'invention_generation', 'claim_analysis'
);

-- Create tables (see PRD.md for complete schema)
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'researcher',
  organization_id UUID,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type organization_type NOT NULL,
  description TEXT,
  website TEXT,
  logo_url TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Research projects table
CREATE TABLE research_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status project_status DEFAULT 'planning',
  owner_id UUID REFERENCES users(id) NOT NULL,
  organization_id UUID REFERENCES organizations(id),
  domain TEXT NOT NULL,
  objectives TEXT[] DEFAULT '{}',
  methodology TEXT,
  timeline JSONB DEFAULT '[]',
  budget DECIMAL,
  tags TEXT[] DEFAULT '{}',
  visibility TEXT DEFAULT 'private',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI analyses table
CREATE TABLE ai_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type analysis_type NOT NULL,
  query TEXT,
  input_data JSONB NOT NULL,
  results JSONB NOT NULL,
  confidence_score DECIMAL(3,2) NOT NULL,
  model_version TEXT NOT NULL,
  processing_time INTEGER NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  project_id UUID REFERENCES research_projects(id),
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Inventions table
CREATE TABLE inventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technical_field TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  solution_overview TEXT NOT NULL,
  creator_id UUID REFERENCES users(id) NOT NULL,
  project_id UUID REFERENCES research_projects(id),
  status TEXT DEFAULT 'concept',
  novelty_score DECIMAL(3,2),
  commercial_potential JSONB DEFAULT '{}',
  embodiments JSONB DEFAULT '[]',
  claims JSONB DEFAULT '[]',
  prior_art TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collaborations table
CREATE TABLE collaborations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES research_projects(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  role TEXT DEFAULT 'collaborator',
  permissions TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage own data" ON users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Organization members can read org data" ON organizations
  FOR SELECT USING (
    id IN (
      SELECT organization_id FROM users 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Project access control" ON research_projects
  FOR ALL USING (
    owner_id = auth.uid() OR
    id IN (
      SELECT project_id FROM collaborations 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Analysis access control" ON ai_analyses
  FOR ALL USING (
    user_id = auth.uid() OR
    project_id IN (
      SELECT project_id FROM collaborations 
      WHERE user_id = auth.uid() AND 'read' = ANY(permissions)
    )
  );

CREATE POLICY "Invention access control" ON inventions
  FOR ALL USING (
    creator_id = auth.uid() OR
    project_id IN (
      SELECT project_id FROM collaborations 
      WHERE user_id = auth.uid() AND 'read' = ANY(permissions)
    )
  );

CREATE POLICY "Collaboration access control" ON collaborations
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Notification access control" ON notifications
  FOR ALL USING (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_projects_owner ON research_projects(owner_id);
CREATE INDEX idx_projects_organization ON research_projects(organization_id);
CREATE INDEX idx_analyses_user ON ai_analyses(user_id);
CREATE INDEX idx_analyses_project ON ai_analyses(project_id);
CREATE INDEX idx_inventions_creator ON inventions(creator_id);
CREATE INDEX idx_inventions_project ON inventions(project_id);
CREATE INDEX idx_collaborations_project ON collaborations(project_id);
CREATE INDEX idx_collaborations_user ON collaborations(user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(user_id, read);
```

### 3. Authentication Setup

1. In Supabase Dashboard, go to Authentication > Settings
2. Configure authentication providers (email/password is enabled by default)
3. Set up email templates for confirmation and password reset
4. Configure JWT settings and session timeout

## Deployment Steps

### 1. Netlify Deployment

#### Option A: Git Integration (Recommended)

1. **Connect Repository**
   ```bash
   # Push your code to GitHub/GitLab
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Netlify Setup**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
     - Node version: `18`

3. **Environment Variables**
   - Go to Site settings > Environment variables
   - Add all production environment variables
   - Ensure sensitive keys are properly secured

4. **Deploy Settings**
   ```yaml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = "dist"
     
   [build.environment]
     NODE_VERSION = "18"
     NPM_VERSION = "9"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-XSS-Protection = "1; mode=block"
       X-Content-Type-Options = "nosniff"
       Referrer-Policy = "strict-origin-when-cross-origin"
       Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://apis.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co https://generativelanguage.googleapis.com"
   ```

#### Option B: Manual Deployment

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Deploy
   netlify deploy --prod --dir=dist
   ```

### 2. Custom Domain Setup

1. **Add Custom Domain**
   - In Netlify Dashboard, go to Domain settings
   - Add your custom domain
   - Configure DNS settings

2. **SSL Certificate**
   - Netlify automatically provisions SSL certificates
   - Verify HTTPS is working

3. **DNS Configuration**
   ```
   # Add these DNS records
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5 (Netlify's load balancer)
   ```

### 3. CDN and Security (Cloudflare)

1. **Cloudflare Setup**
   - Add your domain to Cloudflare
   - Update nameservers
   - Enable proxy (orange cloud)

2. **Security Settings**
   ```yaml
   # Cloudflare Page Rules
   - URL: aria-platform.com/*
     Settings:
       - Always Use HTTPS: On
       - Browser Cache TTL: 4 hours
       - Security Level: Medium
       - WAF: On
   ```

3. **Performance Optimization**
   - Enable Brotli compression
   - Configure caching rules
   - Enable HTTP/2 and HTTP/3

## Monitoring and Logging

### 1. Error Monitoring (Sentry)

1. **Setup Sentry**
   ```bash
   npm install @sentry/react @sentry/tracing
   ```

2. **Configure Sentry**
   ```typescript
   // src/lib/sentry.ts
   import * as Sentry from "@sentry/react";
   import { BrowserTracing } from "@sentry/tracing";

   Sentry.init({
     dsn: import.meta.env.VITE_SENTRY_DSN,
     integrations: [
       new BrowserTracing(),
     ],
     tracesSampleRate: 1.0,
     environment: import.meta.env.VITE_APP_ENV,
   });
   ```

### 2. Analytics Setup

1. **Supabase Analytics**
   - Enable analytics in Supabase dashboard
   - Monitor database performance
   - Track API usage

2. **Custom Analytics**
   ```typescript
   // src/lib/analytics.ts
   export function trackEvent(event: string, properties?: any) {
     if (import.meta.env.VITE_APP_ENV === 'production') {
       // Send to analytics service
       console.log('Analytics:', event, properties);
     }
   }
   ```

### 3. Performance Monitoring

1. **Web Vitals**
   ```typescript
   // src/lib/performance.ts
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

   function sendToAnalytics(metric: any) {
     // Send performance metrics to monitoring service
     console.log('Performance:', metric);
   }

   getCLS(sendToAnalytics);
   getFID(sendToAnalytics);
   getFCP(sendToAnalytics);
   getLCP(sendToAnalytics);
   getTTFB(sendToAnalytics);
   ```

## Security Configuration

### 1. Environment Security

1. **Secure Environment Variables**
   - Never commit `.env` files
   - Use different keys for different environments
   - Rotate API keys regularly

2. **Access Control**
   - Limit Netlify admin access
   - Use team accounts for collaboration
   - Enable 2FA on all accounts

### 2. Application Security

1. **Content Security Policy**
   ```typescript
   // Implemented in netlify.toml headers
   Content-Security-Policy: "default-src 'self'; script-src 'self' 'unsafe-inline' https://apis.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co https://generativelanguage.googleapis.com"
   ```

2. **API Security**
   - Rate limiting implemented
   - Input validation on all endpoints
   - Secure authentication flow

### 3. Database Security

1. **Row Level Security**
   - All tables have RLS enabled
   - Policies restrict data access
   - Regular security audits

2. **Backup and Recovery**
   - Automated daily backups
   - Point-in-time recovery
   - Disaster recovery plan

## Maintenance and Updates

### 1. Regular Maintenance

1. **Dependency Updates**
   ```bash
   # Check for updates
   npm outdated
   
   # Update dependencies
   npm update
   
   # Security audit
   npm audit
   npm audit fix
   ```

2. **Database Maintenance**
   - Monitor query performance
   - Optimize slow queries
   - Regular VACUUM and ANALYZE

3. **Security Updates**
   - Monitor security advisories
   - Apply patches promptly
   - Regular penetration testing

### 2. Backup Procedures

1. **Database Backups**
   - Automated daily backups via Supabase
   - Weekly full backups
   - Monthly backup testing

2. **Code Backups**
   - Git repository backups
   - Environment configuration backups
   - Documentation backups

### 3. Disaster Recovery

1. **Recovery Plan**
   - RTO: 4 hours
   - RPO: 1 hour
   - Documented procedures

2. **Testing**
   - Quarterly disaster recovery tests
   - Annual full recovery simulation
   - Documentation updates

## Scaling Considerations

### 1. Performance Optimization

1. **Frontend Optimization**
   - Code splitting
   - Lazy loading
   - Image optimization
   - CDN usage

2. **Database Optimization**
   - Query optimization
   - Index management
   - Connection pooling
   - Read replicas

### 2. Infrastructure Scaling

1. **Horizontal Scaling**
   - Multiple Netlify deployments
   - Database read replicas
   - CDN edge locations

2. **Vertical Scaling**
   - Supabase plan upgrades
   - Increased compute resources
   - Enhanced monitoring

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and rebuild
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Environment Variable Issues**
   - Verify all required variables are set
   - Check variable naming (VITE_ prefix)
   - Restart deployment after changes

3. **Database Connection Issues**
   - Check Supabase project status
   - Verify connection strings
   - Check RLS policies

### Support Contacts

- **Technical Support**: tech-support@aria-platform.com
- **Security Issues**: security@aria-platform.com
- **Emergency**: +1-XXX-XXX-XXXX

## Deployment Checklist

### Pre-Deployment
- [ ] All environment variables configured
- [ ] Database schema deployed
- [ ] Security policies tested
- [ ] Performance testing completed
- [ ] Backup procedures verified

### Deployment
- [ ] Code deployed to production
- [ ] Database migrations applied
- [ ] SSL certificate active
- [ ] CDN configured
- [ ] Monitoring enabled

### Post-Deployment
- [ ] Application functionality verified
- [ ] Performance metrics checked
- [ ] Security scan completed
- [ ] Backup verification
- [ ] Documentation updated

---

This deployment guide ensures a secure, scalable, and maintainable deployment of the ARIA Platform. Regular reviews and updates of this guide are recommended as the platform evolves.