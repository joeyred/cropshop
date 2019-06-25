/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line

import styles from './Image.module.scss';

class Image extends Component {
  state = {
    loading: true
  };

  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    style: PropTypes.shape({})
  };

  static defaultProps = {
    style: {}
  };

  render() {
    const { loading } = this.state;
    const { src, alt, style, className } = this.props;
    const atts = {};
    // const loading = true;

    const loadingOverlay = loading ? <div className={styles.overlay} /> : null;

    if (style) {
      atts.style = style;
    }
    if (className) {
      atts.className = className;
    }

    return (
      <div className={styles.container}>
        <img
          src={src}
          alt={alt}
          onLoad={() => this.setState({ loading: false })}
          {...atts}
        />
        {loadingOverlay}
      </div>
    );
  }
}

export default Image;
