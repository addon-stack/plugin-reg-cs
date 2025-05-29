# @addonbone/reg-cs-plugin

Register Content Scripts plugin for Addon Bone. Automatically injects JS and CSS assets declared under `content_scripts` in your extension manifest.

## Installation

```bash
npm install @addonbone/reg-cs-plugin
# or
yarn add @addonbone/reg-cs-plugin
```

## Usage

In your `adnbn.config.ts`:

```ts
import {defineConfig} from 'adnbn';
import registerContentScriptPlugin from '@addonbone/reg-cs-plugin';

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

