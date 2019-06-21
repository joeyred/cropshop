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

import { storiesOf } from '@storybook/react'; // eslint-disable-line
import { action } from '@storybook/addon-actions'; // eslint-disable-line

import Progress from './Progress';

const getRandomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};

const loadingStep = {
  set: (callback, delay) => {
    setTimeout(callback, delay);
  },
  random: (callback, minDelay = 200, maxDelay = 500) => {
    setTimeout(callback, getRandomFloat(minDelay, maxDelay));
  }
};

const mockLoading = (steps, callback, repeating = false, delay = false) => {
  let iteration = 0;
  const step = () => {
    iteration += 1;
    callback(iteration);
    if (iteration === steps && repeating) {
      iteration = 0;
    }
    // console.log(iteration === steps);
    // console.log(repeating);
    // console.log(iteration === steps && repeating);
    // console.log(iteration);

    if (iteration < steps) {
      if (delay === false) {
        loadingStep.random(step);
      } else {
        loadingStep.set(step, delay);
      }
    }
  };
  if (delay === false) {
    loadingStep.random(step);
  } else {
    loadingStep.set(step, delay);
  }
};

class FakeLoading extends Component {
  state = {
    step: 0,
    finished: false
  };

  static defaultProps = {
    repeating: false,
    delay: false
  };

  static propTypes = {
    totalSteps: PropTypes.number.isRequired,
    repeating: PropTypes.bool,
    delay: PropTypes.bool
  };

  componentDidMount() {
    this.load();
  }

  load = () => {
    const { totalSteps, delay, repeating } = this.props;

    const callback = iteration => {
      // console.log('fired load callback');
      if (totalSteps === iteration) {
        this.setState({ step: iteration, finished: true });
      } else {
        this.setState({ step: iteration });
      }
    };

    mockLoading(totalSteps, callback, repeating, delay);
  };

  render() {
    const { totalSteps } = this.props;
    const { step, finished } = this.state;
    return (
      <Progress itemsAdded={step} totalItems={totalSteps} finished={finished} />
    );
  }
}

storiesOf('Components|Cart.Progress', module)
  .addDecorator(story => (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%'
      }}
    >
      {story()}
    </div>
  ))
  .add('Adding Items- Repeat', () => {
    return <FakeLoading totalSteps={16} repeating />;
  })
  .add('Adding Items - full process', () => {
    return <FakeLoading totalSteps={16} />;
  });
