export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "refactor", "style", "test", "docs", "chore", "perf", "ci", "build"],
    ],
    "header-max-length": [2, "always", 72],
  },
};
