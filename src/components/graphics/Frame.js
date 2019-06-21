import React from 'react';
import PropTypes from 'prop-types';
// import { parseInt } from 'lodash';

import Graphic from './Graphic';

const Frame = props => {
  const width = parseInt(props.width, 10);
  const height = parseInt(props.height, 10);

  // Find the greater value and assign it as the dimensions to be used for the viewbox.
  const box = width > height ? width : height;
  // console.log('frame - greatest dimension:\n', box);
  // const test = width >= height ? width : height;
  const xy = {};

  if (height > width) {
    xy.x = (height - width) / 2;
    xy.y = 0;
  } else {
    xy.x = 0;
    xy.y = (width - height) / 2;
  }

  return (
    <Graphic viewBox={box}>
      <rect {...xy} height={height} width={width} />
    </Graphic>
  );
};

Frame.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  fill: PropTypes.string
};

export default Frame;
