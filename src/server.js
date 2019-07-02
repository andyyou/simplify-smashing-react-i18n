import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import cookieParser from 'cookie-parser';
import acceptLanguage from 'accept-language';
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
const detectLocale = (req) => {
  const cookieLocale = req.cookies.locale;
  return acceptLanguage.get(cookieLocale || req.headers['accept-language'] || 'en');
};

acceptLanguage.languages(['en', 'ru']);
const app = express();
app.use(cookieParser());
app.use((req, res) => {
  const locale = detectLocale(req);
  const componentHTML = ReactDOMServer.renderToString(<App />);

  res.cookie('locale', locale, {
    maxAge: (new Date() * 0.001) + (365 * 24 * 3600),
  });
  return res.end(renderHTML(componentHTML));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
