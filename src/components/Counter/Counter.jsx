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

import Icon from '../Icon';

import styles from './Counter.module.scss';

class Counter extends Component {
  state = {
    count: 0
  };

  static defaultProps = {
    count: 0,
    handleCountUpdate: false,
    id: ''
  };

  static propTypes = {
    handleCountUpdate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    count: PropTypes.number,
    id: PropTypes.string
  };

  componentDidMount() {
    const { count } = this.props;
    this.setState({ count });
  }

  updateCount(direction) {
    const { handleCountUpdate, id } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    let count = handleCountUpdate ? this.props.count : this.state.count;
    if (direction === 'increase') {
      count += 1;
    }
    if (direction === 'decrease' && count !== 0) {
      count -= 1;
    }

    if (handleCountUpdate) {
      // console.log(count);
      handleCountUpdate(id, count);
    } else {
      this.setState({ count });
    }
  }

  render() {
    const { handleCountUpdate } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const count = handleCountUpdate ? this.props.count : this.state.count;

    return (
      <div className={styles.container}>
        <button
          type='button'
          className={`${styles.button}`}
          onClick={() => this.updateCount('decrease')}
        >
          <Icon name='Remove' />
        </button>
        <div className={styles.count}>{count}</div>
        <button
          type='button'
          className={`${styles.button}`}
          onClick={() => this.updateCount('increase')}
        >
          <Icon name='Add' />
        </button>
      </div>
    );
  }
}

export default Counter;
