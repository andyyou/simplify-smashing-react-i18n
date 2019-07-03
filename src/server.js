import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import cookieParser from 'cookie-parser';
import acceptLanguage from 'accept-language';
import fs from 'fs';
import path from 'path';
import { IntlProvider, addLocaleData } from 'react-intl';
import App from './components/App';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

addLocaleData([...ru, ...en]);

const messages = {};
const localeData = {};

['en', 'ru'].forEach((locale) => {
  localeData[locale] = fs.readFileSync(path.join(__dirname, `../node_modules/react-intl/locale-data/${locale}.js`)).toString();
  messages[locale] = require(`../public/assets/${locale}.json`);
})

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/';
const renderHTML = (componentHTML, locale) => `
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
      <script type="application/javascript">
        ${localeData[locale]}
      </script>
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
app.use('/public/assets', express.static('public/assets'));
app.use((req, res) => {
  const locale = detectLocale(req);
  const componentHTML = ReactDOMServer.renderToString(
    <IntlProvider locale={locale} messages={messages[locale]}>
      <App />
    </IntlProvider>
  );

  res.cookie('locale', locale, {
    maxAge: (new Date() * 0.001) + (365 * 24 * 3600),
  });
  return res.end(renderHTML(componentHTML, locale));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
