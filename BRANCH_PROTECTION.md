# Branch Protection Policy

This document outlines recommended branch protection rules for the `main` branch to ensure code quality and prevent accidental breakage.

## Why Branch Protection?

- Prevents direct pushes to `main` (all changes go through PR review)
- Ensures all code is tested before merging
- Maintains commit history integrity
- Enforces consistent contribution workflow

## Recommended `main` Branch Rules

To enable, go to **Repository Settings → Branches → Add Rule → Match the branch name `main`**:

### ✅ Required Rules

#### 1. **Require pull request reviews before merging**
- **Minimum reviewers**: 1
- **Dismiss stale PR approvals**: ✓ (checked)
- **Require review from code owners**: ✓ (checked, if CODEOWNERS file exists)

**Why**: Catches issues before merge, ensures another set of eyes on changes.

---

#### 2. **Require status checks to pass before merging**
Status checks to require:
- `ESLint`
- `TypeScript`
- `Next.js Build`

**Why**: Ensures code builds, lints cleanly, and passes type checks.

> **Note**: Status checks are auto-populated by CI/CD (GitHub Actions). Currently none are configured—if you add CI (GitHub Actions workflow), the checks will appear here automatically.

---

#### 3. **Require branches to be up to date before merging**
- ✓ (checked)

**Why**: Prevents merging stale branches that may conflict with recent changes to `main`.

---

#### 4. **Require code owner approvals**
- ✓ (checked, if `.github/CODEOWNERS` exists)

**Why**: Ensures domain experts review relevant code changes.

### ✅ Recommended (But Not Required)

#### 5. **Require signed commits**
- ✗ (not required, for dev-only repos)
- ✓ (recommended for production repos with security compliance)

---

#### 6. **Include administrators**
- ✓ (checked, so admins also follow rules)

**Why**: Prevents accidental direct pushes by maintainers.

---

#### 7. **Restrict who can push**
- ✓ (checked, limits pushes to admins only)

**Why**: Prevents accidental pushes by contributors.

---

#### 8. **Allow auto-merge**
- ✓ (optional, convenience for CI-verified PRs)

**Why**: Auto-merges when all checks pass (useful for automated updates).

---

## Setup Instructions

1. Go to **[https://github.com/shahdantrader/portfolio/settings/branches](https://github.com/shahdantrader/portfolio/settings/branches)**
2. Click **"Add rule"**
3. In "Branch name pattern", enter: `main`
4. Check the following:
   - ☑ Require a pull request before merging
     - ☑ Require approvals (1)
     - ☑ Dismiss stale pull request approvals when new commits are pushed
     - ☑ Require review from Code Owners
   - ☑ Require status checks to pass before merging
     - ☑ Require branches to be up to date before merging
   - ☑ Require code owner reviews
   - ☑ Include administrators in restrictions
5. Click **"Create"**

## CI/CD Setup (Optional But Recommended)

Once branch protection is enabled, you should set up GitHub Actions to run:
- `npm run lint` (ESLint)
- `npx tsc --noEmit` (TypeScript)
- `npm run build` (Next.js build)

### Example: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, claude/**]
  pull_request:
    branches: [main]

jobs:
  lint-and-build:
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
```

Once this workflow exists, the branch protection rule will automatically require it to pass.

## Code Owners (Optional)

Create `.github/CODEOWNERS` to specify required reviewers by path:

```
# All changes require review
* @shahdantrader

# Component changes need design review
app/components/ @shahdantrader
data/ @shahdantrader
```

This ensures the right people review relevant changes.

## Protecting Other Branches (Optional)

Consider protecting release branches or other important branches:
- `develop`: Staging/testing branch (1 review, require checks)
- `release/*`: Release branches (2 reviews, require all checks)

Same rules as `main`, but adjust reviewer count and strictness based on purpose.

## Bypassing Protection (Admins Only)

If an admin absolutely must bypass protection (emergency):
1. Temporarily dismiss the rule
2. Push directly (with clear commit message explaining why)
3. Re-enable the rule immediately
4. Document the incident

**Avoid this path whenever possible.**

## Conflict Resolution

If a PR has conflicts with `main`:
1. Author resolves conflicts locally
2. Pushes a new commit with resolved conflicts
3. CI re-runs automatically
4. Once green, admin approves and merges

## Review Workflow

1. **Author**: Push feature branch → Create PR
2. **Reviewer**: Read PR, leave comments/approve
3. **Author**: Address feedback, push new commits
4. **CI**: Auto-runs on every push (no manual trigger)
5. **Admin**: Merges once approved + all checks green

## Monitoring

Periodically review:
- **Branch protection settings**: Ensure rules haven't been accidentally disabled
- **PR merge history**: Verify all merges are via PR (no direct pushes)
- **CI pass rate**: Monitor for flaky tests or infrastructure issues

Check at: **Settings → Branches → View all rules**

---

**Questions?** See [CONTRIBUTING.md](CONTRIBUTING.md) for the PR workflow, or [DEVELOPMENT.md](DEVELOPMENT.md) for local testing.
