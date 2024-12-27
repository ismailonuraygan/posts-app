import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import react from "eslint-plugin-react";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsEslintConfig from "@typescript-eslint/parser";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import stylistic from "@stylistic/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const ignores = [
	"./fixtures",
	"package.json",
	"tsconfig.json",
	"node_modules",
	"coverage",
	"dist",
	"build",
	"types",
	".vscode",
	".DS_Store",
	".eslintcache",
	"*.log*",
	"*.conf*",
	"*.env*",
	"ios",
	"src/types/*.ts",
	"src/serviceWorker.ts",
	"*.d.ts",
]

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    plugins: {
      react: react,
      "@typescript-eslint": tseslint,
      "@tsEslintConfig-eslint": tsEslintConfig,
      "react-refresh": reactRefresh,
      "react-hooks": reactHooks,
      "@stylistic/ts": stylistic,
      "unused-imports": unusedImports,
      "import": importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    ignores: ignores,
    rules: {
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "comma-spacing": ["error", { before: false, after: true }],
      "react-refresh/only-export-components": "off",
      "react-hooks/rules-of-hooks": "off",
      "react/jsx-one-expression-per-line": "off",
      "semi": ["error", "never"],
      "react/self-closing-comp": ["error", { component: true, html: true }],
      "@stylistic/ts/jsx-curly-spacing": ["error", { when: "always", attributes: false, children: true }],
      "no-console": "warn",
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "@stylistic/ts/eol-last": ["error", "always"],
      "@stylistic/ts/indent": ["error", "tab"],
      "@stylistic/ts/no-mixed-spaces-and-tabs": ["error"],
      "@stylistic/ts/object-curly-spacing": ["error", "always"],
      "@stylistic/ts/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
      "no-trailing-spaces": ["error", { skipBlankLines: true, ignoreComments: true }],
      "@stylistic/ts/member-delimiter-style": ["error", {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: false,
        },
      }],
      "quotes": ["error", "single", { "avoidEscape": false, "allowTemplateLiterals": false }],
      "@stylistic/ts/jsx-curly-newline": ["error", { multiline: "require", singleline: "consistent" }],
      "react/jsx-max-props-per-line": ["error", { "maximum": { "single": 2, "multi": 1 } }],
      "react/jsx-first-prop-new-line": ["error", "multiline"],
      "react/jsx-closing-bracket-location": ["error", "tag-aligned"],
      "import/no-cycle": ["error", { maxDepth: Infinity }],
      "import/order": [
        "error",
        {
          "groups": [
            ["builtin", "external"],
            ["internal", "parent", "sibling", "index"]
          ],
          "pathGroups": [
            {
              "pattern": "@clickrising/**",
              "group": "external",
              "position": "after"
            }
          ],
          "pathGroupsExcludedImportTypes": ["builtin"],
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ]
    }
  }
];

export default eslintConfig;
