/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types'; //eslint-disable-line

import classnames from 'classnames';
import {
  MdFlip,
  MdRotateRight,
  MdRotateLeft,
  MdZoomIn,
  MdZoomOut,
  MdApps,
  MdPhonelinkLock,
  MdDone,
  MdRemove,
  MdAdd,
  MdAddShoppingCart,
  MdArrowForward,
  MdModeEdit,
  MdFileUpload
} from 'react-icons/md';

import styles from './Icon.module.scss';

const MdIcons = {
  MdFlip,
  MdRotateRight,
  MdRotateLeft,
  MdZoomIn,
  MdZoomOut,
  MdApps,
  MdPhonelinkLock,
  MdDone,
  MdRemove,
  MdAdd,
  MdAddShoppingCart,
  MdArrowForward,
  MdModeEdit,
  MdFileUpload
};

const Icon = props => {
  const { name, inline, rotate, className } = props;
  const Element = MdIcons[`Md${name}`];

  const css = classnames(
    rotate !== 0 ? styles[`rotate-${rotate}`] : null,
    inline ? styles['inline-block'] : styles.block,
    className
  );

  if (!Element) {
    return (
      <div style={{ background: 'red', color: 'white' }}>
        Error: Icon Not Found
      </div>
    );
  }

  return (
    <span className={css}>
      <Element />
    </span>
  );
};

Icon.defaultProps = {
  rotate: 0,
  inline: true
};

Icon.propTypes = {
  rotate: PropTypes.number,
  inline: PropTypes.bool,
  name: PropTypes.oneOf([
    'Flip',
    'RotateRight',
    'RotateLeft',
    'ZoomIn',
    'ZoomOut',
    'Apps',
    'PhonelinkLock',
    'Done',
    'Remove',
    'Add',
    'AddShoppingCart',
    'ArrowForward',
    'ModeEdit',
    'FileUpload'
  ]).isRequired
};

export default Icon;
