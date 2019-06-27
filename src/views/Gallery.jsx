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
// import { compact, map, indexOf } from 'lodash';
import compact from 'lodash/compact';
import map from 'lodash/map';
import indexOf from 'lodash/indexOf';
import sizeMe from 'react-sizeme';

import {
  TopBarLeft,
  TopBarRight,
  Button,
  Callout,
  Grid,
  GridContainer,
  Cell,
  Colors
} from 'react-foundation';

import Icon from '../components/Icon';
import CloseModal from '../components/CloseModal';
import TopBar from '../components/TopBar';
import ImageList from '../components/ImageList';
// import ContainerHeightUnits from '../components/ContainerHeightUnits';
import TopBarTitle from '../components/TopBarTitle';
import AppHU from '../components/AppHU';

import { Views } from '../globals';

import * as ImageActionCreators from '../redux/actions/image';
import * as GalleryActionCreators from '../redux/actions/gallery';
import * as NavActionCreators from '../redux/actions/nav';
import { doneEditing, addItemToCart } from '../redux/actions/cart';
import { updateComponentHeight } from '../redux/size';

import imageHasBeenEdited from '../utils/imageHasBeenEdited';

import styles from './Gallery.module.scss';

const SizeAwareCell = sizeMe({ monitorHeight: true, monitorWidth: false })(
  Cell
);

const mapStateToProps = state => ({
  images: state.image.images,
  frames: state.frame.frames,
  selectedCollectionId: state.frame.selectedCollectionId,
  isEditing: state.gallery.isEditing,
  imageHasBeenEdited: state.gallery.imageHasBeenEdited,
  // availableHeight: state.size.availableHeight,
  rowHeights: state.size.registeredHeights,
  breakpoint: state.size.breakpoint
});

const Gallery = props => {
  const {
    images,
    frames,
    selectedCollectionId,
    isEditing,
    rowHeights,
    // availableHeight,
    breakpoint,
    dispatch
  } = props;
  // console.log(images);
  // Check if an image has been edited
  const imageHasBeenUploaded = images.allIds.length > 0;
  let buttonRowHeight = 0;
  let headingRowHeight = 0;

  if (rowHeights) {
    buttonRowHeight = rowHeights.buttonRow ? rowHeights.buttonRow : 0;
    headingRowHeight = rowHeights.headingRow ? rowHeights.headingRow : 0;
  }
  console.log(buttonRowHeight + headingRowHeight);
  const updateEditMode = bindActionCreators(
    GalleryActionCreators.updateEditMode,
    dispatch
  );
  const setImageInEditor = bindActionCreators(
    GalleryActionCreators.setImageInEditor,
    dispatch
  );
  const updateQuantity = bindActionCreators(
    ImageActionCreators.updateQuantity,
    dispatch
  );

  const updateView = bindActionCreators(NavActionCreators.updateView, dispatch);

  const imageToEditor = id => {
    if (indexOf(images.allIds, id) !== -1) {
      setImageInEditor(id);
      updateView(Views.EDIT);
    }
  };

  const doneEditingClick = () => {
    doneEditing();
    updateEditMode(false);
  };

  const addToCart = () => {
    const items = map(images.allIds, id => {
      const image = images.byId[id];
      if (image.edited && image.quantity > 0) {
        return {
          quantity: image.quantity,
          id: frames.byId[image.edit[selectedCollectionId].frameId].variantId,
          properties: {
            _filestack_handle: image.handle,
            _filestack_img_url: image.edit[selectedCollectionId].previewSrc,
            _collection_name: selectedCollectionId,
            _edit: JSON.stringify(
              image.edit[selectedCollectionId].transformations
            ),
            filename: image.filename
          }
        };
      }
      return null;
    });
    dispatch(addItemToCart(compact(items)));
    dispatch(updateView(Views.ADDING_TO_CART));
  };

  const responsiveItemsPerRow = {
    small: 2,
    medium: 3,
    large: 4,
    xlarge: 5,
    xxlarge: 6
  };

  const buttonSize = {
    sm: 'small',
    md: 'small',
    lg: 'large',
    xl: 'large',
    xxl: 'large'
  };

  const AddToCart = (
    <Cell className='auto'>
      <Button
        color={Colors.PRIMARY}
        size={buttonSize[breakpoint]}
        onClick={() => addToCart()}
      >
        <Icon name='AddShoppingCart' /> Add to Cart
      </Button>
    </Cell>
  );

  const DoneEditing = (
    <Cell className='auto'>
      <Button
        color={Colors.PRIMARY}
        size={buttonSize[breakpoint]}
        onClick={() => doneEditingClick()}
        isDisabled={!imageHasBeenEdited(images, selectedCollectionId)}
      >
        Done Editing <Icon name='ArrowForward' />
      </Button>
    </Cell>
  );
  // console.log(imageHasBeenEdited(images, selectedCollectionId));
  const BackToEditing = (
    <Cell className='auto'>
      <Button
        color={Colors.SECONDARY}
        size={buttonSize[breakpoint]}
        onClick={() => updateEditMode(true)}
      >
        <Icon name='ModeEdit' /> Back to Editing
      </Button>
    </Cell>
  );

  const NoImagesCallout = imageHasBeenUploaded ? null : (
    <Callout color={Colors.ALERT}>
      <h5>No Images Have Been Uploaded!</h5>
      <p>
        It looks like you got to the gallery, but no images have been uploaded
        yet. Click the button below to get back to the image uploader!
      </p>
      <Button
        color={Colors.PRIMARY}
        size='small'
        onClick={() => updateView(Views.UPLOAD)}
      >
        <Icon name='FileUpload' /> Upload Images
      </Button>
    </Callout>
  );

  const headingText = isEditing
    ? 'Select an Image to Edit'
    : 'Update Product Quantities';

  return (
    <div>
      {/* Top Bar */}
      <TopBar>
        <TopBarLeft>
          <Button
            color={Colors.SECONDARY}
            size='small'
            onClick={() => updateView(Views.UPLOAD)}
          >
            <Icon name='FileUpload' /> Upload More Images
          </Button>

          <TopBarTitle />
        </TopBarLeft>

        <TopBarRight>
          <CloseModal />
        </TopBarRight>
      </TopBar>

      {/* Main Gallery */}
      <GridContainer className={styles['content-container']}>
        <Grid
          vertical
          gutters='padding'
          // className='grid-margin-y'
          // style={{ height: `${availableHeight}px` }}
        >
          <SizeAwareCell
            onSize={({ height }) =>
              dispatch(updateComponentHeight('buttonRow', height))
            }
          >
            <Grid vertical={false} className='align-center-middle text-center'>
              {isEditing ? null : AddToCart}
              {isEditing ? DoneEditing : null}
              {isEditing ? null : BackToEditing}
            </Grid>
          </SizeAwareCell>

          <SizeAwareCell
            onSize={({ height }) =>
              dispatch(updateComponentHeight('headingRow', height))
            }
          >
            <h2>{headingText}</h2>
          </SizeAwareCell>
          <AppHU
            heightToSubtract={buttonRowHeight + headingRowHeight}
            asContainer={Cell}
          >
            <ImageList
              images={images}
              frames={frames}
              selectedCollectionId={selectedCollectionId}
              temsPerRow={responsiveItemsPerRow}
              isEditing={isEditing}
              handleClick={imageToEditor}
              handleCountUpdate={updateQuantity}
            />
            {NoImagesCallout}
          </AppHU>
        </Grid>
      </GridContainer>
    </div>
  );
};

export default connect(mapStateToProps)(Gallery);
