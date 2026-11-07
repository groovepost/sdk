# Operation and MCP tool reference

Generated from published SDK 0.6.6 and MCP 0.7.5. Do not edit by hand.
Run `npm run reference:generate` with registry read access to refresh.

[Operation schemas](/operations.json) and [stdio MCP tool schemas](/mcp-tools.json)
include complete JSON input schemas. Hosted MCP adds request-specific scope; use its
`tools/list` for authoritative hosted inputs. Responses are described by the installed SDK
declarations and selected host OpenAPI; binary generic results use `{mimeType,dataBase64}`.

Use SDK `operations.invoke(name, input)`, CLI `api NAME INPUT.json` or the listed MCP tool.
Tenant-scoped operations require a selected tenant/environment; mutation authorization remains server-enforced.

## Registered REST operations

| Operation | Method and path | Permission | Tenant scope | MCP tool |
| --- | --- | --- | --- | --- |
| `app_deployment_delete` | `DELETE /apps/{slug}/{environment}/deployments/{id}` | owner-or-admin | Required | `api_app_deployment_delete` |
| `app_deployment_upload` | `PUT /apps/{slug}/{environment}/deployments/{id}/package` | owner-or-admin | Required | `api_app_deployment_upload` |
| `app_deployment_cleanup` | `POST /apps/{slug}/{environment}/deployments/cleanup` | owner-or-admin | Required | `api_app_deployment_cleanup` |
| `app_deployment_create` | `POST /apps/{slug}/{environment}/deployments` | owner-or-admin | Required | `api_app_deployment_create` |
| `app_deployment_complete` | `POST /apps/{slug}/{environment}/deployments/{id}/complete` | owner-or-admin | Required | `api_app_deployment_complete` |
| `app_composition_read` | `GET /apps/{slug}/{environment}/composition` | owner-or-admin | Required | `api_app_composition_read` |
| `app_composition_save` | `PUT /apps/{slug}/{environment}/composition` | owner-or-admin | Required | `api_app_composition_save` |
| `app_composition_catalog` | `GET /apps/{slug}/{environment}/composition/catalog` | owner-or-admin | Required | `api_app_composition_catalog` |
| `app_composition_preview` | `GET /apps/{slug}/{environment}/composition/preview` | owner-or-admin | Required | `api_app_composition_preview` |
| `app_composition_preview_link` | `POST /apps/{slug}/{environment}/composition/preview-link` | owner-or-admin | Required | `api_app_composition_preview_link` |
| `app_composition_package` | `GET /apps/{slug}/{environment}/composition/package` | owner-or-admin | Required | `api_app_composition_package` |
| `app_composition_publish` | `POST /apps/{slug}/{environment}/composition/publish` | owner-or-admin | Required | `api_app_composition_publish` |
| `app_composition_import` | `POST /apps/{slug}/{environment}/composition/import` | owner-or-admin | Required | `api_app_composition_import` |
| `get_site_transfers_tenants_slug` | `GET /site-transfers/tenants/{slug}` | owner-or-admin | Required | `api_get_site_transfers_tenants_slug` |
| `post_site_transfers_tenants_slug_exports` | `POST /site-transfers/tenants/{slug}/exports` | owner-or-admin | Required | `api_post_site_transfers_tenants_slug_exports` |
| `site_json_preview` | `POST /site-transfers/tenants/{slug}/imports/preview` | owner-or-admin | Required | `api_site_json_preview` |
| `site_json_apply` | `POST /site-transfers/tenants/{slug}/imports/apply` | owner-or-admin | Required | `api_site_json_apply` |
| `get_tenants_slug_environments_environment_submissions_settings` | `GET /tenants/{slug}/environments/{environment}/submissions/settings` | owner-or-admin | Required | `api_get_tenants_slug_environments_environment_submissions_settings` |
| `put_tenants_slug_environments_environment_submissions_settings` | `PUT /tenants/{slug}/environments/{environment}/submissions/settings` | owner-or-admin | Required | `api_put_tenants_slug_environments_environment_submissions_settings` |
| `get_tenants_slug_environments_environment_submissions_forms` | `GET /tenants/{slug}/environments/{environment}/submissions/forms` | public | Required | `api_get_tenants_slug_environments_environment_submissions_forms` |
| `post_tenants_slug_environments_environment_submissions_drafts` | `POST /tenants/{slug}/environments/{environment}/submissions/drafts` | customer-session | Required | `api_post_tenants_slug_environments_environment_submissions_drafts` |
| `get_tenants_slug_environments_environment_submissions_drafts` | `GET /tenants/{slug}/environments/{environment}/submissions/drafts` | customer-session | Required | `api_get_tenants_slug_environments_environment_submissions_drafts` |
| `get_tenants_slug_environments_environment_submissions_drafts_id` | `GET /tenants/{slug}/environments/{environment}/submissions/drafts/{id}` | customer-session | Required | `api_get_tenants_slug_environments_environment_submissions_drafts_id` |
| `patch_tenants_slug_environments_environment_submissions_drafts_id` | `PATCH /tenants/{slug}/environments/{environment}/submissions/drafts/{id}` | customer-session | Required | `api_patch_tenants_slug_environments_environment_submissions_drafts_id` |
| `delete_tenants_slug_environments_environment_submissions_drafts_id` | `DELETE /tenants/{slug}/environments/{environment}/submissions/drafts/{id}` | customer-session | Required | `api_delete_tenants_slug_environments_environment_submissions_drafts_id` |
| `post_tenants_slug_environments_environment_submissions_drafts_id_submit` | `POST /tenants/{slug}/environments/{environment}/submissions/drafts/{id}/submit` | customer-session | Required | `api_post_tenants_slug_environments_environment_submissions_drafts_id_submit` |
| `post_tenants_slug_environments_environment_submissions_drafts_id_opt_out` | `POST /tenants/{slug}/environments/{environment}/submissions/drafts/{id}/opt-out` | customer-session | Required | `api_post_tenants_slug_environments_environment_submissions_drafts_id_opt_out` |
| `get_tenants_slug_environments_environment_submissions_draft_conflicts` | `GET /tenants/{slug}/environments/{environment}/submissions/draft-conflicts` | customer-session | Required | `api_get_tenants_slug_environments_environment_submissions_draft_conflicts` |
| `post_tenants_slug_environments_environment_submissions_draft_conflicts` | `POST /tenants/{slug}/environments/{environment}/submissions/draft-conflicts` | customer-session | Required | `api_post_tenants_slug_environments_environment_submissions_draft_conflicts` |
| `get_tenants_slug_environments_environment_submissions_drafts_id_images_slot` | `GET /tenants/{slug}/environments/{environment}/submissions/drafts/{id}/images/{slot}` | customer-session | Required | `api_get_tenants_slug_environments_environment_submissions_drafts_id_images_slot` |
| `post_tenants_slug_environments_environment_submissions_drafts_id_images_slot` | `POST /tenants/{slug}/environments/{environment}/submissions/drafts/{id}/images/{slot}` | customer-session | Required | `api_post_tenants_slug_environments_environment_submissions_drafts_id_images_slot` |
| `get_tenants_slug_environments_environment_submissions_inbox` | `GET /tenants/{slug}/environments/{environment}/submissions/inbox` | owner-or-admin | Required | `api_get_tenants_slug_environments_environment_submissions_inbox` |
| `patch_tenants_slug_environments_environment_submissions_inbox_id` | `PATCH /tenants/{slug}/environments/{environment}/submissions/inbox/{id}` | owner-or-admin | Required | `api_patch_tenants_slug_environments_environment_submissions_inbox_id` |
| `get_tenants_slug_environments_environment_submissions_inbox_id_images_slot` | `GET /tenants/{slug}/environments/{environment}/submissions/inbox/{id}/images/{slot}` | owner-or-admin | Required | `api_get_tenants_slug_environments_environment_submissions_inbox_id_images_slot` |
| `post_tenants_slug_environments_environment_submissions_visit` | `POST /tenants/{slug}/environments/{environment}/submissions/visit` | customer-session | Required | `api_post_tenants_slug_environments_environment_submissions_visit` |
| `post_tenants_slug_environments_environment_submissions_visits` | `POST /tenants/{slug}/environments/{environment}/submissions/visits` | customer-session | Required | `api_post_tenants_slug_environments_environment_submissions_visits` |
| `get_tenants_slug_environments_environment_submissions_analytics` | `GET /tenants/{slug}/environments/{environment}/submissions/analytics` | owner-or-admin | Required | `api_get_tenants_slug_environments_environment_submissions_analytics` |
| `get_tenants_slug_environments_environment_submissions_inbox_id_email_deliveries` | `GET /tenants/{slug}/environments/{environment}/submissions/inbox/{id}/email-deliveries` | owner-or-admin | Required | `api_get_tenants_slug_environments_environment_submissions_inbox_id_email_deliveries` |
| `post_tenants_slug_environments_environment_submissions_email_deliveries_id_retry` | `POST /tenants/{slug}/environments/{environment}/submissions/email-deliveries/{id}/retry` | owner-or-admin | Required | `api_post_tenants_slug_environments_environment_submissions_email_deliveries_id_retry` |
| `post_tenants_slug_environments_environment_submissions_drafts_id_upgrade` | `POST /tenants/{slug}/environments/{environment}/submissions/drafts/{id}/upgrade` | customer-session | Required | `api_post_tenants_slug_environments_environment_submissions_drafts_id_upgrade` |
| `get_tenants_slug_environments_environment_customer_session` | `GET /tenants/{slug}/environments/{environment}/customer/session` | customer-session | Required | `api_get_tenants_slug_environments_environment_customer_session` |
| `post_tenants_slug_environments_environment_customer_sessions` | `POST /tenants/{slug}/environments/{environment}/customer/sessions` | public | Required | `api_post_tenants_slug_environments_environment_customer_sessions` |
| `post_tenants_slug_environments_environment_customer_sessions_adopt` | `POST /tenants/{slug}/environments/{environment}/customer/sessions/adopt` | customer-session | Required | `api_post_tenants_slug_environments_environment_customer_sessions_adopt` |
| `post_tenants_slug_environments_environment_customer_sessions_logout` | `POST /tenants/{slug}/environments/{environment}/customer/sessions/logout` | customer-session | Required | `api_post_tenants_slug_environments_environment_customer_sessions_logout` |
| `post_tenants_slug_environments_environment_customer_verification` | `POST /tenants/{slug}/environments/{environment}/customer/verification` | customer-session | Required | `api_post_tenants_slug_environments_environment_customer_verification` |
| `post_tenants_slug_environments_environment_customer_verification_check` | `POST /tenants/{slug}/environments/{environment}/customer/verification/check` | customer-session | Required | `api_post_tenants_slug_environments_environment_customer_verification_check` |
| `post_tenants_slug_environments_environment_customer_contact_email` | `POST /tenants/{slug}/environments/{environment}/customer/contact-email` | customer-session | Required | `api_post_tenants_slug_environments_environment_customer_contact_email` |
| `get_data_slug_environment_collection` | `GET /data/{slug}/{environment}/{collection}` | declared-data-access | Required | `api_get_data_slug_environment_collection` |
| `get_data_slug_environment_collection_id` | `GET /data/{slug}/{environment}/{collection}/{id}` | declared-data-access | Required | `api_get_data_slug_environment_collection_id` |
| `put_data_slug_environment_collection_id` | `PUT /data/{slug}/{environment}/{collection}/{id}` | declared-data-access | Required | `api_put_data_slug_environment_collection_id` |
| `patch_data_slug_environment_collection_id` | `PATCH /data/{slug}/{environment}/{collection}/{id}` | declared-data-access | Required | `api_patch_data_slug_environment_collection_id` |
| `delete_data_slug_environment_collection_id` | `DELETE /data/{slug}/{environment}/{collection}/{id}` | declared-data-access | Required | `api_delete_data_slug_environment_collection_id` |
| `get_apps_slug_environment_commerce_account_configuration` | `GET /apps/{slug}/{environment}/commerce/account/configuration` | owner-or-admin | Required | `api_get_apps_slug_environment_commerce_account_configuration` |
| `put_apps_slug_environment_commerce_account_configuration` | `PUT /apps/{slug}/{environment}/commerce/account/configuration` | owner-or-admin | Required | `api_put_apps_slug_environment_commerce_account_configuration` |
| `get_apps_slug_environment_commerce_account` | `GET /apps/{slug}/{environment}/commerce/account` | customer-session | Required | `api_get_apps_slug_environment_commerce_account` |
| `post_apps_slug_environment_commerce_account_connect` | `POST /apps/{slug}/{environment}/commerce/account/connect` | customer-session | Required | `api_post_apps_slug_environment_commerce_account_connect` |
| `post_apps_slug_environment_commerce_account_disconnect` | `POST /apps/{slug}/{environment}/commerce/account/disconnect` | customer-session | Required | `api_post_apps_slug_environment_commerce_account_disconnect` |
| `get_apps_slug_environment_commerce_orders` | `GET /apps/{slug}/{environment}/commerce/orders` | customer-session | Required | `api_get_apps_slug_environment_commerce_orders` |
| `get_apps_slug_environment_commerce_order` | `GET /apps/{slug}/{environment}/commerce/order` | customer-session | Required | `api_get_apps_slug_environment_commerce_order` |
| `put_apps_slug_environment_commerce_connection` | `PUT /apps/{slug}/{environment}/commerce/connection` | owner-or-admin | Required | `api_put_apps_slug_environment_commerce_connection` |
| `get_apps_slug_environment_commerce_products` | `GET /apps/{slug}/{environment}/commerce/products` | public | Required | `api_get_apps_slug_environment_commerce_products` |
| `get_apps_slug_environment_commerce_product` | `GET /apps/{slug}/{environment}/commerce/product` | public | Required | `api_get_apps_slug_environment_commerce_product` |
| `get_apps_slug_environment_commerce_cart` | `GET /apps/{slug}/{environment}/commerce/cart` | public | Required | `api_get_apps_slug_environment_commerce_cart` |
| `post_apps_slug_environment_commerce_cart` | `POST /apps/{slug}/{environment}/commerce/cart` | public | Required | `api_post_apps_slug_environment_commerce_cart` |
| `post_apps_slug_environment_commerce_checkout` | `POST /apps/{slug}/{environment}/commerce/checkout` | public | Required | `api_post_apps_slug_environment_commerce_checkout` |
| `get_me_tenants_slug_developer_settings` | `GET /me/tenants/{slug}/developer-settings` | member | Required | `api_get_me_tenants_slug_developer_settings` |
| `get_identity_tenants_slug_identity_users` | `GET /identity/tenants/{slug}/identity/users` | owner-or-admin | Required | `api_get_identity_tenants_slug_identity_users` |
| `put_identity_tenants_slug_identity_users_id_suspension` | `PUT /identity/tenants/{slug}/identity/users/{id}/suspension` | owner-or-admin | Required | `api_put_identity_tenants_slug_identity_users_id_suspension` |
| `get_services_newsletter_destinations` | `GET /services/newsletter-destinations` | member | Required | `api_get_services_newsletter_destinations` |
| `get_services_slug_connections` | `GET /services/{slug}/connections` | owner-or-admin | Required | `api_get_services_slug_connections` |
| `patch_services_slug_connections` | `PATCH /services/{slug}/connections` | owner-or-admin | Required | `api_patch_services_slug_connections` |
| `post_services_slug_messaging_sms` | `POST /services/{slug}/messaging/sms` | owner-or-admin | Required | `api_post_services_slug_messaging_sms` |
| `post_services_slug_connections_twilio_check` | `POST /services/{slug}/connections/twilio/check` | owner-or-admin | Required | `api_post_services_slug_connections_twilio_check` |
| `get_services_slug_newsletter` | `GET /services/{slug}/newsletter` | owner-or-admin | Required | `api_get_services_slug_newsletter` |
| `put_services_slug_newsletter_connections_id` | `PUT /services/{slug}/newsletter/connections/{id}` | owner-or-admin | Required | `api_put_services_slug_newsletter_connections_id` |
| `get_services_slug_newsletter_connections_id_groups` | `GET /services/{slug}/newsletter/connections/{id}/groups` | owner-or-admin | Required | `api_get_services_slug_newsletter_connections_id_groups` |
| `put_services_slug_newsletter_destinations_id` | `PUT /services/{slug}/newsletter/destinations/{id}` | owner-or-admin | Required | `api_put_services_slug_newsletter_destinations_id` |
| `get_services_slug_advertising` | `GET /services/{slug}/advertising` | owner-or-admin | Required | `api_get_services_slug_advertising` |
| `put_services_slug_advertising` | `PUT /services/{slug}/advertising` | owner-or-admin | Required | `api_put_services_slug_advertising` |
| `get_services_slug_submission_email` | `GET /services/{slug}/submission-email` | owner-or-admin | Required | `api_get_services_slug_submission_email` |
| `put_services_slug_submission_email` | `PUT /services/{slug}/submission-email` | owner-or-admin | Required | `api_put_services_slug_submission_email` |
| `get_me_tenants_slug_publishing_integrations` | `GET /me/tenants/{slug}/publishing-integrations` | member | Required | `api_get_me_tenants_slug_publishing_integrations` |
| `put_me_tenants_slug_publishing_integrations` | `PUT /me/tenants/{slug}/publishing-integrations` | owner-or-admin | Required | `api_put_me_tenants_slug_publishing_integrations` |
| `get_app_config` | `GET /app-config` | public | Not inferred | `api_get_app_config` |
| `post_app_installations` | `POST /app-installations` | public | Not inferred | `api_post_app_installations` |
| `get_landing_pages_surface` | `GET /landing-pages/{surface}` | public | Not inferred | `api_get_landing_pages_surface` |
| `get_site_config` | `GET /site-config` | public | Not inferred | `api_get_site_config` |
| `post_tenants` | `POST /tenants` | platform-admin | Not inferred | `api_post_tenants` |
| `get_site_metadata` | `GET /site-metadata` | public | Not inferred | `api_get_site_metadata` |
| `get_navigation` | `GET /navigation` | public | Not inferred | `api_get_navigation` |
| `get_pages_slug` | `GET /pages/{slug}` | public | Not inferred | `api_get_pages_slug` |
| `get_posts` | `GET /posts` | public | Not inferred | `api_get_posts` |
| `get_search` | `GET /search` | public | Not inferred | `api_get_search` |
| `get_sitemap` | `GET /sitemap` | public | Not inferred | `api_get_sitemap` |
| `get_redirects` | `GET /redirects` | public | Not inferred | `api_get_redirects` |
| `get_posts_slug` | `GET /posts/{slug}` | public | Not inferred | `api_get_posts_slug` |
| `get_authors_slug` | `GET /authors/{slug}` | public | Not inferred | `api_get_authors_slug` |
| `get_categories_slug` | `GET /categories/{slug}` | public | Not inferred | `api_get_categories_slug` |
| `get_tags_slug` | `GET /tags/{slug}` | public | Not inferred | `api_get_tags_slug` |
| `post_contact` | `POST /contact` | public | Not inferred | `api_post_contact` |
| `get_service_capabilities` | `GET /service-capabilities` | public | Not inferred | `api_get_service_capabilities` |
| `get_newsletter_destinations` | `GET /newsletter/destinations` | public | Not inferred | `api_get_newsletter_destinations` |
| `post_newsletter` | `POST /newsletter` | public | Not inferred | `api_post_newsletter` |
| `get_me_tenants` | `GET /me/tenants` | member | Not inferred | `api_get_me_tenants` |
| `get_me_tenants_slug_domains` | `GET /me/tenants/{slug}/domains` | member | Required | `api_get_me_tenants_slug_domains` |
| `post_me_tenants_slug_domains` | `POST /me/tenants/{slug}/domains` | owner-or-admin | Required | `api_post_me_tenants_slug_domains` |
| `post_me_tenants_slug_domains_id_check` | `POST /me/tenants/{slug}/domains/{id}/check` | owner-or-admin | Required | `api_post_me_tenants_slug_domains_id_check` |
| `patch_me_tenants_slug_domains_id_primary` | `PATCH /me/tenants/{slug}/domains/{id}/primary` | owner-or-admin | Required | `api_patch_me_tenants_slug_domains_id_primary` |
| `delete_me_tenants_slug_domains_id` | `DELETE /me/tenants/{slug}/domains/{id}` | owner-or-admin | Required | `api_delete_me_tenants_slug_domains_id` |
| `app_deployment_status` | `GET /apps/{slug}/{environment}/deployments` | owner-or-admin | Required | `api_app_deployment_status` |
| `app_deployment_settings` | `PUT /apps/{slug}/{environment}/deployments/settings` | owner-or-admin | Required | `api_app_deployment_settings` |
| `app_deployment_promote` | `POST /apps/{slug}/{environment}/deployments/promote` | owner-or-admin | Required | `api_app_deployment_promote` |
| `publishing_list` | `GET /admin/{slug}/{environment}/publishing/{resource}` | editor | Required | `api_publishing_list` |
| `publishing_create` | `POST /admin/{slug}/{environment}/publishing/{resource}` | editor | Required | `api_publishing_create` |
| `publishing_get` | `GET /admin/{slug}/{environment}/publishing/{resource}/{id}` | editor | Required | `api_publishing_get` |
| `publishing_update` | `PATCH /admin/{slug}/{environment}/publishing/{resource}/{id}` | editor | Required | `api_publishing_update` |
| `publishing_delete` | `DELETE /admin/{slug}/{environment}/publishing/{resource}/{id}` | editor | Required | `api_publishing_delete` |
| `publishing_versions` | `GET /admin/{slug}/{environment}/publishing/{resource}/{id}/versions` | editor | Required | `api_publishing_versions` |
| `publishing_restore` | `POST /admin/{slug}/{environment}/publishing/{resource}/{id}/restore` | editor | Required | `api_publishing_restore` |
| `publishing_media_upload` | `POST /admin/{slug}/{environment}/media/upload` | editor | Required | `api_publishing_media_upload` |
| `admin_members_list` | `GET /admin/{slug}/members` | owner-or-admin | Required | `api_admin_members_list` |
| `admin_member_change` | `PATCH /admin/{slug}/members/{id}` | owner-or-admin | Required | `api_admin_member_change` |
| `admin_member_revoke` | `DELETE /admin/{slug}/members/{id}` | owner-or-admin | Required | `api_admin_member_revoke` |
| `admin_member_invite` | `POST /admin/{slug}/invitations` | owner-or-admin | Required | `api_admin_member_invite` |
| `admin_invitation_revoke` | `DELETE /admin/{slug}/invitations/{id}` | owner-or-admin | Required | `api_admin_invitation_revoke` |
| `admin_invitation_accept` | `POST /admin/invitations/accept` | authenticated | Not inferred | `api_admin_invitation_accept` |
| `reference_postal_code_us` | `GET /reference/postal-codes/us/{zip}` | public | Not inferred | `api_reference_postal_code_us` |
| `logs_write` | `POST /tenants/{slug}/environments/{environment}/logs` | public | Required | `api_logs_write` |
| `logs_list` | `GET /tenants/{slug}/environments/{environment}/logs` | owner-or-admin | Required | `api_logs_list` |
| `logs_get` | `GET /tenants/{slug}/environments/{environment}/logs/{id}` | owner-or-admin | Required | `api_logs_get` |
| `platform_logs_list` | `GET /platform/logs` | platform-admin | Not inferred | `api_platform_logs_list` |
| `platform_logs_get` | `GET /platform/logs/{id}` | platform-admin | Not inferred | `api_platform_logs_get` |
| `get_services_slug_identity_origins` | `GET /services/{slug}/identity-origins` | owner-or-admin | Required | `api_get_services_slug_identity_origins` |
| `put_services_slug_identity_origins` | `PUT /services/{slug}/identity-origins` | owner-or-admin | Required | `api_put_services_slug_identity_origins` |

