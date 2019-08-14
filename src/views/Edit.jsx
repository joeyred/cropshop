/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Filelink } from 'filestack-js';
import { Grid, Cell, Button, TopBarLeft, Colors } from 'react-foundation';
import sizeMe from 'react-sizeme';

import AppHU from '../components/AppHU';

import {
  // toggleOption,
  resetEditor,
  updateRotation
  // updateCropFullCenter,
  // updateZoom,
  // updateCrop as updateCropActionCreator,
  // storeImageDimensions as storeImageDimensionsActionCreator,
  // updateArtboardDimensions as updateArtboardDimensionsActionCreator
} from '../redux/actions/editor';
import { updateComponentHeight } from '../redux/size';
import { updateView } from '../redux/actions/nav';
import { Views } from '../globals';

import Icon from '../components/Icon';
import TopBar from '../components/TopBar';
import FrameSelector from '../components/FrameSelector';
import Toolbar from '../components/Toolbar';
// import ImageEditor from '../components/ImageEditor';
import TopBarTitle from '../components/TopBarTitle';
import Workspace from '../components/Workspace';

import { responsiveProp } from '../utils/breakpoints';
// import { aspectRatioFill, calcCropFullCentered } from '../utils/crop';
import {
  // scaleCrop,
  generateTransform
} from '../utils/transformations';
// import Debug from '../utils/debug';

import styles from './Edit.module.scss';

const SizeAwareCell = sizeMe({ monitorHeight: true, monitorWidth: false })(
  Cell
);

const mapStateToProps = state => ({
  apiKey: state.external.filestackApiKey,
  debugIsEnabled: state.external.debug,
  frames: state.frame.frames,
  selectedFrameId: state.frame.selectedFrameId,
  images: state.image.images,
  imageId: state.gallery.currentIdBeingEdited,
  // Editor stuff
  imageProps: state.editor.imageProps,
  rotate: state.editor.rotate,
  zoom: state.editor.zoom,
  flip: state.editor.flip,
  flop: state.editor.flop,
  crop: state.editor.crop,
  artboardSize: state.editor.artboardSize,
  artboardPadding: state.editor.artboardPadding,
  imageSize: state.editor.imageSize,
  // ui
  breakpoint: state.size.breakpoint,
  isPortrait: state.size.app.isPortrait,
  rowHeights: state.size.registeredHeights,
  availableHeight: state.size.availableHeight
});

// eslint-disable-next-line react/prefer-stateless-function
class Edit extends Component {
  static propTypes = {
    // apiKey: PropTypes.string.isRequired
    // frames: PropTypes.array,
    // activeFrameIndex: PropTypes.number,
    // selectedFrame: PropTypes.array,
    // file: PropTypes.object.isRequired,
  };

  // componentWillUnmount() {
  //
  //
  // }

  toGallery = () => {
    const { dispatch } = this.props;
    dispatch(updateView(Views.GALLERY));
    dispatch(resetEditor());
  };

  getResponsiveProp = (component, prop) => {
    const { breakpoint } = this.props;

    // console.log(breakpoint);

    const grid = {};
    const frameSelector = {};
    const toolbar = {};
    const imageEditor = {};

    // if (!isPortrait) {
    grid.direction = responsiveProp([true, true, false]);

    frameSelector.direction = responsiveProp([
      'horizontal',
      'horizontal',
      'vertical'
    ]);
    frameSelector.fixedHeight = responsiveProp([false, false, true]);
    frameSelector.cellSize = responsiveProp([null, null, 3]);
    frameSelector.ch = responsiveProp([22, 25, 22]);

    toolbar.ch = responsiveProp([15, 15, 20]);

    imageEditor.ch = responsiveProp([
      100 - (toolbar.ch[breakpoint] + frameSelector.ch[breakpoint]),
      100 - (toolbar.ch[breakpoint] + frameSelector.ch[breakpoint]),
      100 - (toolbar.ch[breakpoint] + frameSelector.ch[breakpoint])
    ]);

    const components = { grid, frameSelector, toolbar, imageEditor };
    return components[component][prop][breakpoint];
    // }

    // components.grid.direction = false;
    // components.frameSelector.direction = 'vertical';
    // components.frameSelector.cellSize = 3;
    //
    // return components[component][prop];
  };

