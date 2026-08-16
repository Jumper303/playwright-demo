# playwright-demo

Test Automation Demo with Playwright

This project is created for demonstration purpose to present test automation solutions with Playwright

The project contains simplified solutions according to the given examples.

Real life projects may differ according to the project, complexity, security, scalability needs.

Current solution uses stored login credentials, this is used only for demonstration purpose.

Real life scenario should use secrets defined via environment variables in CI/.env.

Readonly tests could use single setup to authenticate and use prepared storage state.

Available projects (each project define it's own baseUrl and test directory)

- sauce
- rich-text-editor
- demo-guru
- api-testing

Usage
npm install -g pnpm && pnpm install
pnpm exec playwright install --with-deps
pnpm run test
