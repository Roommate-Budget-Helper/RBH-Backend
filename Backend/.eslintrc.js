module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended" // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    // project: __dirname + '/../../../tsconfig.json'
    project: __dirname + "/tsconfig.json"
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: true,
        trailingComma: "all",
        singleQuote: true,
        jsxSingleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: "always",
        endOfLine: "lf"
      }
    ],
    "no-bitwise": "off",
    "newline-before-return": "off",
    "no-trailing-spaces": "off",
    "max-classes-per-file": "off",
    curly: "off",
    "prefer-arrow-callback": "error",
    "no-unused-vars": ["warn", { varsIgnorePattern: "^_" }],
    "no-console": "warn",
    radix: ["error", "as-needed"],
    "no-return-await": "error",
    "default-case": "error",
    "use-isnan": "error",
    "prefer-template": "error",
    "no-useless-concat": "error",
    camelcase: ["warn", { properties: "never", ignoreDestructuring: true }]
  },
  overrides: [
    {
      files: ["**/*.ts"],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            varsIgnorePattern: "^_",
            argsIgnorePattern: "^_",
            ignoreRestSiblings: true
          }
        ],
        "@typescript-eslint/no-floating-promises": ["error"],
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/promise-function-async": "off",
        "@typescript-eslint/no-type-alias": "off",
        "@typescript-eslint/no-non-null-assertion": "warn",
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/await-thenable": ["error", "Bluebird"],
        "@typescript-eslint/class-name-casing": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "error",
        "@typescript-eslint/interface-name-prefix": ["error", "always"],
        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-parameter-properties": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/prefer-interface": "warn",
        "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        "@typescript-eslint/no-use-before-define": "error",
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/restrict-plus-operands": "error",
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/unified-signatures": "error",
        "@typescript-eslint/member-ordering": "off"
      }
    }
  ]
};
