import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sizeMe from 'react-sizeme';
import ReactCrop from 'react-image-crop';
import Spinner from 'react-spinkit';
import { Cell } from 'react-foundation';

import {
  updateWorkspaceSize,
  updateLoadingStatus,
  // updateCropFullCenter,
  updateCrop as updateCropActionCreator
} from '../../redux/actions/editor';

import AppHU from '../AppHU';

import styles from './Workspace.module.scss';

const mapStateToProps = ({ editor }) => {
  const {
    imageProps,
    loading,
    rotate,
    zoom,
    flip,
    flop,
    crop,
    containerSize,
    artboardSize,
    artboardPadding,
    imageSizeRendered
  } = editor;

  return {
    imageProps,
    loading,
    rotate,
    zoom,
    flip,
    flop,
    crop,
    containerSize,
    artboardSize,
    artboardPadding,
    imageSizeRendered
  };
};

const SizeAwareAppHU = sizeMe({ monitorHeight: true })(AppHU);

class Workspace extends Component {
  static propTypes = {
    heightToSubtract: PropTypes.number,
    frameSize: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired,
    imageSrc: PropTypes.string.isRequired,
    imageSize: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired
  };

  static defaultProps = {
    heightToSubtract: 0
  };

  // componentDidMount() {
  //   const { frameSize, imageSizeRendered, dispatch } = this.props;
  //   dispatch(updateCropFullCenter(frameSize, imageSizeRendered));
  // }

  onSize = size => {
    const { imageSize, rotate, frameSize, dispatch } = this.props;
    dispatch(updateWorkspaceSize(size, imageSize, frameSize, 16, rotate));
  };

  onImageLoaded = () => {
    const { dispatch } = this.props;
    dispatch(updateLoadingStatus(false));
    // console.log(frameSize, imageSizeRendered);
    // dispatch(updateCropFullCenter(frameSize, imageSizeRendered));
    // dispatch(updateCropFullCenter(frameSize, imageSizeRendered));
  };

  render() {
    const {
      heightToSubtract,
      loading,
      containerSize,
      artboardSize,
      artboardPadding,
      imageSrc,
      imageSizeRendered,
      crop,
      dispatch
    } = this.props;
    const updateCrop = bindActionCreators(updateCropActionCreator, dispatch);

    const imageSizeStyle = {
      height: `${imageSizeRendered.height}px`,
      width: `${imageSizeRendered.width}px`
    };
    return (
      <SizeAwareAppHU
        heightToSubtract={heightToSubtract}
        asContainer={Cell}
        onSize={this.onSize}
      >
        <div
          className={styles.container}
          style={{ height: `${containerSize.height}px` }}
        >
          <div
            className={styles.deadspace}
            style={{ height: `${containerSize.height}px` }}
          >
            <div
              className={styles.artboard}
              style={{
                width: `${artboardSize.width}px`,
                height: `${artboardSize.height}px`,
                padding: `${artboardPadding}px`
              }}
            >
              <ReactCrop
                src={imageSrc}
                className={loading ? styles.hideCrop : null}
                style={imageSizeStyle}
                imageStyle={imageSizeStyle}
                crop={crop}
                minHeight={30}
                minWidth={30}
                onChange={updateCrop}
                onImageLoaded={this.onImageLoaded}
                keepSelection
              >
                {loading && (
                  <div className={styles.overlay} style={imageSizeStyle}>
                    <Spinner
                      fadeIn='none'
                      name='three-bounce'
                      color='#f76e87'
                    />
                  </div>
                )}
              </ReactCrop>
            </div>
          </div>
        </div>
      </SizeAwareAppHU>
    );
  }
}

Workspace.propTypes = {};

export default connect(mapStateToProps)(Workspace);
