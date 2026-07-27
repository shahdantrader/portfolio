# Deployment Guide

This portfolio is a static Next.js 16 application that can be deployed to multiple platforms.

## Quick Start: Vercel (Recommended)

Vercel is the official hosting platform for Next.js and requires zero configuration.

### Deploy to Vercel

1. **Push to GitHub** (already done ✓)
   ```bash
   git push origin main
   ```

2. **Go to [https://vercel.com/new](https://vercel.com/new)**
   - Import the repository: `shahdantrader/portfolio`
   - Vercel auto-detects Next.js
   - No environment variables needed
   - Click "Deploy"

3. **Domain Configuration**
   - Vercel provides a `.vercel.app` domain automatically
   - (Optional) Connect custom domain in Vercel Settings → Domains
   - DNS records will be provided (CNAME or A records)

### Auto-Deploy on Push

Once connected, Vercel automatically:
- Detects pushes to `main`
- Builds the project
- Deploys to production
- (Optional) Creates preview deployments for PRs

**Deployment URL**: `https://<project>.vercel.app`

---

## Alternative: Docker + Self-Hosted

For traditional server deployment or containerized environments.

### Build Docker Image

Create `.dockerignore` (if not present):
```
node_modules
.next
.git
.gitignore
README.md
DEVELOPMENT.md
CONTRIBUTING.md
```

Create `Dockerfile`:
```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
```

### Build and Run

```bash
# Build image
docker build -t portfolio:latest .

# Run container
docker run -p 3000:3000 portfolio:latest
```

### Push to Container Registry

```bash
# Tag for Docker Hub (example)
docker tag portfolio:latest shahdantrader/portfolio:latest

# Login and push
docker login
docker push shahdantrader/portfolio:latest
```

### Deploy to Cloud (examples)

**Heroku**:
```bash
heroku create portfolio-app
git push heroku main
```

**DigitalOcean App Platform**:
1. Connect GitHub repo
2. Select `Dockerfile`
3. Deploy

**AWS ECS**:
1. Push image to ECR
2. Create ECS task definition
3. Deploy task

---

## Alternative: Static Export (GitHub Pages)

If you want to host on GitHub Pages, you can export as static HTML (no server-side rendering).

### Enable Static Export

1. Update `next.config.ts`:
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Disable image optimization (GitHub Pages incompatibility)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

2. Build:
```bash
npm run build
```

3. Output goes to `out/` directory

4. Deploy to GitHub Pages:
```bash
git add out/
git commit -m "Deploy to GitHub Pages"
git push origin main
```

Then go to **Settings → Pages → Source → Deploy from a branch** and select `main` + `/root` directory.

**Note**: This disables Next.js dynamic features (no API routes, no ISR), but your portfolio is entirely static anyway.

---

## Build Output

### Production Build Size

```bash
npm run build
# Output:
# ✓ Compiled successfully in 5.4s
# ✓ Generated static pages using 4 workers
# 
# Route (app)
# ┌ ○ /
# └ ○ /_not-found
```

**Optimized assets**:
- JavaScript: Minified and tree-shaken
- CSS: Tailwind utilities (only used classes)
- Fonts: Optimized and preloaded
- Images: Optimized (if any added)

### Build Artifacts

- `.next/`: Build output (not committed)
- `out/`: Static export (if using `output: 'export'`)

---

## Performance

### Lighthouse Scores

Current target metrics:
- **Performance**: > 90 (fast static site)
- **Accessibility**: > 95 (semantic HTML, focus states)
- **Best Practices**: > 95 (modern tooling, no console errors)
- **SEO**: > 95 (proper metadata, structured data)

### Optimization Done

✓ Fonts: `display: swap` for fast rendering  
✓ Images: Lazy loading (Next.js default)  
✓ CSS: Tailwind tree-shaking (only used utilities)  
✓ JavaScript: Minified, split by route  
✓ Caching: Long-lived cache headers (Vercel default)

---

## Environment Variables

**None required** for this portfolio.

If you add features (e.g., contact form API), you may need:
- `NEXT_PUBLIC_FORM_ENDPOINT` (for Formspree endpoint)
- `DATABASE_URL` (if adding backend)

These go in `.env.local` (local) or Vercel Settings → Environment Variables (production).

---

## Monitoring & Logs

### Vercel

- **Dashboard**: [https://vercel.com/dashboard](https://vercel.com/dashboard)
- **Deployments**: All pushes listed with status + preview URLs
- **Logs**: Click deployment → Function Logs (any errors during build/runtime)

### Self-Hosted

```bash
# Docker logs
docker logs <container-id>

# Kubernetes logs
kubectl logs <pod-name>

# Server SSH
ssh user@server
tail -f /var/log/portfolio.log
```

---

## Continuous Deployment (CI/CD)

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@v4
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

Then set secrets in GitHub Settings → Secrets and Variables:
- `VERCEL_TOKEN`: Get from Vercel Settings → Tokens
- `VERCEL_ORG_ID`: From Vercel dashboard
- `VERCEL_PROJECT_ID`: From Vercel project settings

---

## Rollback

### Vercel

1. Go to Deployments tab
2. Click an older successful deployment
3. Click "Redeploy" button
4. Automatic rollback in < 1 minute

### Git-Based Rollback

```bash
# Revert commit
git revert <commit-hash>
git push origin main

# Automatic redeployment starts
```

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild locally
rm -rf .next node_modules
npm ci
npm run build
```

### Deployment Hangs

- Check GitHub Actions logs
- Check Vercel deployment logs
- Ensure `package.json` scripts are correct
- Verify environment variables if any

### Performance Issues

- Run `npm run build` locally and check output size
- Check Vercel analytics (performance dashboard)
- Profile with Lighthouse (`npm run build`, then serve from `out/`)

---

## Deployment Checklist

Before deploying to production:

- [ ] All commits pushed to `main`
- [ ] `npm run lint` passes (no errors)
- [ ] `npx tsc --noEmit` passes (no type errors)
- [ ] `npm run build` succeeds
- [ ] Tested locally (`npm run dev`)
- [ ] Metadata updated in `app/layout.tsx` (title, description)
- [ ] Favicon verified in `public/`
- [ ] Social links verified (GitHub, LinkedIn, email)
- [ ] Contact form endpoint configured (if applicable)
- [ ] Custom domain DNS configured (if applicable)

---

## Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Docker Deployment](https://docs.docker.com/)
- [GitHub Pages Docs](https://pages.github.com/)

---

**Current Status**: ✅ Ready to deploy to Vercel

Next step: Connect repository to Vercel account at [https://vercel.com/new](https://vercel.com/new)
