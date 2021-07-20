// cannot use this when interviewing
// use create react app instead
module.exports = {
    mode: 'development',
    entry: './index.js',
    module: {
        rules:[{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        }]
    }
}