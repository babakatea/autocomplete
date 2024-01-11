const prettierConfig = require('./.prettierrc.js');

module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    plugins: [
        'react',
        'import',
        'simple-import-sort',
        'unused-imports',
        'prettier',
    ],

    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        indent: [
            'error',
            2,
            {
                "SwitchCase": 1,
                offsetTernaryExpressions: true,
            },
        ],
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'newline-before-return': 'error',
        'prefer-destructuring': ['error', { object: true, array: false }],
        'no-continue': 'off',
        'no-await-in-loop': 'off',
        'no-param-reassign': 'off',
        'react/jsx-curly-brace-presence': 'error',
        'import/no-extraneous-dependencies': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'off',
        'no-restricted-exports': [
            'error',
            {
                restrictedNamedExports: ['then'],
            },
        ],
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'no-underscore-dangle': 'off',
        'implicit-arrow-linebreak': 'off',
        'prettier/prettier': ['error', prettierConfig],
        'sort-imports': [
            'error',
            {
                ignoreCase: true,
                ignoreDeclarationSort: true,
            },
        ],
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^react', '^[^\\.]'],
                    ['^@/'],
                    ['^[.][.]'],
                    ['^[.]', '^(./).*[.]css', '(^\\u0000)[.]/.*[.]css'],
                ],
            },
        ],
        'react/jsx-sort-props': [
            'error',
            {
                ignoreCase: true,
            },
        ],
        camelcase: ['off'],
    },
    settings: {
        // https://stackoverflow.com/questions/58671448/how-to-force-vue-extension-in-all-imports-using-eslint
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            alias: {
                map: [['@', './src']],
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            },
        },
        react: {
            version: 'detect',
        },
    },
    overrides: [
        {
            files: ['*.{ts,tsx}'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                parser: 'babel-eslint',
                tsconfigRootDir: __dirname,
                project: './tsconfig.json',
            },
            plugins: ['@typescript-eslint'],
            extends: ['plugin:@typescript-eslint/recommended'],
        },
    ],
    ignorePatterns: ['dist/*'],
};
