---
name: Theme Sync → Downstream
on:
  push:
    branches: [main]
    paths:
      - 'index.ts'
      - 'components/**'
      - 'styles/**'
      - 'lib/**'
      - 'package.json'
safe-outputs:
  github-token: ${{ secrets.GH_AW_CROSS_REPO_PAT }}
  create-pull-request:
    max: 2
    title-prefix: "[theme-sync] "
    labels: [auto-sync, dependency-update]
    draft: true
---

# Theme Sync → Downstream Repos

You are syncing theme updates from `fuww/starlight-plugin-theme` to its downstream consumers: `fuww/about` and `fuww/developer`.

## Context

- **fuww/about** uses a floating GitHub dependency: `"starlight-plugin-theme": "github:fuww/starlight-plugin-theme"` — needs `bun install` to refresh the lockfile
- **fuww/developer** uses a pinned tag: `"starlight-plugin-theme": "github:fuww/starlight-plugin-theme#v0.1.0"` — needs version pin update if a new tag exists, then `bun install`

## Task

1. **Analyze the triggering commit** to understand what changed in the theme:
   - Component changes (`components/**`)
   - Style changes (`styles/**`)
   - Library/utility changes (`lib/**`)
   - Entry point changes (`index.ts`)
   - Dependency changes (`package.json`)

2. **Check for breaking changes**: Look for renamed exports, removed components, changed props/interfaces, or major dependency bumps.

3. **For fuww/about** (floating dep):
   - Clone/checkout the repo
   - Run `bun install` to refresh the lockfile with the latest commit
   - If `bun install` succeeds, create a draft PR with the updated lockfile
   - If it fails, report the error in the PR description

4. **For fuww/developer** (pinned dep):
   - Check if a new tag/release exists on `fuww/starlight-plugin-theme`
   - If a new tag exists, update the version pin in `package.json` (e.g., `#v0.1.0` → `#v0.2.0`)
   - Run `bun install` to update the lockfile
   - Create a draft PR with both `package.json` and lockfile changes
   - If no new tag exists, still run `bun install` and create a PR if the lockfile changes

5. **PR descriptions should include**:
   - Summary of upstream theme changes
   - Whether changes are breaking or additive
   - Any manual steps needed (e.g., updating component usage if props changed)
   - Link to the triggering commit in `fuww/starlight-plugin-theme`
