# Submission email notifications

> These guides describe the current supported contracts. The [package inventory](packages.md)
> records verified published versions; newer source changes do not imply package publication
> or acceptance of your configured services. Check installed declarations and the selected
> environment's authenticated API documentation before using an operation.

Submission email is an optional tenant/environment platform capability. Forms declare
an `emailField` and optional `emailCopy` confirmation/notification wording. The platform
verifies contact ownership, sends notifications, and exposes sending status and manual
retry; consumer apps own their form fields, labels, and copy.

## Setup

In **Services → Submission email**, enable the service and configure a verified sender,
the site's existing notification inbox, and a Resend sending API key. Blank keys preserve
the saved key or reuse a matching contact service key. Verify sender DNS with the provider.
No receiving subdomain, MX change, inbound webhook, scheduler, or email worker is needed.
Settings and credentials are isolated by tenant and environment.

## Submission and replies

A successful submission creates two notification receipts and attempts both sends
in the existing request. The seller receives confirmation with the site inbox
as Reply-To. The site inbox receives labeled submission details and private submission
photos as attachments, with the seller as Reply-To. Subjects include the form title and
reference. Form `emailCopy` supplies each introductory paragraph.

Staff reply from their ordinary email app; replies go directly to the seller. Sellers'
replies return to the staff sender address. The platform does not receive, match, store,
or forward replies. Conversation history lives in the mailbox. Admin review messages
remain site status history and do not send email.

Sending failure does not roll back a saved submission. **Submissions → Check email delivery**
shows pending, sending, sent (provider accepted), failed, or uncertain receipts. Admins can
send pending/failed notifications immediately using **Send unsent email**. There are no
scheduled retries. Simultaneous sends claim the same row atomically; stable idempotency
keys and frozen routing prevent duplicate or misdirected sends. Unknown outcomes and
stalled sends require provider reconciliation; attempts beyond the provider's safe retry
window are held rather than blindly resent. Status is sending acceptance, not evidence
of arrival in a real inbox; no delivery webhooks are configured.

Authenticated customers can verify a changed contact email with a short-lived code sent
directly through the same sending service. Verified Google/Facebook identity email also
qualifies. Phone is independent and optional for consumers that omit `phoneField`.
Existing drafts can be explicitly upgraded; submitted records retain their original form.

## Acceptance and deferred work

Validate the configured sign-in provider and contact-email verification, seller
confirmation, staff notification with photos,
normal mobile-inbox replies in both directions, sending failure, manual retry, tenant
isolation, and duplicate-submission behavior before activation. Mock/local checks do not
prove provider or inbox acceptance. Production requires separate authorization.

An in-platform conversation inbox and scheduled email retries are outside the current service.
