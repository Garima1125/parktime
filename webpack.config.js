const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    watchOptions: {
      poll: true
    },
    resolve: {
        extensions: ['.js', '.jsx']
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
                exclude: /node_modules/,
                query: {
                    "presets": ["react", "es2015", "stage-0"]
                }
            },
            {
                test: /\.scss$/,
                exclude: /assets/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },

            {
                test: /\.css$/,
                include: /src/,
                use: [
                    'style-loader',
                    'css-loader'

                ]
            },

            {
                test: /\.(jpg|png|svg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name]-[hash:8].[ext]'
                    },
                  },
                ],
                include: /assets/
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: {
                loader: 'url-loader',

                },
                include: /assets/
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
