# Copilot instructions for literka

## Quick commands

- Install dependencies: npm install
- Start dev server (web): npx nx serve web
- Build (production): npx nx build web --configuration=production
- Run unit tests for a project: npx nx test <project>
- Run a single test (by name/pattern): npx nx test <project> --testNamePattern="<pattern>"
  - Alternatively run the underlying runner (Vitest) directly: npx vitest -t "<pattern>"
- Run linters: npx nx lint <project>
- List available targets for a project: npx nx show project <project>

## High-level architecture

- This is an Nx monorepo (nx 22.x) hosting an Angular app named `web` under `apps/web` and an E2E project under `apps/web-e2e`.
- Angular CLI / @angular/build is used for building and serving. Unit tests use `vitest-angular`; e2e tests use Cypress.
- Shared code lives in `libs/` (if present). Build outputs go to `dist/` (e.g., `dist/apps/web`).
- Styles use SCSS. Projects are generated with `@nx/angular` (standalone components by default per generators).
- Nx target caching and the workspace schema (nx.json) control inputs/outputs and default configurations.

## Key conventions and patterns

- Use Nx project targets (project.json) for tasks: run `npx nx <target> <project>` rather than calling tool CLIs directly when possible.
- Unit test runner: `vitest-angular`. Pass test-runner flags through NX (see single-test example above) or invoke `vitest` from the repo root.
- Linting: ESLint configuration is workspace-level (eslint.config.mjs). Prefer `npx nx lint <project>`.
- SCSS is the canonical styling choice across apps/libs.
- Use `npx nx g` (Nx generators) to add apps/libs to keep project.json and workspace wiring correct.
- Project-specific overrides (production/development) live in the project `configurations` (see `apps/web/project.json`). Use `--configuration` when needed.s

## Useful tips for Copilot sessions

- Prefer NX commands for running, building, linting and testing; calling `npx nx show project <project>` gives authoritative available targets and options.
- If a target behaves unexpectedly, inspect the corresponding `project.json` in the project root (e.g., `apps/web/project.json`).

---

If you'd like, update this file to include any project-specific scripts, CI steps, or additional agent rules (CLAUDE.md / AGENTS.md).
