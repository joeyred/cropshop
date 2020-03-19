// React
import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line

import styles from './PriceDisplay.module.scss';

const PriceDisplay = props => {
  const { price } = props;
  return (
    <div className={styles.price}>
      <span className={styles['currency-symbol']}>$</span>
      <span>{price}</span>
    </div>
  );
};

PriceDisplay.defaultProps = {
  price: 'Unavailable'
};

PriceDisplay.propTypes = {
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default PriceDisplay;