  handleRotate = direction => {
    const {
      rotate
      // dispatch
    } = this.props;
    // this.loadingStatus(true);
    if (direction === 'left') {
      // dispatch(updateRotation(rotate - 90));
      return rotate - 90;
    }
    if (direction === 'right') {
      // dispatch(updateRotation(rotate + 90));
      return rotate + 90;
    }
    return rotate + 90;
  };

  // generateTransformStyles = () => {
  //   const {
  //     rotate,
  //     flip,
  //     flop
  //     // zoom
  //   } = this.props;
  //   const rotateTransform = {};
  //   // Normal Rotation
  //   // rotateTransform.x = rotate > 0 && rotate < 360 ? rotate : 0;
  //   rotateTransform.z = rotate;
  //   // Flip Horizontally
  //   rotateTransform.y = flop ? 180 : 0;
  //   // Flip Vertically
  //   rotateTransform.x = flip ? 180 : 0;
  //
  //   // const zoomTransform = zoom > 1 ? zoom : 1;
  //
  //   return `rotateX(${rotateTransform.x}deg) rotateY(${
  //     rotateTransform.y
  //   }deg) rotateZ(${rotateTransform.z}deg)`;
  //
  //   // return `rotateY()`
  //
  //   // return `rotate3d(${rotateTransform.x}, ${rotateTransform.y}, ${
  //   //   rotateTransform.z
  //   // })`;
  // };

  // TODO Replace this with a more flexible and performant solution
  handleImageEditViaApi = linkedImage => {
    const {
      // debugIsEnabled,
      breakpoint,
      rotate,
      flip,
      flop
    } = this.props;
    // const debug = Debug('handleImageEditViaApi', debugIsEnabled);
    // linkedImage.output({ format: 'jpg' });
    const responsiveResize = {
      sm: 640,
      md: 1000,
      lg: 1024,
      xl: 1366,
      xxl: 1920
    };
    // FIXME This should be checked for aspect ratio issues
    linkedImage.resize({ width: responsiveResize[breakpoint] });
    // return linkedImage.toString();
    const preview = generateTransform(linkedImage, { rotate, flip, flop });
    // console.log(preview.url);
    // debug('log', preview.url);
    return preview.url;
  };

  // renderImageStyle = () => `
  //   .${styles.container} {
  //     img.ReactCrop__image {
  //       transform: ${this.generateTransformStyles};
  //     }
  //   }
  // `;

  // loadingStatus = status => {
  //   this.setState({ loading: status });
  // };

