// @ts-check
import eslint from "@eslint/js";
import * as pluginimport from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    "plugins": {
      "import": pluginimport
    },
    "rules": {
      "key-spacing":                                      ["error", { "align": "value","mode": "minimum","beforeColon": false, "afterColon": true}],
      "indent":                                           ["error", 2],
      "quotes":                                           ["error", "double"],
      "quote-props":                                      ["error", "consistent"],
      "semi":                                             ["error", "always"],
      "import/no-duplicates":                             ["error"],
      "import/order":                                     ["error", { "alphabetize": { "order": "asc" }}],
      "@typescript-eslint/explicit-function-return-type": ["error"]
    }
  }
);
