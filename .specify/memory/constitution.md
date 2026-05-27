<!--
SYNC IMPACT REPORT
==================
Version: 0.0.0 → 1.0.0 (MAJOR: Initial constitution ratification)
Date: 2025-05-27

New Constitution: Literka Angular Monorepo Governance
- 5 core principles established
- Governance model defined
- No prior version to compare

Templates updated:
  ✅ plan-template.md - Constitution Check gate implemented
  ✅ spec-template.md - Aligned with specification scope
  ✅ tasks-template.md - Task categorization reflects principles
  ⚠️  Follow-up: Review .specify/templates/commands/*.md for any agent-specific guidance

Deferred items: None
-->

# Literka Constitution

The Literka project is an Angular-based monorepo managed by Nx. This constitution establishes governance principles that ensure code quality, maintainability, and consistency across the entire workspace.

## Core Principles

### I. Component Library First

All user-facing functionality MUST originate as reusable components in the `@literka/ui` package. The UI library is the single source of truth for component design and behavior. Applications (`/apps/*`) consume from the library; they do not define new components. This ensures consistency, testability, and reusability across the monorepo.

**Non-Negotiable Rules**:

- No component duplication across apps
- All component tests written and passing before app integration
- Breaking changes to library components require migration planning
- Clear documentation for component contracts (inputs, outputs, events)

**Rationale**: Centralizing components prevents fragmentation, reduces maintenance burden, and enables scaled feature development across multiple applications.

---

### II. Modular Architecture with Clear Boundaries

The monorepo enforces strict module boundaries: `packages/*` contain reusable libraries; `apps/*` contain applications. Each package MUST have:

- A clear, single responsibility defined in its `README.md`
- Explicit `project.json` with `tags` identifying its category (e.g., `scope:ui`, `scope:shared`)
- Dependencies declared in `package.json` without circular references
- ESLint configuration enforcing module isolation

**Non-Negotiable Rules**:

- Nx `nx graph` output MUST be acyclic; circular dependencies cause immediate blocker status
- Cross-package imports use workspace paths (`@literka/*`); no relative imports between packages
- Applications depend only on packages; packages may depend on other packages
- Each package/app must declare its public API in `src/index.ts`

**Rationale**: Clear boundaries enable parallel development, reduce cognitive load, and facilitate testing and deployment at module granularity.

---

### III. Quality Gates (NON-NEGOTIABLE)

All code MUST pass quality checks before merge. No exceptions. The quality gate pipeline:

1. **ESLint** (`nx run <project>:lint`) - Code style and best practices
2. **Prettier** (enforce via ESLint) - Formatting consistency
3. **Type Checking** (`tsc --noEmit`) - TypeScript strict mode, zero implicit any
4. **Unit Tests** (`nx run <project>:test`) - All business logic covered, >80% coverage
5. **E2E Tests** (for apps) - Critical user flows verified

Failures in any stage block PR merge. Each project's `project.json` defines targets for these checks; they run via `nx run-many --target=<check>` for all affected projects.

**Non-Negotiable Rules**:

- Type errors are treated as build failures (no `any` casts to hide issues)
- Linting rules configured per-project; deviations require explicit documentation
- Test coverage monitored; declining coverage blocks PR
- Prettier formatting applied at commit time (pre-commit hook) or rejected at CI

**Rationale**: Automated gates prevent regressions, maintain consistency, and reduce manual review burden. They shift error detection left in the development cycle.

---

### IV. Testing Discipline: Unit + Integration Coverage

Features are considered complete only when independently testable at multiple levels. Testing is organized by scope:

**Unit Tests** (`src/**/*.spec.ts`): Test single components or services in isolation using Angular TestBed or direct function calls. Every export in `src/index.ts` must have at least one unit test.

**Integration Tests** (Cypress e2e for apps): Test user workflows across components and services. Critical paths are e2e tested; non-critical secondary flows may rely on unit test coverage.

**Test Organization**:

- Unit tests colocated with source: `src/lib/component/component.spec.ts`
- E2E tests in `apps/<app>-e2e/src/e2e/`
- Test data fixtures in `apps/<app>-e2e/src/fixtures/`

**Non-Negotiable Rules**:

- New features without tests are rejected at PR review
- Existing tests that fail due to refactoring MUST be updated (never deleted)
- Mock external dependencies; integration tests only touch controlled services
- Test names describe the behavior being verified, not the implementation

**Rationale**: Comprehensive testing at both levels provides confidence in refactoring, enables safe dependency updates, and serves as executable documentation for component contracts.

---

### V. TypeScript Strict Mode & Type Safety

All code must be written with TypeScript `strict: true` enabled in `tsconfig.json`. Type safety is non-negotiable and enforces clear contracts across module boundaries.

**Non-Negotiable Rules**:

- No `any` type; use `unknown` if truly unknown, then narrow
- Explicit return types on all exported functions and component methods
- No implicit `any` in function parameters or component properties
- Generic types parameterized where polymorphism is needed

**Configuration**:

- Root `tsconfig.base.json` sets `strict: true` for entire workspace
- Project-specific `tsconfig.lib.json` and `tsconfig.app.json` inherit and may extend (not relax) strictness
- Build failures on type errors (no `skipLibCheck` bypass without explicit justification in PR)

**Rationale**: Strict typing prevents runtime errors, improves IDE tooling support, and makes refactoring safe across the monorepo.

---

## Development Workflow

### Version Management

The Literka monorepo uses **semantic versioning (SemVer)** for all packages and applications:

- **MAJOR**: Breaking API changes, component contract changes, major feature removals
- **MINOR**: New features, non-breaking enhancements
- **PATCH**: Bug fixes, documentation updates, internal refactors

Version bumps are managed via `nx release` (or manual `package.json` updates if `nx release` is not yet configured). Changelog entries are required for MINOR and MAJOR bumps.

### Dependency Management

- **Nx workspace dependencies** are managed by the root `package.json` and `pnpm-lock.yaml` (or equivalent lock file)
- **Package-specific exports** are declared in `src/index.ts` and `ng-package.json` (for `@literka/ui`)
- **Breaking changes** to shared types must be reviewed by all dependents; a migration guide is required
- **Peer dependencies** are explicit; do not assume transitive dependency inclusion

### Code Review Process

All changes require review by at least one maintainer before merge. Reviewers verify:

1. Compliance with this constitution (principles, quality gates)
2. Test coverage for new features (>80% target)
3. Clear component contracts and documentation updates
4. No circular dependencies introduced
5. Commit messages follow conventional commit format: `type(scope): subject`

---

## Governance

### Constitution Authority

This constitution supersedes all other development practices and documentation in the Literka project. In case of conflict between this document and any other guide, this constitution is the source of truth.

### Amendment Process

Amendments to this constitution require:

1. **Written Proposal**: Submitted as a GitHub issue or PR with rationale and impact analysis
2. **Discussion Period**: Minimum 3 business days for team feedback
3. **Consensus Decision**: Agreed by project maintainers (unanimous preferred; majority sufficient if no objection)
4. **Version Bump**: Documented in constitution file with date and change summary
5. **Communication**: All team members notified of changes; training provided if needed

### Compliance Review

- **Quarterly**: Spot-check random PRs for constitution compliance; report findings to team
- **Per PR**: Automated CI checks enforce quality gates; manual review verifies principle adherence
- **On Refactor**: When refactoring modules, explicitly verify boundary compliance and dependency graph

### Deviations

Deliberate deviations from this constitution require:

- **Written Exception Request**: Posted in PR or issue with explicit justification
- **Documented Expiry**: Exception is time-bound (e.g., "until Q3 2025") or task-bound (e.g., "until dependency X is upgraded")
- **Follow-up Plan**: Next steps to come into compliance are documented

---

## Runtime Guidance

For day-to-day development guidance that operationalizes these principles, see [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md) (AI-assisted development) and individual `README.md` files in packages and apps.

---

**Version**: 1.0.0 | **Ratified**: 2025-05-27 | **Last Amended**: 2025-05-27
