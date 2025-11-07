# GitHub Automated Deployment Setup

This guide explains how to set up automated deployments to Cloudflare Workers from your GitHub repository.

## Current Configuration

- **Repository**: `BinatrixAI/paradive-lp`
- **Cloudflare Account**: OQVA (`25a2df56c26faf86bc9de7a9f31fbc9a`)
- **Worker Name**: `paradive-landing`
- **Live URL**: https://paradive-landing.oqva-account.workers.dev

## Option 1: GitHub Actions (Recommended)

### Step 1: Create Cloudflare API Token

1. Go to Cloudflare Dashboard → [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token**
3. Find **Edit Cloudflare Workers** template → Click **Use Template**
4. Customize settings:
   - **Token name**: `GitHub Actions - Paradive Landing`
   - **Account Resources**: Select only **OQVA** account
   - **Zone Resources**: Not needed for Workers
5. Click **Continue to summary** → **Create Token**
6. **IMPORTANT**: Copy the token immediately (you won't see it again!)

### Step 2: Add Secrets to GitHub

1. Go to your GitHub repository: https://github.com/BinatrixAI/paradive-lp
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

   **Secret 1:**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: [paste the API token from Step 1]

   **Secret 2:**
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: `25a2df56c26faf86bc9de7a9f31fbc9a`

### Step 3: Push to GitHub

The GitHub Actions workflow is already configured in `.github/workflows/deploy.yml`.

When you push to the `main` branch, it will automatically:
1. Checkout code
2. Install dependencies
3. Build the project
4. Deploy to Cloudflare Workers

You can also trigger manual deployments from the **Actions** tab.

### Testing the Workflow

```bash
# Add the workflow files
git add .github/workflows/deploy.yml
git add GITHUB_DEPLOYMENT_SETUP.md

# Commit and push
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

Go to https://github.com/BinatrixAI/paradive-lp/actions to watch the deployment.

---

## Option 2: Cloudflare Workers Builds (Alternative)

Workers Builds is Cloudflare's native CI/CD system with GitHub integration.

### Benefits
- No GitHub secrets required (managed by Cloudflare)
- Built-in preview deployments
- Integrated build logs in Cloudflare Dashboard
- Automatic environment detection

### Setup Steps

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Select **OQVA** account
2. Navigate to **Workers & Pages** → Find **paradive-landing**
3. Click on the Worker → Go to **Settings** → **Builds & Deployments**
4. Click **Connect to Git**
5. Authorize Cloudflare to access your GitHub account
6. Select repository: `BinatrixAI/paradive-lp`
7. Configure build settings:
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Deploy command**: `npx wrangler deploy`
   - **Root directory**: `/` (or leave empty)
8. Click **Save and Deploy**

### Features
- **Automatic deployments**: Pushes to `main` trigger builds
- **Preview deployments**: PRs get preview URLs
- **Build notifications**: Status checks on commits
- **Build history**: View all builds in dashboard

---

## Workflow File Details

The GitHub Actions workflow (`.github/workflows/deploy.yml`) includes:

- **Trigger**: Runs on push to `main` branch
- **Manual trigger**: Can be run manually from Actions tab
- **Node.js 18**: Matches project requirements
- **Cache**: NPM dependencies are cached for faster builds
- **Wrangler Action v3**: Official Cloudflare action

---

## Manual Deployment

You can always deploy manually from your local machine:

```bash
npm run deploy
```

---

## Troubleshooting

### Build fails with "Module not found"
- Make sure all dependencies are in `package.json`
- Check that `npm ci` installs correctly locally

### Authentication error
- Verify API token has correct permissions
- Check account ID matches OQVA account
- Ensure secrets are correctly set in GitHub

### Asset files not deployed
- Ensure static files are in `public/` directory
- Check `wrangler.toml` has correct `[assets]` configuration

---

## Security Notes

- **Never commit** `CLOUDFLARE_API_TOKEN` to the repository
- API tokens should be scoped to specific accounts only
- Rotate API tokens periodically for security
- Use GitHub repository secrets for sensitive data

---

## Next Steps

After setting up automated deployments, consider:

1. **Custom Domain**: Set up a custom domain for production
2. **Environment Variables**: Add runtime secrets in Cloudflare dashboard
3. **Preview Deployments**: Set up preview URLs for PRs
4. **Monitoring**: Enable Workers Analytics for insights
5. **Staging Environment**: Create a staging Worker for testing

For more information, visit [Cloudflare Workers CI/CD Documentation](https://developers.cloudflare.com/workers/ci-cd/).