## Additional stdio MCP tools

The schema download includes generated API tools and these convenience tools.
Customer versus administrator access is enforced by the underlying REST operation.

| Tool | Description |
| --- | --- |
| `tenant_list` | List only tenants accessible to the authenticated account. |
| `developer_settings` | Sync public app configuration and brand settings for an accessible tenant. |
| `data_get` | get a scoped app entity through REST. Data is included on reads. Writes require the expected version and an operation ID for safe retries. |
| `data_list` | list a scoped app entity through REST. Data is included on reads. Writes require the expected version and an operation ID for safe retries. |
| `data_upsert` | upsert a scoped app entity through REST. Data is included on reads. Writes require the expected version and an operation ID for safe retries. |
| `data_patch` | patch a scoped app entity through REST. Data is included on reads. Writes require the expected version and an operation ID for safe retries. |
| `data_delete` | delete a scoped app entity through REST. Data is included on reads. Writes require the expected version and an operation ID for safe retries. |
| `forms_list` | List enabled tenant/environment forms and their versions. |
| `submission_status` | List submissions owned by the configured customer session. A reference alone grants no access. |
| `draft_get` | Read an owned saved draft, photo completion and private history. |
| `draft_discard` | Permanently delete an owned draft and its photos. Submitted records cannot be deleted. Requires the current revision. |
| `submission_inbox` | Read submitted forms. Requires tenant owner/admin authentication. |
| `submission_review` | Review a submission and write a submitter-visible message with optimistic concurrency. |
| `submission_analytics` | Read deduplicated first-party counts grouped by source, medium and campaign. |
| `forms_settings` | Read tenant forms enablement and definitions. |
| `forms_configure` | Install immutable form versions and enable/disable submissions for this tenant environment. |
