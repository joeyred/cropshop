import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppHU from '../components/AppHU';

// - available height
// - image size
// - image orientation?
// - rotation

const mapStateToProps = ({ editor }) => {
  const {
    imageProps,
    rotate,
    zoom,
    flip,
    flop,
    crop,
    artboardSize,
    artboardPadding,
    imageSize
  } = editor;

  return {
    imageProps,
    rotate,
    zoom,
    flip,
    flop,
    crop,
    artboardSize,
    artboardPadding,
    imageSize
  };
};

class Workspace extends Component {
  static propTypes = {};

  handleDimensions = imageSize => {
    const { rotate } = this.props;

    if (rotate === 90 || rotate === 270) {
      // console.log('rotation applied');
      return {
        width: imageSize.height,
        height: imageSize.width
      };
    }
    return {
      width: imageSize.width,
      height: imageSize.height
    };
  };

  render() {
    return (

    );
  }
}

Workspace.propTypes = {};

export default Workspace;
