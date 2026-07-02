# Memory Index

- [Monorepo typecheck build order](monorepo-typecheck.md) — always run root `pnpm run typecheck:libs` (tsc --build) before per-package `tsc --noEmit`, or lib/db & lib/api-zod show stale TS6305 dist errors.
