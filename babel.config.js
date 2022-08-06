module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
    'minify',
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@': './src',
      },
    }],
  ],
  ignore: [
    '**/*.spec.ts',
  ],
};
