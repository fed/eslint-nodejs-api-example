import { ESLint } from 'eslint';
import a11yPluginImpl from 'eslint-plugin-jsx-a11y';

export async function lint() {
  const eslint = new ESLint({
    useEslintrc: false,
    plugins: {
      'jsx-a11y': a11yPluginImpl,
    },
    overrideConfig: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      env: {
        es6: true,
      },
      extends: ['plugin:jsx-a11y/strict'],
      rules: {
        'jsx-a11y/anchor-is-valid': [
          'error',
          {
            components: ['Link'],
            specialLink: ['to'],
          },
        ],
      },
    },
  });

  const results = await eslint.lintFiles(['**/*.tsx']);
  const formatter = await eslint.loadFormatter('stylish');
  const formattedResults = await formatter.format(results);

  console.log(formattedResults);

  return formattedResults;
}
