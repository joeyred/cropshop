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

import styles from './Toolbar.module.scss';

const ToolbarGroup = (props) => {
  const {
    children,
    label
  } = props;

  const labelElement = label ? <span>{label}</span> : null;

  return (
    <div className={styles.group}>
      {labelElement}
      <div>
        {children}
      </div>

    </div>
  );
}

ToolbarGroup.defaultProps = {
  label: false
};

ToolbarGroup.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default ToolbarGroup;
