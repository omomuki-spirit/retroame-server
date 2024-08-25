// @ts-check
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import * as pluginimport from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '.output/*',
      'node_modules/*',
    ],
  },
  eslint.configs.recommended,
  jsdoc.configs['flat/recommended-typescript-error'],
  stylistic.configs['recommended-flat'],
  ...tseslint.configs.strict,
  {
    plugins: {
      import: pluginimport,
    },
    rules: {
      'indent':                                           ['error', 2],
      'import/no-duplicates':                             ['error'],
      'import/order':                                     ['error', { alphabetize: { order: 'asc' } }],
      'jsdoc/check-tag-names':                            ['error', { definedTags: ['note'] }],
      '@stylistic/brace-style':                           ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/indent':                                ['error', 2, { SwitchCase: 0 }],
      '@stylistic/key-spacing':                           ['error', { align: 'value' }],
      '@stylistic/max-len':                               ['error', { code: 140, ignoreComments: true, ignoreTemplateLiterals: true, ignoreStrings: true, ignorePattern: 'function.*\\(.+\\)|\\(.+\\):\\s.+\\s\\{|^import .*' }],
      '@stylistic/max-statements-per-line':               ['error', { max: 3 }],
      '@stylistic/no-multi-spaces':                       ['error', { exceptions: { TSTypeAnnotation: true } }],
      '@stylistic/operator-linebreak':                    ['error', 'after'],
      '@stylistic/semi':                                  ['error', 'always'],
      '@typescript-eslint/consistent-type-imports':       ['error'],
      '@typescript-eslint/explicit-function-return-type': ['error'],
      '@typescript-eslint/naming-convention':             ['error',
        {
          selector: 'interface',
          format:   ['PascalCase'],
          prefix:   ['T'],
        },
        {
          selector: 'typeAlias',
          format:   ['PascalCase'],
          prefix:   ['T'],
        },
        {
          selector: 'typeParameter',
          format:   ['PascalCase'],
          prefix:   ['T'],
        },
      ],
    },
  },
);
