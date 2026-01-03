Nx Examples
=================

Production
----------
- Home: https://nx-example-clone.netlify.app/
- Cart products: https://nx-example-clone.netlify.app/cart/index.html

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

CI & Deployment
---------------
- Nx targets run via GitHub Actions (`.github/workflows/ci.yml`).
- Production deploys to Netlify using `netlify.toml`.

Notes
-----
- `apps/*-e2e` hold Playwright suites for each app.
- `yarn start:local-deploy` builds both apps and serves the deploy bundle locally.
