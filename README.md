## Nx Examples

This is a Nx monorepo example project demonstrating a full-stack e-commerce application with multiple frameworks. It features a product storefront built with Angular and a shopping cart experience built with React. The project is deployed on Netlify and uses GitHub Actions for CI/CD workflows. It showcases best practices for managing shared UI components and utilities across different frontend frameworks within a single workspace.

### Main Function Points
- Dual-app architecture: Angular-based products storefront and React-based cart application
- Shared libraries for UI components and utilities across different frameworks
- E2E testing with Playwright for both applications
- GitHub Actions CI/CD pipeline for automated testing and deployment
- Local development with hot-reload support for individual apps
- Workspace dependency graph visualization and affected commands
- Production deployment to Netlify with automated builds

### Technology Stack
- **Build Tool**: Nx monorepo framework
- **Frontend**: Angular (products app), React (cart app)
- **Testing**: Jest (unit tests), Playwright (E2E tests)
- **Code Quality**: ESLint, Prettier, TypeScript
- **Package Manager**: Yarn
- **Styling**: Tailwind CSS, SCSS
- **CI/CD**: GitHub Actions
- **Deployment**: Netlify
- **Languages**: TypeScript (73.8%), JavaScript (18.6%), HTML (4.1%), SCSS (3.5%)

### License
No license information specified in the repository

=================

Production
----------
- Home: https://nx-example-clone.netlify.app/
- Cart products: https://nx-example-clone.netlify.app/cart

Apps
----
- `products`: Angular storefront home page.
- `cart`: React cart experience.
- Shared UI and utilities live in `libs/`.

Getting Started
---------------
1) Install: `yarn install`
2) Develop (default project = products): `yarn start`
3) Serve specific apps:
   - Products: `yarn dev:products`
   - Cart: `yarn dev:cart`

Useful Commands
---------------
- Build all: `yarn build:all`
- Unit tests: `yarn test`
- Lint: `yarn lint`
- Type check (all): `yarn typecheck`
- Format write/check: `yarn format:write` / `yarn format:check`
- E2E (Playwright): `yarn e2e`
- Dep graph (workspace): `yarn dep-graph`
- Affected graph: `yarn affected:graph`
- Affected targets: `yarn affected:test` | `yarn affected:lint` | `yarn affected:build` | `yarn affected:e2e`
- Nx help: `yarn help`

Docker
------
- Run both apps in containers: `docker compose up -d`
- Rebuild after dependency changes: `docker compose up -d --build`
- Stop and remove containers: `docker compose down`
- Reset containers + node_modules volume: `docker compose down -v`

CI & Deployment
---------------
- Nx targets run via GitHub Actions (`.github/workflows/ci.yml`).
- Production deploys to Netlify using `netlify.toml`.

Notes
-----
- `apps/*-e2e` hold Playwright suites for each app.
- `yarn start:local-deploy` builds both apps and serves the deploy bundle locally.
