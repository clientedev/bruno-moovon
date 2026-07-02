---
name: Monorepo typecheck build order
description: How to typecheck this pnpm workspace without false TS6305 dist errors
---

Running `npx tsc --noEmit -p .` directly inside `artifacts/api-server` (or any package that has `references` to `lib/db`, `lib/api-zod`, etc.) can show spurious `TS6305: Output file ... has not been built from source file ...` errors if those referenced libs' `dist/` output is stale or missing.

**Why:** TypeScript project references resolve to the referenced project's compiled `.d.ts` output, not its source. If that dist is out of date or absent, tsc reports it as an error even though the actual code is fine.

**How to apply:** Before typechecking a single package, run the root script `pnpm run typecheck:libs` (which runs `tsc --build` across `lib/*`) to rebuild/refresh the referenced libs' dist output. Then per-package `tsc --noEmit -p .` (or the root `pnpm run typecheck`) will give accurate results.
