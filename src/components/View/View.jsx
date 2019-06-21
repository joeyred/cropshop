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
import sizeMe from 'react-sizeme';

import Edit from '../../views/Edit';
import Gallery from '../../views/Gallery';
import Upload from '../../views/Upload';
import Preview from '../../views/Preview';
import AddingToCart from '../../views/AddingToCart';

import { Views } from '../../globals';

const viewToRender = currentView => {
  if (currentView === Views.UPLOAD) {
    return <Upload />;
  }
  if (currentView === Views.GALLERY) {
    return <Gallery />;
  }
  if (currentView === Views.EDIT) {
    return <Edit />;
  }
  if (currentView === Views.PREVIEW) {
    return <Preview />;
  }
  if (currentView === Views.ADDING_TO_CART) {
    return <AddingToCart />;
  }
  return null;
};

const View = props => {
  const { currentView } = props;

  return <div style={{ height: '100%' }}>{viewToRender(currentView)}</div>;
};
View.propTypes = {
  currentView: PropTypes.oneOf([
    'upload',
    'gallery',
    'edit',
    'preview',
    'adding-to-cart'
  ]).isRequired
};

export default sizeMe({ monitorHeight: true })(View);
