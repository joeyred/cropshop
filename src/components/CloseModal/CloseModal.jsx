/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { AppAtts } from '../../globals';
import { closeModal } from '../../utils/CropShopButton';

import styles from './CloseModal.module.scss';

const CloseModal = () => {
  return (
    <button
      type='button'
      className={styles.button}
      aria-label='Close modal'
      onClick={() => closeModal(AppAtts.MODAL_ID)}
    />
  );
};

export default CloseModal;
