# @adnbn/plugin-reg-cs

[![npm version](https://img.shields.io/npm/v/@adnbn/plugin-reg-cs.svg)](https://www.npmjs.com/package/@adnbn/plugin-reg-cs)
[![npm downloads](https://img.shields.io/npm/dm/@adnbn/plugin-reg-cs.svg)](https://www.npmjs.com/package/@adnbn/plugin-reg-cs)

A plugin for [Addon Bone](https://github.com/addonbone) that automatically registers and injects content scripts when your browser extension is installed.

## Key Features

- **Immediate Content Script Activation**: Automatically injects your content scripts into existing tabs that match your URL patterns when the extension is first installed
- **Full Support for Content Script Options**: Works with all manifest content script properties including `run_at`, `all_frames`, `match_about_blank`, and execution world
- **Error Handling**: Gracefully handles injection failures with detailed error logging
- **Zero Configuration**: Works out of the box with your existing manifest content script definitions

## How It Works

When your extension is installed, this plugin:

1. Reads the `content_scripts` section from your extension's manifest
2. Finds all open tabs that match the URL patterns defined in your content scripts
3. Injects the specified JavaScript and CSS files into those tabs
4. This ensures users can immediately see and use your extension without needing to refresh their tabs

## Required Permissions

This plugin requires the following permissions in your manifest:

- **`tabs`**: Needed to query and access tab information for content script injection
- **`scripting`**: Required to inject scripts and CSS into web pages

These permissions are automatically requested by the plugin and are essential for its functionality.

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

- Make sure you have included the necessary URL patterns in `host_permissions` in your manifest, otherwise the API won't have access to those tabs


## License

MIT © Addon Bone