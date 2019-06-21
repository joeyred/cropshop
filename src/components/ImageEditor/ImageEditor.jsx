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
// import _ from 'lodash';
import ReactCrop from 'react-image-crop';

import { calcCropFullCentered } from '../../utils/crop';
// import { storeImageDimensions } from '../../redux/actions/editor';

// import Cropper from 'react-cropper';

// import 'cropperjs/dist/cropper.css';
import styles from './ImageEditor.module.scss';

class ImageEditor extends Component {
  static defaultProps = {};

  static propTypes = {};

  constructor(props) {
    super(props);
    this.artboardRef = React.createRef();
  }

  onImageLoaded = image => {
    const { aspectRatioArray, storeImageDimensions, updateCrop } = this.props;
    const propsToStore = {
      ref: image,
      height: image.offsetHeight,
      width: image.offsetWidth,
      naturalHeight: image.naturalHeight,
      naturalWidth: image.naturalWidth
    };
    // console.log(propsToStore);
    const crop = calcCropFullCentered(
      aspectRatioArray[0],
      aspectRatioArray[1],
      image.offsetWidth,
      image.offsetHeight
    );
    // console.log(crop);
    storeImageDimensions(propsToStore);
    updateCrop({
      ...crop,
      aspect: aspectRatioArray[0] / aspectRatioArray[1]
    });
    // console.log('loaded image');
    // this.forceUpdate();
  };

  render() {
    const { imageSrc, crop, updateCrop } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.deadspace}>
          <div
            className={styles.artboard}
            // style={{
            //   width: artboardDimensions.width,
            //   height: artboardDimensions.height
            // }}
            ref={this.artboardRef}
          >
            <ReactCrop
              src={imageSrc}
              // imageStyle={imageStyle}
              // crop={crop.width ? crop : tempCrop}
              crop={crop}
              keepSelection
              onChange={updateCrop}
              onImageLoaded={this.onImageLoaded}
            />
          </div>
        </div>
      </div>
    );
  }
}

ImageEditor.defaultProps = {};

ImageEditor.propTypes = {};

export default ImageEditor;
