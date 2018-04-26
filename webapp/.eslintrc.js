// http://eslint.org/docs/user-guide/configuring
ruleSpec = process.env.NODE_ENV === 'production' ? 2 : 0;
module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    // presets: [
    //     // "latest", "vue", "stage-2"
    // ],
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow debugger during development
        'no-debugger': ruleSpec,
        ///////////////
        // 可能的错误 //
        ////////////////
    }
}