  render() {
    // console.log(this.props);
    const {
      apiKey,
      // debugIsEnabled,
      frames,
      selectedFrameId,
      images,
      imageId,
      rowHeights,
      // imageSize,
      breakpoint,
      rotate,
      // availableHeight,
      dispatch
      // crop
    } = this.props;
    // const { loading, loaded } = this.state;
    // const debug = Debug('Edit:render', debugIsEnabled);

    const frame = frames.byId[selectedFrameId];

    let frameSelectorHeight = 0;
    let toolbarHeight = 0;
    let headerHeight = 0;

    if (rowHeights) {
      frameSelectorHeight = rowHeights.frameSelector
        ? rowHeights.frameSelector
        : 0;
      toolbarHeight = rowHeights.toolbar ? rowHeights.toolbar : 0;
      headerHeight = rowHeights.frameSelectorTitle
        ? rowHeights.frameSelectorTitle
        : 0;
    }

    // Get the image data
    const image = images.byId[imageId];
    // debug('log', image);

    // Construct a new instance to link to Filestack image.
    const linkedImage = new Filelink(image.handle, apiKey);

    const heightToSubtract =
      breakpoint === 'sm' || breakpoint === 'md'
        ? frameSelectorHeight + toolbarHeight
        : toolbarHeight;
    return (
      <div>
        <TopBar>
          <TopBarLeft>
            <Button
              color={Colors.SECONDARY}
              size='small'
              onClick={() => this.toGallery()}
            >
              <Icon name='Apps' /> Back To Gallery
            </Button>

            <TopBarTitle />
          </TopBarLeft>
        </TopBar>
        <Grid
          vertical={this.getResponsiveProp('grid', 'direction')}
          className={`${styles.container}`}
        >
          {/* Frame Select */}
          <SizeAwareCell
            large={3}
            className='xlarge-2'
            onSize={({ height }) =>
              dispatch(updateComponentHeight('frameSelector', height))
            }
          >
            <Grid
              vertical
              // gutters='padding'
            >
              <SizeAwareCell
                onSize={({ height }) =>
                  dispatch(updateComponentHeight('frameSelectorTitle', height))
                }
              >
                <h1 className=''>Select A Size</h1>
              </SizeAwareCell>
              <AppHU
                asContainer={Cell}
                heightToSubtract={headerHeight}
                disable={
                  !this.getResponsiveProp('frameSelector', 'fixedHeight')
                }
              >
                <FrameSelector
                  direction={this.getResponsiveProp(
                    'frameSelector',
                    'direction'
                  )}
                />
              </AppHU>
            </Grid>
          </SizeAwareCell>
          {/* Image Editor */}
          <Cell large={9} className='xlarge-10'>
            <Grid vertical>
              <Workspace
                heightToSubtract={heightToSubtract}
                frameSize={{
                  width: frame.dimensions[0],
                  height: frame.dimensions[1]
                }}
                imageSrc={this.handleImageEditViaApi(linkedImage)}
                imageSize={{
                  width: image.width,
                  height: image.height
                }}
              />

              {/* Tool Bar */}
              <SizeAwareCell
                onSize={({ height }) =>
                  dispatch(updateComponentHeight('toolbar', height))
                }
              >
                <Grid vertical={false} alignY='middle'>
                  <Cell auto='all'>
                    <Toolbar style={{ padding: '0 0.625rem' }}>
                      {/* <Toolbar.Group label='Zoom'>
                          <Toolbar.Button icon='ZoomIn' label='In' />
                          <Toolbar.Button icon='ZoomOut' label='Out' />
                        </Toolbar.Group> */}
                      <Toolbar.Group label='Rotate'>
                        <Toolbar.Button
                          icon='RotateLeft'
                          label='Left'
                          // handleClick={() => this.handleRotate('left')}
                          handleClick={() =>
                            dispatch(updateRotation(rotate, 90, 'left'))
                          }
                        />
                        <Toolbar.Button
                          icon='RotateRight'
                          label='Right'
                          // handleClick={() => this.handleRotate('right')}
                          handleClick={() =>
                            dispatch(updateRotation(rotate, 90, 'right'))
                          }
                        />
                      </Toolbar.Group>
                      {/* <Toolbar.Group label='Flip'>
                          <Toolbar.Button
                            icon='Flip'
                            label='Horizontal'
                            handleClick={() => dispatch(toggleOption('flop'))}
                          />
                          <Toolbar.Button
                            icon='Flip'
                            rotateIcon={270}
                            label='Vertical'
                            handleClick={() => dispatch(toggleOption('flip'))}
                          />
                        </Toolbar.Group> */}
                    </Toolbar>
                  </Cell>
                  <Cell auto='all' className='align-center-middle text-center'>
                    <Button
                      color={Colors.SECONDARY}
                      onClick={() => dispatch(updateView(Views.PREVIEW))}
                    >
                      Apply Edit
                    </Button>
                  </Cell>
                </Grid>
              </SizeAwareCell>
            </Grid>
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Edit);
