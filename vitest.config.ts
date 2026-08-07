import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    // Bare "node_modules" only matches a top-level dir, not nested ones —
    // a git worktree under .claude/worktrees/ has its own node_modules AND
    // its own copy of this project's test files, both of which get scanned
    // without these excludes (confirmed live, 2026-08-07: pulled in
    // tsconfig-paths' own test suite, then a sibling worktree's WIP tests).
    exclude: ["**/node_modules/**", ".next", "tests-e2e", ".claude/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
