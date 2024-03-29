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
import classnames from 'classnames';
import map from 'lodash/map';
import { Grid, Cell } from 'react-foundation';

import Product from '../Product';
import Counter from '../Counter';

import styles from './ImageList.module.scss';

const ImageList = props => {
  const {
    images,
    frames,
    selectedCollectionId,
    itemsPerRow,
    handleClick,
    handleCountUpdate,
    isEditing,
    className
  } = props;
  // console.log(frames);

  const small = itemsPerRow.small
    ? `small-up-${itemsPerRow.small}`
    : `small-up-${itemsPerRow}`;

  const gridClasses = classnames(
    small,
    itemsPerRow.medium ? `medium-up-${itemsPerRow.medium}` : null,
    itemsPerRow.large ? `large-up-${itemsPerRow.large}` : null,
    itemsPerRow.xlarge ? `xlarge-up-${itemsPerRow.xlarge}` : null,
    itemsPerRow.xxlarge ? `xxlarge-up-${itemsPerRow.xxlarge}` : null,
    'grid-padding-x',
    styles.container,
    className
  );

  const thumbnails = map(images.allIds, id => {
    const image = images.byId[id];
    // console.log(image.edited[selectedCollectionId]);
    if (isEditing) {
      return (
        <Cell
          key={image.id}
          style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          <Product
            handle={image.handle}
            isEdited={!!image.edited[selectedCollectionId]}
            handleClick={() => handleClick(image.id)}
            mode='edit'
          />
        </Cell>
      );
    }
    if (image.edited[selectedCollectionId]) {
      const { width, height } = frames.byId[
        image.edit[selectedCollectionId].frameId
      ].display;
      // console.log(image.quantity);
      return (
        <Cell
          key={image.id}
          style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          <Product
            previewSrc={image.edit[selectedCollectionId].previewSrc}
            isEdited={!!image.edited[selectedCollectionId]}
            mode='cart'
            frame={{ width, height }}
          />
          <div className={styles.counter}>
            <Counter
              id={image.id}
              handleCountUpdate={handleCountUpdate}
              count={image.quantity}
            />
          </div>
        </Cell>
      );
    }
    return null;
  });
  return (
    <Grid className={gridClasses} alignX='center' alignY='top'>
      {thumbnails}
    </Grid>
  );
};

ImageList.defaultProps = {
  images: [],
  itemsPerRow: 3,
  handleClick: id => {
    // eslint-disable-next-line no-console
    console.log(`Thumbnail Clicked: ${id}`);
  },
  handleCountUpdate: (id, count) =>
    // eslint-disable-next-line no-console
    console.log(`Count Updated Clicked: ${id} - ${count}`)
};

ImageList.propTypes = {
  images: PropTypes.shape({
    byId: PropTypes.object,
    allIds: PropTypes.array
  }),
  isEditing: PropTypes.bool.isRequired,
  itemsPerRow: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.objectOf(PropTypes.number)
  ]),
  handleClick: PropTypes.func,
  handleCountUpdate: PropTypes.func
};

export default ImageList;
