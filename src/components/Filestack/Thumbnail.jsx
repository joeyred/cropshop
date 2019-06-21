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
import { Filelink } from 'filestack-js';

import { connect } from 'react-redux';

import Image from '../Image';
import SquareContainer from '../SquareContainer';

const mapStateToProps = state => ({
  apiKey: state.filestack.apiKey,
  breakpoint: state.size.breakpoint
});

const Thumbnail = props => {
  const { handle, alt, square, apiKey, breakpoint } = props;
  const size = {
    sm: 500,
    md: 700,
    lg: 1000,
    xl: 1000,
    xxl: 1000
  };

  const squareThumbnail = new Filelink(handle, apiKey);
  const pureSrc = squareThumbnail.toString();
  console.log(pureSrc);
  const src = square
    ? squareThumbnail
        .resize({
          fit: 'crop',
          height: size[breakpoint],
          width: size[breakpoint]
        })
        .toString()
    : pureSrc;
  return (
    <SquareContainer>
      <Image src={src} alt={alt} />
    </SquareContainer>
  );
};

Thumbnail.defaultProps = {
  square: true,
  alt: ''
};

Thumbnail.propTypes = {};

export default connect(mapStateToProps)(Thumbnail);
