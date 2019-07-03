import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import Cookie from 'js-cookie';
import App from './components/App';

const locale = Cookie.get('locale') || 'en';

fetch(`/public/assets/${locale}.json`)
  .then((res) => {
    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }
    return res.json();
  })
  .then((localeMessages) => {
    addLocaleData(window.ReactIntlLocaleData[locale]);
    ReactDOM.render(
      <IntlProvider locale={locale} messages={localeMessages} initialNow={parseInt(window.INITIAL_NOW, 10)}>
        <App />
      </IntlProvider>,
      document.getElementById('root'),
    );
  })
  .catch((error) => {
    console.error(error);
  });
