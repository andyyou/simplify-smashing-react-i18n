import React from 'react';
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';

const LocaleButton = (props) => {
  const handleClick = () => {
    Cookie.set('locale', props.locale === 'en' ? 'ru' : 'en');
    window.location.reload();
  };

  return (
    <button onClick={handleClick}>
      {props.locale === 'en' ? 'Russian' : 'English'}
    </button>
  );
};
LocaleButton.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default LocaleButton;
