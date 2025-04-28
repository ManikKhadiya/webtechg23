export default [
  {
    // Match all .js, .jsx, .ts, and .tsx files in the project
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "semi": ["error", "always"], // Enforce semicolons
      "quotes": ["error", "double"], // Enforce double quotes
      "no-unused-vars": "warn", // Warn about unused variables
      "indent": ["error", 2], // Enforce 2-space indentation
      "eqeqeq": ["error", "always"], // Enforce strict equality
      "curly": ["error", "all"], // Require curly braces for all control statements
      "no-console": "warn", // Warn about console statements
    },
  }
];