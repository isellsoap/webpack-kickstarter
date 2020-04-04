// node packages
import glob from 'glob'
import path from 'path'

// webpack plugins
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin'

// minification
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'

// postcss
import autoprefixer from 'autoprefixer'
import postcssCustomMedia from 'postcss-custom-media'
import postcssCustomProperties from 'postcss-custom-properties'
import postcssImport from 'postcss-import'
import postcssMixins from 'postcss-mixins'

import webpack from 'webpack'

const isProd = process.env.NODE_ENV === 'production'

const options = {
  dist: './dist',
  ejsFileExtension: 'html',
  // Among other things this ensures correct path outputs for hashed assets
  // (CSS and JS files) which get inserted into the `.ejs` templates via the
  // `html-webpack-plugin`.
  publicPath: '../',
  src: './src',
}

const rules = {
  fonts: {
    test: /\.woff(2)?$/,
    use: {
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[hash].[ext]',
      },
    },
  },
  ts: {
    test: /\.ts$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
  },
  styles: {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            postcssImport(),
            postcssMixins(),
            autoprefixer(),
            postcssCustomProperties({ preserve: false }),
            postcssCustomMedia(),
          ],
        },
      },
    ],
  },
}

type WebpackMode = 'development' | 'production' | 'none'

export default (): webpack.Configuration => {
  let config = {
    mode: (isProd ? 'production' : 'development') as WebpackMode,
    entry: {
      'scripts/main': `${options.src}/scripts/main.ts`,
    },
    output: {
      path: path.join(__dirname, options.dist),
      filename: '[name].[chunkhash].js',
      publicPath: options.publicPath,
    },
    module: {
      rules: [rules.fonts, rules.ts, rules.styles],
    },
    resolve: {
      extensions: ['.js', '.ts'],
    },
    stats: (isProd ? 'normal' : 'errors-only') as webpack.Options.Stats,
    devtool: (isProd ? 'source-map' : 'inline-source-map') as webpack.Options.Devtool,
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles/main.[contenthash].css',
      }),

      ...glob.sync(`${options.src}/ejs/*.${options.ejsFileExtension}.ejs`).map(
        (page) =>
          new HtmlWebpackPlugin({
            inject: false,
            template: page,
            filename: `${options.ejsFileExtension}/${path.basename(page, '.ejs')}`,
          }),
      ),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async',
      }),
    ],
  }

  if (isProd) {
    config = Object.assign(config, {
      optimization: {
        minimizer: [
          new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
              preset: [
                'default',
                {
                  minifyFontValues: { removeDuplicates: false, removeQuotes: false },
                },
              ],
            },
          }),
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
          }),
        ],
      },
    })
  }

  return config
}
