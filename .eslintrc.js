module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  globals: {
    localStorage: true,
    document: true,
  },
  rules: {
    'linebreak-style': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/require-default-props': [0],
    'react/forbid-prop-types': [0],
    'import/prefer-default-export': 'off',
  },
};
