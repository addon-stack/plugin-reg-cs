# @adnbn/plugin-reg-cs

[![npm version](https://img.shields.io/npm/v/@adnbn/plugin-reg-cs.svg?logo=npm)](https://www.npmjs.com/package/@adnbn/plugin-reg-cs)
[![npm downloads](https://img.shields.io/npm/dm/@adnbn/plugin-reg-cs.svg)](https://www.npmjs.com/package/@adnbn/plugin-reg-cs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)
[![CI](https://github.com/addon-stack/plugin-reg-cs/actions/workflows/ci.yml/badge.svg)](https://github.com/addon-stack/plugin-reg-cs/actions/workflows/ci.yml)

A plugin for [Addon Bone](https://addonbone.com) that automatically registers and injects content scripts on first install, as soon as the required permissions are granted.

## Key Features

- **Immediate Content Script Activation**: Injects your content scripts into already open tabs that match your URL patterns right after installation (no manual refresh needed)
- **Respects Permissions Flow**: Waits for required API and host permissions; injects immediately when they are available (either granted at install or later)
- **Full Support for Content Script Options**: Works with manifest content script properties including `run_at`, `all_frames`, `match_about_blank`, and execution world
- **Error Handling**: Uses best‑effort injection with detailed error logging without blocking other tabs/files
- **Zero Configuration**: Works out of the box with your existing manifest content script definitions

## How It Works

On the extension’s initial install (not on updates), the plugin:

1. Reads your manifest’s `content_scripts` and collects URL patterns from each script’s `matches`.
2. Treats those URL patterns as required host permissions, alongside the API permissions `tabs` and `scripting`.
3. Checks whether these permissions are already granted:
   - If yes, it immediately injects the specified JS and CSS files into all currently open tabs that match.
   - If not, it subscribes to permission changes and automatically injects once the browser/user grants them (no reload required). The listener is removed after injection.
4. Injection behavior:
   - Skips tabs that are frozen or discarded and only injects into tabs with a valid ID.
   - JavaScript is injected with support for `run_at`, `match_about_blank`, `all_frames`, and execution `world`.
   - CSS is injected with support for `run_at` and `match_about_blank`.
   - Errors for individual files/tabs are logged but do not stop other injections (best‑effort via Promise.allSettled).

Note: This automatic registration runs only on the first install event. It doesn’t re‑run on extension updates.

## Required Permissions

This plugin relies on the following permissions:

- **`tabs`**: Needed to query and access tab information for content script injection
- **`scripting`**: Required to inject scripts and CSS into web pages
- **Host permissions for your `matches`**: The same URL patterns you use in `content_scripts.matches`

The plugin declares and checks these permissions and injects as soon as the browser grants them. It does not actively call `chrome.permissions.request`; ensure your manifest and/or your own UI flow prompts the user to grant the needed host permissions.

## Installation

Using npm:

```bash
npm install @adnbn/plugin-reg-cs
```

Using Yarn:

```bash
yarn add @adnbn/plugin-reg-cs
```

Using pnpm:

```bash
pnpm add @adnbn/plugin-reg-cs
```

## Usage

### Basic Setup

In your `adnbn.config.ts`:

```ts
import {defineConfig} from "adnbn";
import registerContentScript from "@adnbn/plugin-reg-cs";

export default defineConfig({
    plugins: [registerContentScript()],
    // other Addon Bone settings...
});
```

## Troubleshooting

If your content scripts aren't being injected:

- Ensure the necessary URL patterns are present in `host_permissions` (or are otherwise granted by the user); without host permissions the API can’t access those tabs
- Remember: injection is triggered only on the initial install. To re‑test, remove the extension and install it again
- Some pages (e.g., Chrome Web Store, browser internal pages) are restricted and cannot be scripted
- If a tab is discarded/frozen, wake it (focus or reload) and try again
