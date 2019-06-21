import React from 'react';
import PropTypes from 'prop-types';

import Graphic from './Graphic';

const Rect = (props) => {
  const {height, width} = props;

  // NOTE The thought came to me to control the aspect ratio of this with making the
  //      largest passed value of height and width the value for the viewbox so that the
  //      SVG is always square.
  //
  //      I've concluded that this should be handled by the container, and not the SVG.
  //      Use the SquareContainer component instead of adding the functionality here.
  //
  //      Yes it's one more <div> layer, but the seperation of functionality in display is
  //      far more defined in that respect. At least that's what I hope.

  return (
    <Graphic viewBox={[width, height]}>

      <rect x='0' y='0' height={height} width={width} />

    </Graphic>
  );
}

Rect.propTypes = {
  height: PropTypes.number,
  width:  PropTypes.number,
  fill:   PropTypes.string
};

export default Rect;
