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

import {
  Button
  // Colors
} from 'react-foundation';
// import toUpper from 'lodash/toUpper';
import Icon from '../Icon';

import styles from './Toolbar.module.scss';

const ToolbarButton = props => {
  const {
    icon,
    rotateIcon,
    label,
    color,
    disabled,
    handleClick,
    handleMouseDown,
    handleMouseUp
  } = props;
  const attributes = {};
  if (disabled) {
    attributes.onClick = e => {
      e.preventDefault();
    };
    attributes.onMouseDown = e => {
      e.preventDefault();
    };
    attributes.onMouseUp = e => {
      e.preventDefault();
    };
  } else {
    if (handleClick) attributes.onClick = handleClick;
    if (handleMouseDown) attributes.onMouseDown = handleMouseDown;
    if (handleMouseUp) attributes.onMouseUp = handleMouseUp;
  }

  return (
    <Button color={color} isDisabled={disabled} {...attributes}>
      <Icon
        name={icon}
        rotate={rotateIcon}
        inline={false}
        className={styles.icon}
      />
      <span>{label}</span>
    </Button>
  );
};

ToolbarButton.defaultProps = {
  color: 'primary',
  rotateIcon: 0,
  disabled: false,
  handleClick: false,
  handleMouseDown: false,
  handleMouseUp: false
};

ToolbarButton.propTypes = {
  handleClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  handleMouseDown: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  handleMouseUp: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  icon: PropTypes.string.isRequired,
  rotateIcon: PropTypes.number,
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'warning',
    'alert'
  ]),
  disabled: PropTypes.bool
};

export default ToolbarButton;
