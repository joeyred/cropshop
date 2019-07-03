/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Scrollable from './Scrollable';

const FillerItem = (
  <div
    style={{
      flex: '0 1 20%',
      // width: '20%',
      maxWidth: '20%',
      padding: '0.625rem',
      margin: '0 0.625rem 1rem',
      height: '50px',
      background: '#444'
    }}
  >
    Items!
  </div>
);

const Filler = props => {
  const { children, ...rest } = props;
  return (
    <div style={{ width: '100%' }} {...rest}>
      {children}
    </div>
  );
};

storiesOf('Components|Scrollable', module).add(
  'horizontal scroll - hint',
  () => {
    return (
      <Scrollable
        style={{ display: 'flex', width: '100%', flexFlow: 'row nowrap' }}
        asContainer={Filler}
        hint
        vertical={false}
      >
        {FillerItem}
        {FillerItem}
        {FillerItem}
        {FillerItem}
        {FillerItem}
        {FillerItem}
        {FillerItem}
        {FillerItem}
        {FillerItem}
      </Scrollable>
    );
  }
);
