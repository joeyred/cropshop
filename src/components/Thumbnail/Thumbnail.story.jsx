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
// import { action } from '@storybook/addon-actions';

import Thumbnail from './Thumbnail';

import imgMockHorizontal from '../../imgs/mock-img-horizontal.jpg';
import imgMockVertical from '../../imgs/mock-img-vertical.jpg';


storiesOf('Components|Thumbnail', module)
.addDecorator((story) =>
  <div style={{maxWidth: '300px', maxHeight: '300px', padding: '1rem'}}>
    {story()}
  </div>
)
.add('aspect ratio preserved - horizontal image', () =>
  <Thumbnail src={imgMockHorizontal} fill={false} />
)
.add('aspect ratio preserved - vertical image', () =>
  <Thumbnail src={imgMockVertical} fill={false} />
)
.add('fill (auto-crop) - horizontal image', () =>
  <Thumbnail src={imgMockHorizontal} fill={true} />
)
.add('fill (auto-crop) - vertical image', () =>
  <Thumbnail src={imgMockVertical} fill={true} />
);
