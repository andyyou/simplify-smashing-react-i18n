import React from 'react';
import {
  FormattedDate,
  FormattedRelative,
  FormattedNumber,
  FormattedMessage,
  intlShape,
  injectIntl,
  defineMessages,
} from 'react-intl';
import LocaleButton from './LocaleButton';

const messages = defineMessages({
  helloWorld2: {
    id: 'app.hello_world2',
    defaultMessage: 'Hello World 2!',
  },
  counting: {
    id: 'app.counting',
    defaultMessage: 'I need to buy {count, number} {count, plural, one {apple} other {apples}}'
  }
});
const App =  (props) => (
  <div className="App">
    <FormattedMessage
      id="app.hello_world"
      defaultMessage="Hello World!"
      description="Hello world header greeting"
    />
    <div>{props.intl.formatMessage(messages.helloWorld2)}</div>
    <div>{props.intl.formatMessage(messages.counting, { count: 1 })}</div>
    <div>{props.intl.formatMessage(messages.counting, { count: 2 })}</div>
    <div>{props.intl.formatMessage(messages.counting, { count: 5 })}</div>
    {Date.now()}
    <div><FormattedDate value={Date.now()} /></div>
    <div><FormattedNumber value="1000" currency="USD" currencyDisplay="symbol" style="currency" /></div>
    <div><FormattedRelative value={Date.now()} /></div>
    <LocaleButton locale={props.intl.locale} />
  </div>
);

App.propTypes = {
  intl: intlShape.isRequired,
};
export default injectIntl(App);
