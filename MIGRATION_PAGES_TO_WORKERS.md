# Migration from Cloudflare Pages to Workers

## Migration Summary

**Date:** 2025-11-08
**Project:** paradive-landing (React 18 + TypeScript + Vite SPA)
**Migration Type:** Assets-only (no Pages Functions, no custom Worker code)
**Wrangler Version:** 4.46.0

## What Changed

### 1. Configuration File (wrangler.toml)

**Before (Pages):**
```toml
name = "paradive-landing"
compatibility_date = "2025-11-08"
pages_build_output_dir = "dist"

[build]
command = "npm run build"
```

**After (Workers):**
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

**Key Changes:**
- Removed `pages_build_output_dir = "dist"`
- Added `[assets]` section with:
  - `directory = "dist"` (where built files are)
  - `html_handling = "auto-trailing-slash"` (adds trailing slashes)
  - `not_found_handling = "single-page-application"` (routes all 404s to index.html for SPA routing)
- **Note:** `binding` is NOT used for assets-only Workers (only needed when you have a custom Worker script)

### 2. Deployment Commands (package.json)

**Before:**
```json
"deploy": "npm run build && wrangler pages deploy dist"
```

**After:**
```json
"deploy": "npm run build && wrangler deploy"
"deploy:production": "npm run build && wrangler deploy --env production"
```

**Key Changes:**
- Changed `wrangler pages deploy dist` to `wrangler deploy`
- No need to specify directory (configured in wrangler.toml)
- Added production deployment command

### 3. No Build Process Changes

The Vite build process remains unchanged:
- Build command: `npm run build`
- Output directory: `dist/`
- Build output structure: Same as before

## Deployment Instructions

### Development Deployment
```bash
npm run deploy
```

This will:
1. Run TypeScript compilation (`tsc`)
2. Run Vite production build
3. Deploy to Cloudflare Workers

### Production Deployment
```bash
npm run deploy:production
```

Uses the `[env.production]` configuration (if defined in wrangler.toml)

### Manual Deployment Steps
```bash
# 1. Build the project
npm run build

# 2. Deploy to Workers
wrangler deploy

# 3. Deploy to specific environment
wrangler deploy --env production
```

## Asset Handling Configuration Explained

### html_handling Options

**`auto-trailing-slash`** (Current setting)
- `/about` → redirects to `/about/`
- `/about/` → serves `/about.html` or `/about/index.html`
- Good for: SEO consistency, traditional web apps

**`force-trailing-slash`**
- Forces trailing slashes on all URLs
- Redirects non-slash URLs to slash URLs

**`drop-trailing-slash`**
- Removes trailing slashes
- `/about/` → redirects to `/about`

**`none`**
- No automatic handling
- Serves exactly what's requested

### not_found_handling Options

**`single-page-application`** (Current setting - RECOMMENDED for React)
- All 404 requests return `index.html` with 200 status
- Enables client-side routing (React Router, etc.)
- Perfect for SPAs that handle routing in JavaScript

**`404-page`**
- Returns custom 404.html if it exists
- Traditional static site behavior
- Use if NOT using client-side routing

**`none`**
- Returns standard 404 error
- No special handling

## Verification Steps

After deployment, verify:

1. **Site loads correctly:**
   ```bash
   # Your site will be at:
   # https://paradive-landing.<your-subdomain>.workers.dev
   ```

2. **SPA routing works:**
   - Navigate to different routes in your app
   - Refresh the page on a route (should not 404)
   - Check browser console for errors

3. **Assets load correctly:**
   - Check Network tab in DevTools
   - Verify all JS, CSS, images load
   - Check for MIME type issues

4. **Check deployment logs:**
   ```bash
   wrangler tail
   ```

## Differences Between Pages and Workers

| Feature | Pages | Workers |
|---------|-------|---------|
| Deployment command | `wrangler pages deploy dist` | `wrangler deploy` |
| Config key | `pages_build_output_dir` | `[assets]` section |
| SPA support | Automatic | `not_found_handling = "single-page-application"` |
| Custom routing | `_routes.json` | Worker code or assets config |
| Functions | `functions/` directory | Worker entry point |
| Build directory | Specified in command | Configured in `[assets]` |

## Future Enhancements

With Workers, you can now add:

### 1. Custom Worker Logic
Create `src/worker.ts`:
```typescript
export default {
  async fetch(request, env) {
    // Custom logic before serving assets
    const response = await env.ASSETS.fetch(request)
    return response
  }
}
```

Then update wrangler.toml:
```toml
main = "src/worker.ts"

[assets]
directory = "dist"
binding = "ASSETS"  # Now you need the binding since you have custom Worker code
html_handling = "auto-trailing-slash"
not_found_handling = "single-page-application"
```

**Important:** The `binding` parameter is ONLY needed when you have a custom Worker script (`main`). For assets-only Workers, do NOT include `binding`.

### 2. Edge Middleware
- Add authentication
- Implement redirects
- Add custom headers
- Rate limiting
- A/B testing
- Geolocation-based content

### 3. Bindings
- KV for caching
- D1 for database
- R2 for file storage
- Secrets for API keys

## Troubleshooting

### Issue: 404 on refresh
**Solution:** Ensure `not_found_handling = "single-page-application"` is set

### Issue: Assets not loading
**Solution:** Check `directory = "dist"` points to correct build output

### Issue: CORS errors
**Solution:** Add custom Worker to set CORS headers

### Issue: Deployment fails
**Solution:**
- Verify wrangler is logged in: `wrangler whoami`
- Check build completes: `npm run build`
- Verify dist/ directory exists and has content

## Rollback Plan

If you need to rollback to Pages:

1. Revert wrangler.toml:
   ```toml
   name = "paradive-landing"
   compatibility_date = "2025-11-08"
   pages_build_output_dir = "dist"

   [build]
   command = "npm run build"
   ```

2. Revert package.json:
   ```json
   "deploy": "npm run build && wrangler pages deploy dist"
   ```

3. Deploy to Pages:
   ```bash
   npm run deploy
   ```

## Additional Resources

- [Cloudflare Workers Assets Documentation](https://developers.cloudflare.com/workers/configuration/assets/)
- [Migration Guide](https://developers.cloudflare.com/pages/migrations/migrating-from-pages-to-workers/)
- [Workers Configuration Reference](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [Asset Handling Options](https://developers.cloudflare.com/workers/configuration/assets/#html-handling)

## Notes

- No changes to React code required
- No changes to Vite configuration required
- Build process remains identical
- All existing functionality preserved
- Ready for future Worker enhancements
