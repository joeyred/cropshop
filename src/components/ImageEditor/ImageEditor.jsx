/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
import ReactCrop from 'react-image-crop';
import Spinner from 'react-spinkit';

import { calcCropFullCentered } from '../../utils/crop';
import styles from './ImageEditor.module.scss';

class ImageEditor extends Component {
  static defaultProps = {};

  static propTypes = {};

  constructor(props) {
    super(props);
    this.artboardRef = React.createRef();
  }

  onImageLoaded = image => {
    const {
      aspectRatioArray,
      storeImageDimensions,
      updateArtboardDimensions,
      artboardDimensions,
      artboardPadding,
      imageDimensions,
      updateCrop,
      handleLoadingStatus
    } = this.props;
    const propsToStore = {
      ref: image,
      width: image.offsetWidth,
      height: image.offsetHeight,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight
    };
    // console.log(propsToStore);
    // console.log(imageDimensions);
    const crop = calcCropFullCentered(
      aspectRatioArray[0],
      aspectRatioArray[1],
      imageDimensions.width,
      imageDimensions.height
    );
    // console.log(crop);

    // storeImageDimensions(propsToStore);
    updateCrop({
      ...crop,
      aspect: aspectRatioArray[0] / aspectRatioArray[1]
    });
    updateArtboardDimensions(
      artboardDimensions,
      artboardPadding,
      imageDimensions
    );
    handleLoadingStatus(false);
    // console.log('loaded image');
    // this.forceUpdate();
  };

  render() {
    const {
      imageSrc,
      imageDimensions,
      height,
      crop,
      artboardDimensions,
      artboardPadding,
      updateCrop,
      loadingStatus
    } = this.props;
    // const loadingStatus = true;
    return (
      <div className={styles.container} style={{ height: `${height}px` }}>
        <div className={styles.deadspace} style={{ height: `${height}px` }}>
          <div
            className={styles.artboard}
            style={{
              width: artboardDimensions.width,
              height: artboardDimensions.height,
              padding: `${artboardPadding}px`
            }}
            ref={this.artboardRef}
          >
            {/* TODO Insert loading overlay */}
            <ReactCrop
              src={imageSrc}
              style={{
                height: `${imageDimensions.height}px`,
                width: `${imageDimensions.width}px`
              }}
              imageStyle={{
                height: `${imageDimensions.height}px`,
                width: `${imageDimensions.width}px`
              }}
              // crop={crop.width ? crop : tempCrop}
              crop={crop}
              minHeight={30}
              minWidth={30}
              onChange={updateCrop}
              onImageLoaded={this.onImageLoaded}
              keepSelection
            >
              {loadingStatus && (
                <div
                  className={styles.overlay}
                  style={{
                    height: `${imageDimensions.height}px`,
                    width: `${imageDimensions.width}px`
                  }}
                >
                  <Spinner fadeIn='none' name='three-bounce' color='#f76e87' />
                </div>
              )}
            </ReactCrop>
          </div>
        </div>
      </div>
    );
  }
}

ImageEditor.defaultProps = {};

ImageEditor.propTypes = {};

export default ImageEditor;
