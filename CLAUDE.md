# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Run Mobile App**: `cd apps/mobile-employee && npm start` (runs Expo)
- **Run Android**: `cd apps/mobile-employee && npm run android`
- **Run iOS**: `cd apps/mobile-employee && npm run ios`
- **Run Web**: `cd apps/mobile-employee && npm run web`
- **Install Dependencies**: `pnpm install` (root is a pnpm workspace)

## Architecture

- **Workspace**: This is a monorepo using `pnpm` workspaces.
- **Apps**:
  - `apps/mobile-employee`: React Native app using Expo.
- **Packages**:
  - `packages/`: Shared packages (currently empty).
- **Tech Stack**: React Native, Expo, JavaScript.

## Code Style

- **React Components**: Functional components with hooks.
- **Styling**: `StyleSheet.create` for React Native styles.
