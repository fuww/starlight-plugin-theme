# @fuww/starlight-plugin-theme

Shared FashionUnited Starlight theme plugin — blue-themed design system with UI components, Tailwind preset, and Starlight component overrides.

## Installation

```bash
bun add @fuww/starlight-plugin-theme
```

## Usage

### Starlight Plugin

Add the plugin to your `astro.config.mjs`:

```js
import fashionunitedTheme from '@fuww/starlight-plugin-theme';

export default defineConfig({
  integrations: [
    starlight({
      plugins: [fashionunitedTheme()],
      // your site-specific config...
    }),
  ],
});
```

The plugin automatically injects:
- Base CSS (dark mode fix, gradients, sidebar active state)
- Global CSS variables (shadcn/ui color tokens)
- Font imports (Inter, Lora, IBM Plex Mono)
- Starlight component overrides (Head.astro with view transitions, PageTitle.astro with copy-page dropdown)

### Tailwind Preset

Use the shared Tailwind preset in your `tailwind.config.mjs`:

```js
import starlightPlugin from '@astrojs/starlight-tailwind';
import { fuThemePreset, accent, gray } from '@fuww/starlight-plugin-theme/tailwind-preset';

export default {
  presets: [fuThemePreset],
  plugins: [
    starlightPlugin({ colors: { accent, gray } }),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
  // site-specific overrides...
};
```

### UI Components

Import shared React components:

```tsx
import { Button } from '@fuww/starlight-plugin-theme/components/ui/button';
import { Card } from '@fuww/starlight-plugin-theme/components/ui/card';
import { cn } from '@fuww/starlight-plugin-theme/lib/utils';
```

## Overriding Components

The plugin provides default Head.astro and PageTitle.astro components. To override them, add your own in your Starlight config — consumer overrides take precedence:

```js
starlight({
  plugins: [fashionunitedTheme()],
  components: {
    Head: './src/components/starlight/Head.astro', // overrides plugin's Head
  },
})
```
