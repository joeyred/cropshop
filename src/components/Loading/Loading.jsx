/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

const Loading = props => {
  const { loading, children, type, color } = props;

  const loadingAnimation = <Spinner name={type} color={color} />;

  const display = loading ? loadingAnimation : children;

  return <React.Fragment>{display}</React.Fragment>;
};

Loading.defaultProps = {
  type: 'three-bounce',
  color: 'blue'
};

Loading.propTypes = {};

export default Loading;
