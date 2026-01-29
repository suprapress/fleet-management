# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Run Mobile App**: `cd apps/mobile-employee && npx expo start`
- **Run Android**: `cd apps/mobile-employee && npx expo start --android`
- **Run iOS**: `cd apps/mobile-employee && npx expo start --ios`
- **Run Web**: `cd apps/mobile-employee && npx expo start --web`
- **Install Dependencies**: `pnpm install` (root is a pnpm workspace)
- **Type Check**: `cd apps/mobile-employee && npx tsc --noEmit`

## Architecture

- **Workspace**: Monorepo using `pnpm` workspaces.
- **Mobile App** (`apps/mobile-employee`):
  - **Framework**: React Native with Expo (SDK 54).
  - **Navigation**: File-based routing using `expo-router` in the `app/` directory.
  - **State Management**: React Context / Local State (currently simple).

## Structure

- **Routes**: Located in `apps/mobile-employee/app/`.
  - `index.tsx`: Login/Entry screen.
  - `_layout.tsx`: Root layout configuration.
  - `driver/`: Driver-specific screens.
  - `maintenance/`: Maintenance-specific screens.
- **Components**: (Currently inline or in `app/` - verify if `components/` exists).
- **Styling**: `StyleSheet.create` for styles, co-located with components.

## Code Style

- **Components**: Functional components with React hooks.
- **Navigation**: Use `expo-router` hooks (`useRouter`, `Link`) for navigation.
- **Styling**: Use React Native's `StyleSheet`. Avoid inline styles for complex objects.
- **Types**: TypeScript is enabled (`tsconfig.json` present). Ensure strict type checking.
