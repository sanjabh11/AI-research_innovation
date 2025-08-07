import js from "@eslint/js";
import react from "eslint-plugin-react";
import typescript from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      react,
      "@typescript-eslint": typescript,
    },
    rules: {
      "no-console": "off",
      "no-unused-disable-directives": "off",
      // TypeScript handles undefined and unused checks; disable redundant core rules
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",


      ...prettier.rules,
    },
    settings: {
      react: { version: "detect" },
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-undef": "off",
      "no-fallthrough": "off",
      "no-sparse-arrays": "off",
    },
  },
];
