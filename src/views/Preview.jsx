/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Cell, Button, Colors } from 'react-foundation';
import { Filelink } from 'filestack-js';

import * as NavActionCreators from '../redux/actions/nav';
import { saveEdit } from '../redux/actions/image';
import { Views } from '../globals';
// import EditPreview from '../components/EditPreview';
import { scaleCrop, generateTransform } from '../utils/transformations';

import styles from './Preview.module.scss';

const mapStateToProps = state => ({
  apiKey: state.filestack.key,
  imageProps: state.editor.imageProps,
  rotate: state.editor.rotate,
  zoom: state.editor.zoom,
  flip: state.editor.flip,
  flop: state.editor.flop,
  crop: state.editor.crop,
  images: state.image.images,
  frames: state.frame.frames,
  selectedFrameId: state.frame.selectedFrameId,
  selectedCollectionId: state.frame.selectedCollectionId,
  currentIdBeingEdited: state.gallery.currentIdBeingEdited
});

const save = ({
  imageId,
  // productId,
  // productVariantId,
  frameId,
  collectionId,
  previewUrl,
  transformations,
  dispatch
}) => {
  // console.log(frameId);
  dispatch(
    saveEdit(imageId, frameId, collectionId, previewUrl, transformations)
  );
  dispatch(NavActionCreators.updateView(Views.GALLERY));
};

const Preview = props => {
  const {
    apiKey,
    imageProps,
    zoom,
    rotate,
    flip,
    flop,
    crop,
    dispatch,
    images,
    selectedFrameId,
    selectedCollectionId,
    currentIdBeingEdited
  } = props;
  const linkedImage = new Filelink(
    images.byId[currentIdBeingEdited].handle,
    apiKey
  );
  const updateView = bindActionCreators(NavActionCreators.updateView, dispatch);
  // const { productId, productVariantId } = frames.byId[selectedFrameId];
  // const { previewUrl } = images.byId[currentIdBeingEdited];
  // const imageSrc = images.byId[currentIdBeingEdited].url;

  const newCrop = scaleCrop({ imageProps, crop, zoom });
  const edit = { flip, flop, rotate, crop: newCrop };
  const preview = generateTransform(linkedImage, edit);

  return (
    <Grid vertical className={styles.container}>
      <Cell>
        <h1>Like what you see?</h1>
      </Cell>
      <Cell className={styles.preview}>
        {/* <EditPreview
          imageId={currentIdBeingEdited}
          imageSrc={imageSrc}
          imageProps={imageProps}
          crop={crop}
        /> */}
        <img src={preview.url} alt='Preview of your Edit' />
      </Cell>
      <Cell>
        <Grid className='align-center-middle text-center'>
          <Cell className='auto'>
            <Button
              color={Colors.SECONDARY}
              onClick={() => updateView(Views.EDIT)}
            >
              Revert
            </Button>
          </Cell>
          <Cell className='auto'>
            <Button
              color={Colors.PRIMARY}
              onClick={() =>
                save({
                  imageId: currentIdBeingEdited,
                  frameId: selectedFrameId,
                  collectionId: selectedCollectionId,
                  previewUrl: preview.url,
                  transformations: edit,
                  dispatch
                })
              }
            >
              Save
            </Button>
          </Cell>
        </Grid>
      </Cell>
    </Grid>
  );
};

export default connect(mapStateToProps)(Preview);
