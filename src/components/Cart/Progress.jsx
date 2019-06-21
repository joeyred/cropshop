/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line

import Icon from '../Icon';

import styles from './Progress.module.scss';

const Progress = props => {
  const { itemsAdded, totalItems, finished } = props;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = itemsAdded / totalItems;
  // const generateDashOffset = () => {
  //
  //   return circumference * (1 - progress);
  // };

  const style = {
    strokeDashoffset: circumference * (1 - progress),
    strokeDasharray: circumference
  };
  const progressText = (
    <div className={styles['progress-text']}>
      <span className={styles.count}>{itemsAdded}</span>
      <span className={styles.of}>of</span>
      <span className={styles.count}>{totalItems}</span>
    </div>
  );
  const done = (
    <div className={styles.done}>
      <Icon name='Done' inline={false} className={styles.icon} />
    </div>
  );
  const wrapperCss = finished
    ? `${styles['progress-wrapper']} ${styles.finished}`
    : styles['progress-wrapper'];
  return (
    <div className={wrapperCss}>
      <div className={styles.content}>
        <div className={styles.inner}>{finished ? done : progressText}</div>
      </div>

      <div className={styles['donut-wrapper']}>
        <svg
          className={styles.donut}
          width='120'
          height='120'
          viewBox='0 0 120 120'
        >
          <circle
            className={styles.meter}
            cx='60'
            cy='60'
            r='54'
            strokeWidth='8'
          />
          <circle
            className={styles.value}
            cx='60'
            cy='60'
            r='54'
            strokeWidth='8'
            style={style}
          />
        </svg>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  finished: false
};

Progress.propTypes = {
  itemsAdded: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired
};

export default Progress;
