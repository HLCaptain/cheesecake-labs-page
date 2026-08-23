# cheesecake-labs-page
Website of CheeseCake Labs.

## Validation

```bash
npm ci
npm run build
npm run test:e2e:install
npm run test:e2e
```

Pull requests run the same build and browser checks used before deployment.
Pushes to `main` deploy the verified `dist` artifact without rebuilding it.
