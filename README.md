# @adnbn/reg-cs-plugin

[![npm version](https://img.shields.io/npm/v/@adnbn/reg-cs-plugin.svg)](https://www.npmjs.com/package/@adnbn/reg-cs-plugin)
[![npm downloads](https://img.shields.io/npm/dm/@adnbn/reg-cs-plugin.svg)](https://www.npmjs.com/package/@adnbn/reg-cs-plugin)

Register Content Scripts plugin for [Addon Bone](https://github.com/addonbone).
Automatically injects JS and CSS assets declared under `content_scripts` in your extension manifest.

## Installation

Using npm:

```bash
npm install @adnbn/reg-cs-plugin
```

Using Yarn:

```bash
yarn add @adnbn/reg-cs-plugin
```

## Usage

In your `adnbn.config.ts`:

```ts
import {defineConfig} from "adnbn";
import registerContentScriptPlugin from "@adnbn/reg-cs-plugin";

export default defineConfig({
    plugins: [registerContentScriptPlugin()],
    // other Addon Bone settings...
});
```

### Example `manifest.json`

```json
{
    "content_scripts": [
        {
            "matches": ["https://example.com/*"],
            "js": ["content-script.js"],
            "css": ["styles.css"],
            "all_frames": false
        }
    ]
}
```

## License

MIT © Addon Bone
