var webpack = require('webpack');
var path = require('path');

module.exports = {
    // Add webpack-hot-middleware/client to our bundle so our app subscribes to update notifications from the server
    entry: ['webpack-hot-middleware/client', path.join(__dirname, 'src/client/index')],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',

        // Add a publicPath property. This is the path referenced in the script tag in our html template to our bundle.js.
        // We need this to configure webpack-dev-middleware in server.js
        publicPath: '/dist/'
    },
    module: {
        loaders:[{
            test: /\.jsx?$/,
            loader: 'babel',
            include: path.join(__dirname, 'src')
        }]
    },

    // Enables hot module replacement in webpack
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};