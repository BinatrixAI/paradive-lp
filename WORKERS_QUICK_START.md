# Cloudflare Workers - Quick Start Guide

## Migration Complete

Your React SPA has been successfully configured for Cloudflare Workers deployment.

## Quick Commands

```bash
# Deploy to Workers
npm run deploy

# Deploy to production environment
npm run deploy:production

# Test deployment configuration (dry-run)
wrangler deploy --dry-run

# View live logs
wrangler tail

# Check deployment status
wrangler deployments list
```

## Current Configuration

### wrangler.toml
```toml
name = "paradive-landing"
compatibility_date = "2025-11-08"

[assets]
directory = "dist"
html_handling = "auto-trailing-slash"
not_found_handling = "single-page-application"

[build]
command = "npm run build"
```

### What This Means

- **Assets-only Worker:** No custom server logic (pure static SPA)
- **SPA Routing:** All 404s redirect to index.html (React Router works)
- **Trailing Slashes:** Automatically added to URLs for SEO consistency
- **Build Integration:** Wrangler runs `npm run build` before deployment

## Deployment Workflow

1. Make changes to your React code
2. Test locally: `npm run dev`
3. Build: `npm run build` (optional - deploy does this)
4. Deploy: `npm run deploy`
5. Your site is live at: `https://paradive-landing.<your-subdomain>.workers.dev`

## Key Differences from Pages

| Aspect | Pages | Workers |
|--------|-------|---------|
| Command | `wrangler pages deploy dist` | `wrangler deploy` |
| Config | `pages_build_output_dir` | `[assets]` section |
| SPA Support | Automatic | `not_found_handling = "single-page-application"` |
| Custom Logic | Functions directory | Worker script (optional) |

## Troubleshooting

### Deployment fails with "binding" error
Remove `binding = "ASSETS"` from `[assets]` section. Only needed for custom Workers.

### 404 on page refresh
Ensure `not_found_handling = "single-page-application"` is set in wrangler.toml.

### Assets not loading
Verify `directory = "dist"` and that `npm run build` completes successfully.

### Custom domain
Configure in Cloudflare dashboard: Workers & Pages > paradive-landing > Settings > Domains

## Next Steps

### Add Custom Domain
1. Go to Cloudflare dashboard
2. Navigate to Workers & Pages
3. Select "paradive-landing"
4. Go to Settings > Domains
5. Add your custom domain

### Add Environment Variables
In wrangler.toml:
```toml
[vars]
API_URL = "https://api.example.com"
ENVIRONMENT = "production"
```

### Add Secrets
```bash
# Add secret via CLI
wrangler secret put API_KEY

# Or via dashboard
# Workers & Pages > paradive-landing > Settings > Variables and Secrets
```

### Enable Custom Worker Logic
If you need server-side functionality later:

1. Create `src/worker.ts`:
```typescript
export default {
  async fetch(request, env) {
    // Your custom logic here
    // For example: redirects, authentication, API calls

    // Serve assets
    return env.ASSETS.fetch(request)
  }
}
```

2. Update wrangler.toml:
```toml
main = "src/worker.ts"

[assets]
directory = "dist"
binding = "ASSETS"  # Now needed!
html_handling = "auto-trailing-slash"
not_found_handling = "single-page-application"
```

3. Deploy:
```bash
npm run deploy
```

## Resources

- [Workers Assets Docs](https://developers.cloudflare.com/workers/configuration/assets/)
- [Migration Guide](https://developers.cloudflare.com/pages/migrations/migrating-from-pages-to-workers/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/commands/)
- [Workers Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/)

## Support

- [Cloudflare Discord](https://discord.gg/cloudflaredev)
- [Community Forum](https://community.cloudflare.com/)
- [GitHub Issues](https://github.com/cloudflare/workers-sdk/issues)
