import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './components/App';

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/';

const renderHTML = componentHTML => `
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello React</title>
    </head>
    <body>
      <div id="root">${componentHTML}</div>
      <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
    </body>
  </html>
`;

const app = express();
app.use((req, res) => {
  const componentHTML = ReactDOMServer.renderToString(<App />);
  return res.send(renderHTML(componentHTML));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
