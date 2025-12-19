import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js and TypeScript configs
  ...compat.extends("next/core-web-vitals", "plugin:@typescript-eslint/recommended"),
  
  // Global configuration
  {
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  
  // Override for scripts/generate-migration.js
  {
    files: ["scripts/generate-migration.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  
  // Override for db/schema/utils.ts
  {
    files: ["db/schema/utils.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  
  // Ignore .firebase directory and files from .gitignore
  {
    ignores: [".firebase/**/*", "node_modules/**/*", ".next/**/*", "out/**/*"],
  },
];

export default eslintConfig;
