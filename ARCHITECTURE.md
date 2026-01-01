# Enterprise App Architecture

Overview
- Host (main shell / host-app): responsible for routing, global providers, microfrontend loading (module federation), and top-level orchestration.
- Auth (auth-app): microfrontend or package that provides authentication flows, login, token storage, and AuthProvider.
- Main apps (main-app / utility-app / others): feature apps and UI libraries that expose components via module federation.
- Shared UI (libs/shared-ui): design-system primitives (Button, Card, Modal, Tokens) consumed by apps; published as a workspace package or exposed via federation.

Principles
- Single source-of-truth for design tokens and shared types.
- Small, focused apps: each responsibility isolated (auth, host, UI lib).
- Type-safe contracts: use TypeScript interfaces and federated type declarations for runtime component contracts.
- Workspace packages: prefer a monorepo layout with npm workspaces for dependency sharing and simpler imports.
- Well-defined public API: each app/library exposes a clear index barrel and type exports.
- CI-friendly: build/test each package independently; host composes microfrontends in CI preview.

Suggested Layout
- apps/
  - host-app/                # Host shell, top-level layout, and route mounting
  - auth-app/                # Authentication microfrontend (login, callback, provider)
  - main-app/                # Example feature application (dashboard)
  - utility-app/             # UI primitives exposed via federation
- libs/                      # Local libraries
  - shared-ui/               # Design system / components and tokens
  - shared-types/            # Single source for TypeScript shared types (optional)

Deployment & Federation
- Host loads remotes via module federation with environment-aware URLs.
- Each microfrontend serves an independent bundle and publishes a `remoteEntry.js`.
- Use consistent publicPath and assetsDir in Vite configs.

Security & Auth
- Keep token storage in host or auth microfrontend; prefer HttpOnly cookies if backend supports it.
- AuthProvider should expose hooks `useAuth()` and HOCs for protecting routes.

Observability
- Each app should include basic logging and metrics hooks; centralize KPI reporting in host app.

Examples & Scaffolding
Below are scaffolding files in this repo under `apps/` and `libs/` to bootstrap the structure.
