const common = [
  "--require-module ts-node/register", // Load TypeScript module
];

const backoffice = [
  ...common,
  "tests/apps/backoffice/features/**/*.feature",
  "--require tests/apps/backoffice/features/step_definitions/*.steps.ts",
].join(" ");

module.exports = {
  backoffice,
};
