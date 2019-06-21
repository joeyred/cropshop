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

// import {
//   Grid,
//   Cell,
//   Colors
// } from 'react-foundation';

import ToolbarButton from './ToolbarButton';
import ToolbarGroup from './ToolbarGroup';

// import Icon from '../components/Icon';

import styles from './Toolbar.module.scss';

class Toolbar extends Component {
  static Group = ToolbarGroup;

  static Button = ToolbarButton;

  render() {
    const {
      children,
      // className,
    } = this.props;
    return (
      <div className={styles.container}>
        {children}
      </div>
    );
  }
}

export default Toolbar;
