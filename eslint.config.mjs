import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

/**
 * eslint-config-next 16 já publica flat config, então nada de FlatCompat.
 * `core-web-vitals` inclui as regras de next e de TypeScript.
 */
const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'public/**'],
  },
  ...nextCoreWebVitals,
  {
    // O plugin @typescript-eslint só é registrado para arquivos .ts/.tsx,
    // então o override precisa do mesmo escopo.
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },
];

export default eslintConfig;
