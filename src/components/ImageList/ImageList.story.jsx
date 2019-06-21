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

import ImageList from './ImageList';

import imgMockHorizontal from '../../imgs/mock-img-horizontal.jpg';
import imgMockVertical from '../../imgs/mock-img-vertical.jpg';

const images = [
  {
    edited: true,
    handle: 'xyxtxyeirhfhfudj',
    url: imgMockHorizontal,
    frame: [8, 8],
    count: 1,
  },
  {
    edited: false,
    handle: 'iadifdhshgweghhdf',
    url: imgMockVertical,
  },
  {
    edited: true,
    handle: 'sjkfoishbaskjldg',
    url: imgMockHorizontal,
    frame: [12, 8],
    count: 1,
  },
  {
    edited: false,
    handle: 'audfiughsdhfisbd',
    url: imgMockHorizontal,
  },
  {
    edited: true,
    handle: 'uydydbgfhufhfhffg',
    url: imgMockVertical,
    frame: [8, 12],
    count: 1,
  },
  {
    edited: true,
    handle: 'odiuddnfgfttdgddd',
    url: imgMockHorizontal,
    frame: [8, 16],
    count: 1,
  },
];

const responsiveItemsPerRow = {
  small: 2,
  medium: 3,
  large: 4,
  xlarge: 5,
  xxlarge: 6.
};

storiesOf('Components|ImageList', module)
.addDecorator((story) =>
  <div style={{maxWidth: '900px', padding: '1rem'}}>
    {story()}
  </div>
)
.add('edit mode - default per row', () =>
  <ImageList
    images={images}
    isEditing={true}
    handleClick={action('clicked')}
  />
)
.add('edit mode - 2 per row', () =>
  <ImageList
    images={images}
    itemsPerRow={2}
    isEditing={true}
    handleClick={action('clicked')}
  />
)
.add('edit mode - responsive', () =>
  <ImageList
    images={images}
    itemsPerRow={responsiveItemsPerRow}
    isEditing={true}
    handleClick={action('clicked')}
  />
)
.add('cart mode - default per row', () =>
<ImageList
  images={images}
  itemsPerRow={responsiveItemsPerRow}
  isEditing={false}
  handleClick={action('clicked')}
/>
)
;
