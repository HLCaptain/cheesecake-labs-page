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

## Account deletion

The public `/#/mindshift/delete-account` route documents the authenticated in-app deletion flow and lets users who no
longer have the App start a support-assisted request through the configured MindShift Formspree form. Support must
verify account ownership before fulfilling a web request and must never ask for a password or provider authorization
code.

The production support procedure remains a draft in
[`docs/account-deletion-support-runbook.md`](docs/account-deletion-support-runbook.md). Its owner, monitored inbox,
retention, fulfillment mechanism, and legal approval TODOs must be resolved before launch.
