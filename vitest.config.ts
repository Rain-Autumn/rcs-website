import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ["tests/unit/**/*.test.ts", "tests/unit/**/*.test.tsx"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/unit/setup.ts"],
  },
});
