/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React
import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
// 3rd Party Components
import {
  Grid,
  // GridContainer,
  Cell
} from 'react-foundation';

import { updateSelectedFrame } from '../../redux/actions/frame';
import { updateCropFullCenter } from '../../redux/actions/editor';

// Project Components
import PictureFrame from './PictureFrame';
// Styles
import styles from './FrameSelector.module.scss';

const mapStateToProps = state => ({
  frames: state.frame.frames,
  selectedFrameId: state.frame.selectedFrameId,
  selectedCollectionId: state.frame.selectedCollectionId,
  imageProps: state.editor.imageProps
});

const FrameSelector = props => {
  const {
    frames,
    selectedFrameId,
    selectedCollectionId,
    direction,
    imageProps,
    dispatch
  } = props;
  // console.log(frames);
  // console.log(selectedCollectionId);

  const handleClick = id => {
    const aspect = frames.byId[id].dimensions;
    dispatch(updateSelectedFrame(id));
    dispatch(updateCropFullCenter(aspect, imageProps));
  };

  // This fixes loading issues on first render
  let tempFrame = selectedFrameId;

  // Get the IDs for the frames to display
  const filteredFrames = _.compact(
    _.map(frames.allIds, id => {
      let isInCollection = false;
      const frame = frames.byId[id];
      _.map(frame.collections, collection => {
        // console.log(collection.handle);
        if (collection.handle === selectedCollectionId) {
          isInCollection = true;
        }
        // console.log(isInCollection);
      });
      // console.log(isInCollection);

      if (isInCollection) {
        return frame;
      }
      return null;
    })
  );
  // TODO This needs to be able to handle mobile better
  const cellsPerRow = filteredFrames.length < 6 ? filteredFrames.length : 5;
  const sortedFrames = _.sortBy(filteredFrames, [
    // 'width',
    // 'height'
    object => {
      // const ar =
      //   object.width < object.height
      //     ? object.height / object.width
      //     : object.width / object.height;
      // console.log(ar);
      return object.width < object.height
        ? object.height / object.width
        : object.width / object.height;
    },
    'height'
    // object => {
    //   return object.dimensions[0];
    // }
  ]);
  // console.log(sortedFrames);
  return (
    <div className={styles.container}>
      <Grid
        vertical={direction === 'vertical'}
        className={`small-up-${cellsPerRow}`}
      >
        {_.map(sortedFrames, frame => {
          if (tempFrame === null) {
            tempFrame = frame.id;
            console.log(frame.id);
            dispatch(updateSelectedFrame(frame.id));
          }
          const active = frame.id === tempFrame;
          return (
            <Cell key={frame.id}>
              <button
                type='button'
                className={`${active ? styles.active : null} ${styles.button}`}
                onClick={() => handleClick(frame.id)}
              >
                <PictureFrame
                  dimensions={{ width: frame.width, height: frame.height }}
                />
              </button>
              <div className={styles.price}>
                <span className={styles['currency-symbol']}>$</span>
                <span>{frame.price}</span>
              </div>
            </Cell>
          );
        })}
      </Grid>
    </div>
  );
};

FrameSelector.defaultProps = {
  frames: {},
  direction: 'horizontal'
  // clickHandler: (index) => console.log(`FrameSelector - Index Selected: ${index}`)
};

FrameSelector.propTypes = {
  frames: PropTypes.shape({
    byId: PropTypes.object,
    allIds: PropTypes.array
  }),
  // selectedFrameId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  direction: PropTypes.oneOf(['vertical', 'horizontal'])
  // clickHandler:     PropTypes.func,
};

export default connect(mapStateToProps)(FrameSelector);
