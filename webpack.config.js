const path = require('path')

module.exports = {
  entry: {
    modela: {
      import: './src/index.ts',
      library: {
        // all options under `output.library` can be used here
        name: 'Modela',
        type: 'umd',
        umdNamedDefine: true,
        export: 'default'
      }
    },
    'natives.loader': {
      import: './src/natives.loader.ts',
      library: {
        name: 'ModelaNativesLoader',
        type: 'umd',
        umdNamedDefine: true,
        export: 'default'
      }
    }
  },
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
      test: /\.s[ac]ss$/i,
        use: [
          'style-loader', // Creates `style` nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
          'sass-loader' // Compiles Sass to CSS
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: '[name].min.js',
    cssFilename: '[name].min.css',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'self'
  }
}