# MindShift account-deletion support runbook

Status: draft. This runbook is not approved for production use.

The public deletion form starts a support-assisted request for people who cannot use MindShift's authenticated in-app
flow. An email address or provider selection is not proof of account ownership and must never be treated as an
authoritative account identifier.

## Required decisions before launch

- **TODO — owner:** name the person or on-call role accountable for deletion requests and escalations.
- **TODO — inbox:** identify the monitored Formspree form/inbox, access controls, backup owner, and alerting.
- **TODO — retention:** approve how long request emails, verification evidence, and completion records are retained,
  then align the public Privacy Policy and provider configuration.
- **TODO — legal approval:** obtain human/legal approval for the request, verification, retention, confirmation, and
  Apple/store guidance before publishing the route.
- **TODO — fulfillment:** define a protected operator mechanism that completes the same server-side deletion contract
  as the authenticated app flow. Do not delete by editing tables or accepting an email as a user ID.

## Draft handling procedure

1. Confirm the message is an account-deletion request from the dedicated web form.
2. Record only the minimum operational state needed to avoid losing or duplicating the request.
3. Acknowledge receipt through the monitored support channel. Never request a password, provider authorization code,
   access token, refresh token, or internal user ID.
4. Verify account ownership using the approved method from the TODO above. If ownership cannot be verified, pause and
   escalate; do not delete data.
5. Remind the requester that deleting MindShift does not cancel or refund an Apple or Google subscription.
6. Run the approved protected fulfillment process. It must remove the Supabase Auth account last, cascade
   account-bound synced data, delete the RevenueCat customer, and report Apple revocation follow-up consistently with
   the in-app contract.
7. Confirm completion without including provider identifiers or other internal data. Include store-cancellation and
   manual Sign in with Apple instructions when applicable.
8. Remove or retain request records only under the approved retention decision.

## Failure and escalation

- A provider failure must not be reported as completed deletion.
- A RevenueCat deletion failure leaves the account available for retry under the backend contract.
- An Apple manual-revocation result does not block account deletion, but the requester must receive the official Apple
  follow-up instructions.
- Suspected impersonation, unusual request volume, or accidental disclosure must be escalated to the TODO owner.

## Pre-launch evidence

- [ ] Formspree production configuration accepts the request and sends a confirmation without exposing secrets.
- [ ] The primary and backup owners receive a test request.
- [ ] Ownership verification is completed against a test account.
- [ ] The protected fulfillment path deletes that account and its account-bound data.
- [ ] Store subscription and Apple manual-revocation guidance is included where applicable.
- [ ] Retention and legal TODOs above are resolved and reflected in the public policy.
- [ ] The exact deployed account-deletion URL passes a browser smoke test.
