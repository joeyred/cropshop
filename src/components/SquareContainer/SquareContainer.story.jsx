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

import SquareContainer from './SquareContainer';

const containerBackground = {background: '#cacaca'};

storiesOf('Components|SquareContainer', module)
.addDecorator((story) =>
  <div style={{maxWidth: '300px', maxHeight: '300px', padding: '1rem'}}>
    {story()}
  </div>
)
.add('wide content', () =>
  <SquareContainer style={containerBackground}>
    <div style={{background: '#f76e87'}}>
      Ambitioni dedisse scripsisse iudicaretur.
    </div>
  </SquareContainer>
)
.add('tall content', () =>
<SquareContainer style={containerBackground}>
  <div style={{background: '#f76e87', width: '80px'}}>
    Ambitioni dedisse scripsisse iudicaretur.
    Ambitioni dedisse scripsisse iudicaretur.
  </div>
</SquareContainer>
)
.add('centered content', () =>
  <SquareContainer centerContent={true} style={containerBackground}>
    <div style={{background: '#f76e87'}}>
      Ambitioni dedisse scripsisse iudicaretur.
    </div>
  </SquareContainer>
)
.add('tall centered content', () =>
<SquareContainer centerContent={true} style={containerBackground}>
  <div style={{background: '#f76e87', width: '80px'}}>
    Ambitioni dedisse scripsisse iudicaretur.
    Ambitioni dedisse scripsisse iudicaretur.
  </div>
</SquareContainer>
)
.add('overflow hidden', () =>
<SquareContainer overflow={false} style={containerBackground}>
  <div style={{background: '#f76e87', width: '80px'}}>
    Ambitioni dedisse scripsisse iudicaretur.
    Ambitioni dedisse scripsisse iudicaretur.
    Ambitioni dedisse scripsisse iudicaretur.
    Ambitioni dedisse scripsisse iudicaretur.
    Ambitioni dedisse scripsisse iudicaretur.
    Ambitioni dedisse scripsisse iudicaretur.
    Ambitioni dedisse scripsisse iudicaretur.
    Ambitioni dedisse scripsisse iudicaretur.
    Ambitioni dedisse scripsisse iudicaretur.
    Ambitioni dedisse scripsisse iudicaretur.
  </div>
</SquareContainer>
)
;
