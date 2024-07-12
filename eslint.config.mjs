// @ts-check
import eslint from "@eslint/js";
import * as pluginimport from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default tseslint.config(
 eslint.configs.recommended,
 ...tseslint.configs.strict,
 {
  plugins: {
    import: pluginimport
  },
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "import/no-duplicates": ["error"],
    "import/order": ["error", {
      alphabetize: { order: "asc" },
    }]
  }
 }
);
