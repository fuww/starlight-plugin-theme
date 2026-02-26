import type { StarlightPlugin } from "@astrojs/starlight/types";

export default function fashionunitedTheme(): StarlightPlugin {
  return {
    name: "fashionunited-theme",
    hooks: {
      setup({ config, updateConfig }) {
        updateConfig({
          customCss: [
            "@fashionunited/starlight-plugin-theme/styles/base.css",
            "@fashionunited/starlight-plugin-theme/styles/globals.css",
            "@fontsource/ibm-plex-mono/400.css",
            "@fontsource/ibm-plex-mono/600.css",
            "@fontsource-variable/inter",
            "@fontsource-variable/lora",
            ...(config.customCss ?? []),
          ],
          components: {
            Head: "@fashionunited/starlight-plugin-theme/components/starlight/Head.astro",
            PageTitle:
              "@fashionunited/starlight-plugin-theme/components/starlight/PageTitle.astro",
            ...(config.components ?? {}),
          },
        });
      },
    },
  };
}
