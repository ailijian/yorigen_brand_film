import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules/**", "renders/**", "public/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}", "scripts/**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        console: "readonly",
        document: "readonly",
        process: "readonly",
        URL: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-restricted-globals": ["error", { "name": "fetch", "message": "Film renders must not call product or network APIs." }],
      "no-restricted-properties": [
        "error",
        { "object": "Date", "property": "now", "message": "Frame state must come from useCurrentFrame()." },
        { "object": "Math", "property": "random", "message": "Unseeded randomness is forbidden." }
      ]
    }
  }
);
