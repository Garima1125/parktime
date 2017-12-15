const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/main.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    "presets": ["es2015", "stage-0"]
                }
            },
            { 
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_moduels/,
                query: {
                    "presets": ["react", "es2015", "stage-0"]
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            test: /\.js$/,
            options: {
              eslint: {
                //configFile: resolve(__dirname, '.eslintrc'),
                cache: false,
              }
            },
        }),
    ],
    node: {
        // eslint-disable-next-line camelcase
        child_process: "empty",
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty"
    }
};