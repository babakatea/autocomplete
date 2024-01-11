const path = require('path');

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      '@': resolvePath('./src'),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: require.resolve('style-loader'),
            },
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]',
              },
            },
          ],
        },
      ],
    },
  },
};
