/** @type {import('stylelint').Config} */
export default {

  // Exclusions (build output, vendor, coverage, minified bundles)
  ignoreFiles: [
    '**/dist/**',
    '**/node_modules/**',
    '.angular/**',
    'coverage/**',
    '**/*.min.css'
  ],
  // Base standard SCSS ruleset
  extends: [
    'stylelint-config-standard-scss'
  ],
  // Minimal overrides (kept very light)
  rules: {
    // Minimal strictness
    'max-nesting-depth': [3, { ignore: ['blockless-at-rules'] }],
    'block-no-empty': true,
  }
};
