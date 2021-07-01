module.exports = {
    bracketSpacing: true,
    jsxBracketSameLine: true,
    singleQuote: true,
    trailingComma: 'none',
    arrowParens: 'always',
    tabWidth: 4,
    semi: true,
    overrides: [
        {
            files: '*.{js,jsx,tsx,ts,scss,json,html}',
            options: {
                tabWidth: 4
            }
        }
    ]
};
