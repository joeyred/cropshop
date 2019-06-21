/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// import PropTypes from 'prop-types';

import Frame from '../graphics/Frame';

import styles from './PictureFrame.module.scss';

const PictureFrame = props => {
  const { dimensions } = props;
  const { width, height } = dimensions;

  // const width = dimensions[0];
  // const height = dimensions[1];

  return (
    <div className={styles.container}>

      <figure className={styles.frame}>
        <Frame width={width} height={height} />
        <figcaption className={styles.text}>
          <div>{`${width} x ${height}`}</div>
        </figcaption>
      </figure>

    </div>
  );
};

PictureFrame.defaultProps = {};

PictureFrame.propTypes = {
  // dimensions: PropTypes.array
};

export default PictureFrame;
