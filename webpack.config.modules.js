const path = require('path');
const srcPath = path.join(__dirname, 'src');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

const skin = process.env.skin || 'default';

module.exports = {
    rules: [{
            enforce: 'pre',
            test: /\.(jsx|js)?/,
            include: [path.resolve(__dirname, 'skin', skin, 'src'), srcPath],
            loader: 'babel-loader',
        },
        {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
        },
        {

            test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf|webm)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    publicPath: '/'
                },
            }],
        },
        {
            test: /\.scss$/,
            loaders: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                    plugins: [
                        autoprefixer({
                            browsers: ['ie >= 8', 'last 20 version']
                        })
                    ]
                    }
                },
                {
                    loader: "sass-loader",
                }
            ],
        },
        // {
        //     // make all files ending in .json5 use the `json5-loader`
        //     test: /\.json$/,
        //     loader: 'json-loader'
        // },
        {
            // make all files ending in .json5 use the `json5-loader`
            test: /\.json5$/,
            loader: 'json5-loader'
        }
    ]
};