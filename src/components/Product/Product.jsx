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
import classnames from 'classnames';
import { Label, Colors } from 'react-foundation';

// import Thumbnail from '../Thumbnail';
import Filestack from '../Filestack';
import Icon from '../Icon';
import Image from '../Image';

import styles from './Product.module.scss';

const Product = props => {
  const { handle, handleClick, isEdited, mode, frame, previewSrc } = props;
  // console.log('Frame for this Product:\n', frame);
  const style = props.style ? props.style : null;
  const containerClasses = classnames(
    styles.container,
    props.className ? props.className : null
  );

  const editLabel = isEdited ? (
    <div className={styles.label}>
      <Label color={Colors.SUCCESS}>
        <Icon name='Done' /> Edited
      </Label>
    </div>
  ) : null;
  const editModeOutput = (
    <button
      type='button'
      className={containerClasses}
      onClick={handleClick}
      style={style}
    >
      <Filestack.Thumbnail handle={handle} />
      {editLabel}
    </button>
  );
  const cartModeOutput = (
    <div className={containerClasses} style={style}>
      {/* <Filestack.Thumbnail handle={handle} square={false} /> */}
      <Image src={previewSrc} alt='Preview' className={styles.image} />
      <div className={styles.label}>
        <Label color={Colors.SECONDARY}>
          {`${frame.width} x ${frame.height}`}
        </Label>
      </div>
    </div>
  );
  const output = mode === 'edit';
  return output ? editModeOutput : cartModeOutput;
};

Product.defaultProps = {
  mode: 'edit',
  isEdited: false,
  frame: { width: 0, height: 0 },
  previewSrc: ''
};

Product.propTypes = {
  /**
   * Filestack Handle
   * @type {String}
   */
  handle: PropTypes.string,
  /**
   * The current view mode
   * @type {String} - accepts `edit` or `cart`.
   */
  mode: PropTypes.oneOf(['edit', 'cart']),
  /**
   * The click handler for when the product is in `edit` mode
   * @type {Function}
   */
  handleClick: PropTypes.func,
  /**
   * Whether or not the uploaded image has a saved edit
   * @type {Boolean}
   */
  isEdited: PropTypes.bool,
  /**
   * The frame dimensions
   * @type {Array}
   */
  frame: PropTypes.shape({ width: PropTypes.number, height: PropTypes.number })
};

export default Product;
