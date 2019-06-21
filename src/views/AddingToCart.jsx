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
import { connect } from 'react-redux';
import {
  Grid,
  Cell,
  Button,
  // ButtonGroup,
  // TopBar,
  // TopBarLeft,
  Colors
} from 'react-foundation';
import Progress from '../components/Cart/Progress';

// import MicroModal from 'micromodal';

import { AppAtts } from '../globals';
import { closeModal } from '../utils/CropShopButton';

import styles from './AddingToCart.module.scss';

const mapStateToProps = state => ({
  itemsToAdd: state.cart.itemsToAdd,
  itemsAdded: state.cart.itemsAdded,
  itemsErrored: state.cart.itemsErrored,
  addingItems: state.cart.addingItems,
  cartUrl: state.external.cartUrl
});

const AddingToCart = props => {
  const {
    itemsToAdd,
    itemsAdded,
    // itemsErrored,
    cartUrl,
    addingItems
  } = props;
  // console.log(cartUrl);
  // const loading = (
  //   <div>
  //     <h1>Adding Items to Cart!</h1>
  //     <span>
  //       {itemsAdded} / {itemsToAdd}
  //     </span>
  //   </div>
  // );

  const buttons = (
    <Grid>
      <Cell small={6} alignX='center'>
        <div style={{ textAlign: 'center' }}>
          <Button
            color={Colors.SECONDARY}
            onClick={() => closeModal(AppAtts.MODAL_ID)}
          >
            Continue Shopping
          </Button>
        </div>
      </Cell>
      <Cell small={6} alignX='center'>
        <div style={{ textAlign: 'center' }}>
          <a href={cartUrl} className={`button ${Colors.PRIMARY}`}>
            Go To My Cart
          </a>
        </div>
      </Cell>
    </Grid>
  );

  const titleText = addingItems ? 'Adding Items to Cart' : 'Items Added!';
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>{titleText}</h1>
        <Progress
          totalItems={itemsToAdd}
          itemsAdded={itemsAdded}
          finished={!addingItems}
        />

        {addingItems ? null : buttons}
      </div>
    </div>
  );
};

AddingToCart.propTypes = {};

export default connect(mapStateToProps)(AddingToCart);
