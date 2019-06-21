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
import uniqid from 'uniqid';

import { updatePreview } from '../../redux/actions/image';
import store from '../../redux/store';

class EditPreview extends Component {
  state = {
    image: null,
    loading: true
  };

  componentDidMount() {
    const { imageId, imageSrc, imageProps, crop } = this.props;
    this.makeClientCrop(imageId, imageSrc, imageProps, crop);
  }

  getCroppedImg(imageSrc, imageProps, crop, fileName) {
    // create canvas
    const canvas = document.createElement('canvas');
    // create empty img
    const imgElement = document.createElement('img');
    // set image src
    imgElement.src = imageSrc;

    // console.log(imgElement);

    // Get scale
    const scaleX = imageProps.naturalWidth / imageProps.width;
    const scaleY = imageProps.naturalHeight / imageProps.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      imageProps.ref,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        if (!blob) {
          // reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);

        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  async makeClientCrop(imageId, imageSrc, imageProps, crop) {
    // const { dispatch } = this.props;
    const croppedImageUrl = await this.getCroppedImg(
      imageSrc,
      imageProps,
      crop,
      `${imageId}_preview-${uniqid()}.jpg`
    );
    store.dispatch(updatePreview({ imageId, url: croppedImageUrl }));
    this.setState({ image: croppedImageUrl });
  }

  render() {
    const { image } = this.state;
    return <div>{image && <img alt='Crop' src={image} />}</div>;
  }
}

export default EditPreview;
