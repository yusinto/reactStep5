import Express from 'express';
import Webpack from 'webpack';
import WebpackConfig from '../../webpack.config.dev';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebPackHotMiddleware from 'webpack-hot-middleware';
import sse from 'server-sent-events';

const PORT = 3000;
const app = Express();
const htmlString = `<!DOCTYPE html>
    <html>
         <head>
            <title>Webpack and React</title>
          </head>
          <body>
            <div id="reactDiv" />
            <script src="/dist/bundle.js"></script>
          </body>
    </html>`;

// create a webpack instance from our dev config
const webpackCompiler = Webpack(WebpackConfig);

// Use webpack dev middleware to bundle our app on the fly and serve it
// on publicPath. Turn off verbose webpack output in our server console
// by setting noInfo: true
app.use(WebpackDevMiddleware(webpackCompiler, {
  publicPath: WebpackConfig.output.publicPath,
  noInfo: true
}));

// instruct our webpack instance to use webpack hot middleware
app.use(WebPackHotMiddleware(webpackCompiler));

// NOTE: delete express static middleware for dist. We don't need that
// anymore because webpack-dev-middleware serves our bundle.js from memory

app.get('/events', sse, (req, res) => {
  // res.sse is made available via the middleware
  res.sse('event: ping\n');
  res.sse('data: ping ! im from the server\n\n');


});

app.use((req, res) => {
  res.end(htmlString);
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});