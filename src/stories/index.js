/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import Filestack from '../components/Filestack';
import PictureFrame from '../components/FrameSelector/PictureFrame';
import FrameSelector from '../components/FrameSelector';
// import UploadThumbnail from '../components/UploadThumbnail';
// import ImageList from '../components/ImageList';
import Counter from '../components/Counter';

// import './foundation.scss';

// import imgMock from '../imgs/mock-img-vertical.jpg';

import '../components/Thumbnail/Thumbnail.story';
import '../components/SquareContainer/SquareContainer.story';
import '../components/Product/Product.story';
import '../components/ImageList/ImageList.story';
// import '../components/ImageEditorUI/ImageEditorUI.story';
import '../components/Cart/Progress.story';
import '../components/Scrollable/Scrollable.story';

addDecorator(story => <div id='cropshop_app'>{story()}</div>);

storiesOf('Frame', module).add('8x16', () => {
  return (
    <div style={{ height: '300px', width: '300px' }}>
      <PictureFrame dimensions={[8, 16]} />
    </div>
  );
});

storiesOf('Frame Selector', module).add('basic', () => {
  const frames = [[8, 8], [8, 12], [12, 8], [8, 16], [16, 8]];
  return <FrameSelector frames={frames} />;
});
const filestackAPIKey = 'AA1ZGkqsZT1Ca96rjT6mKz';
storiesOf('Filestack', module)
  .addDecorator(story => (
    <div style={{ width: '100vw', height: '100vh' }}>{story()}</div>
  ))
  .add('Upload', () => {
    return <Filestack.Upload apiKey={filestackAPIKey} />;
  })
  .add('Edit', () => {
    return (
      <Filestack.Edit
        apiKey={filestackAPIKey}
        file='https://cdn.filestackcontent.com/UfxVvzDDTkqquiJL3CSI'
      />
    );
  });

storiesOf('Counter', module).add('basic', () => (
  <Counter count={3} updateCount={() => console.log('yay button')} />
));
