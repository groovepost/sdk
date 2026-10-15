# Groovepost SDK

Public documentation, integration examples, and release guidance for the Groovepost SDK.

The SDK implementation is maintained in the private Groovepost platform monorepo. This repository contains developer-facing documentation and examples; it does not contain the SDK implementation.

## Status

This repository is the initial documentation home. Package names, installation commands, supported versions, and runnable examples will be added after the existing platform packages and release setup have been verified.

## Component architecture

The intended component layers are:

1. Shopify commerce primitives provide commerce behavior and data integration.
2. Groovepost components compose those primitives into reusable experiences with shared behavior and defaults.
3. Tenant applications, such as Digger's Union, customize Groovepost components through theme tokens, props, slots, and component overrides.

Prefer composition and configuration over class inheritance. Tenants should reuse the default components and replace only the parts that need different presentation or behavior.

## Release approach

- Build, test, version, and publish SDK packages from the private platform monorepo.
- Publish built JavaScript and TypeScript declarations, excluding original implementation source and source maps. Distributed JavaScript remains inspectable.
- Maintain public usage guides, examples, migration guides, and changelogs here alongside package releases.
- Test public examples against published package versions without private workspace dependencies.
- Keep documentation aligned with released package versions and distinguish prerelease guidance from stable releases.

## Feedback

Use this repository's issues to report documentation problems and SDK integration issues. Never include credentials, private tenant data, or private implementation code.
