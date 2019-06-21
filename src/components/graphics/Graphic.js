import React from 'react';
import PropTypes from 'prop-types';

const Graphic = (props) => {
  const {
    // min-x, min-y, width, height
    viewBox,
    height,
    width,
    display,
    keepRatio,
    fluid,
    style,
    attributes
  } = props;

  // Deal with building out the string value for viewBox if an array is passed
  if (viewBox.constructor === Array) {
    if (viewBox.length === 2) {
      attributes.viewBox = `0 0 ${viewBox[0]} ${viewBox[1]}`;
    }
    if (viewBox.length === 4) {
      attributes.viewBox = `${viewBox[0]} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}`;
    }
  } else {
    attributes.viewBox = `0 0 ${viewBox} ${viewBox}`;
  }

  // Put all attributes together
  if (props.className) attributes.className = props.className;
  if (height) attributes.height = height;
  if (width) attributes.width = width;
  if (keepRatio) attributes.preserveAspectRatio = 'xMidYMid meet';
  if (fluid) attributes.style = {...style, height: '100%', width: '100%'};

  const element = display ?
    <svg
      xmlns='http://www.w3.org/2000/svg'
      {...attributes}
    >
      {props.children}
    </svg> : null;

  return display ? element : null;
}

Graphic.propTypes = {
  viewBox: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number
  ]).isRequired,
  height:     PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  width:      PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  display:    PropTypes.bool,
  keepRatio:  PropTypes.bool,
  fluid:      PropTypes.bool,
  style:      PropTypes.object,
  attributes: PropTypes.object
};

Graphic.defaultProps = {
  height:     false,
  width:      false,
  display:    true,
  keepRatio:  true,
  fluid:      true,
  style:      {},
  attributes: {}
};

export default Graphic;
