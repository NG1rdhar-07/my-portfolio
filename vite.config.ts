// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.

// Switch Nitro to the Vercel preset when building on Vercel (VERCEL env is set automatically).
// This overrides the Lovable default of "cloudflare-module" so the build emits Vercel
// .vercel/output artifacts that Vercel's edge runtime understands.
if (process.env.VERCEL && !process.env.NITRO_PRESET) {
  process.env.NITRO_PRESET = "vercel";
}

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    nitro: {
      // Belt-and-suspenders: also pass the preset through to TanStack Start's Nitro
      // options in case the env var above is overridden downstream.
      preset: process.env.VERCEL ? "vercel" : undefined,
    },
  },
});
