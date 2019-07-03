import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import Icon from '../Icon';

import { animationSeries } from '../../utils/animation';

import styles from './Scrollable.module.scss';

class Scrollable extends Component {
  state = {
    // firstRender: true,
    scrollStyles: '',
    scrollState: 'atBeginning'
    // scrollPosition: 0
  };

  static defaultProps = {
    vertical: true,
    hint: false,
    asContainer: false
  };

  static propTypes = {
    vertical: PropTypes.bool,
    hint: PropTypes.bool,
    asContainer: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
  };

  componentDidMount() {
    const { vertical, hint } = this.props;
    const element = document.querySelector('[data-cropshop-scroll]');
    // const scrollPosition = vertical ? element.scrollTop : element.scrollLeft;
    const scrollLength = vertical ? element.scrollHeight : element.scrollWidth;
    const clientLength = vertical ? element.clientHeight : element.clientWidth;
    const initStyles = classnames(
      vertical ? styles.scrollY : styles.scrollX,
      styles.atEnd
    );
    // console.log(
    //   scrollPosition,
    //   scrollLength - clientLength,
    //   scrollLength,
    //   clientLength
    // );
    // const durations = {
    //   scrollToEnd: 600
    // };
    const keys = {
      scrollDirection: vertical ? 'scrollTop' : 'scrollLeft',
      scrollDimension: vertical ? 'scrollHeight' : 'scrollWidth'
    };
    const maxScrollPosition = scrollLength - clientLength;
    // const distancePerFrame = maxScrollPosition / durations.scrollToEnd;
    // let scrollPosition = 0;
    // if (vertical && hint) {
    //   this.container.current.scrollTop = this.container.current.scrollHeight;
    //   scrollPosition = this.container.current.scrollHeight;
    // }
    let currentPosition = 0;
    if (hint && maxScrollPosition !== 0) {
      // NOTE Check for CSS support of scroll-behavior
      if (CSS.supports('scroll-behavior', 'smooth')) {
        element[keys.scrollDirection] = element[keys.scrollDimension];
        setTimeout(() => {
          element[keys.scrollDirection] = 0;
        }, 500);
        // NOTE This is literally just for Safari and iOS Safari
      } else {
        setTimeout(
          () =>
            animationSeries({
              element,
              baseClassName: 'scrolling',
              steps: [
                {
                  name: 'scrollToEnd',
                  duration: 360,
                  hooks: {
                    beforeEachFrame: (el, progress) => {
                      // console.log(element[keys.scrollDirection]);

                      // console.log(distancePerFrame);
                      currentPosition = parseFloat(
                        (maxScrollPosition * progress).toFixed(0)
                      );
                      // console.log(currentPosition);
                      element[keys.scrollDirection] = currentPosition;
                      // element.scroll({ left: currentPosition });
                      // console.log('to end', el[keys.scrollDirection]);
                    }
                  }
                },
                {
                  name: 'scrollToBeginning',
                  duration: 240,
                  hooks: {
                    beforeEachFrame: (el, progress) => {
                      // console.log(element[keys.scrollDirection]);
                      currentPosition =
                        maxScrollPosition -
                        (maxScrollPosition * progress).toFixed(0);
                      // console.log(currentPosition);
                      element[keys.scrollDirection] = currentPosition;
                      // console.log(element[keys.scrollDirection]);
                    }
                  }
                }
              ]
            }),
          500
        );
      }

      // scrollPosition = element.scrollWidth;
    }
    this.setState({ scrollStyles: initStyles });
  }

  handleScroll = e => {
    const { vertical } = this.props;
    const { scrollState } = this.state;
    const element = e.target;
    let currentScrollState = '';

    const scrollPosition = vertical ? element.scrollTop : element.scrollLeft;
    const scrollLength = vertical ? element.scrollHeight : element.scrollWidth;
    const clientLength = vertical ? element.clientHeight : element.clientWidth;

    // console.log(
    //   scrollPosition,
    //   scrollLength - clientLength,
    //   scrollLength,
    //   clientLength
    // );

    const scrolledToBeginning =
      scrollPosition === 0 || Math.sign(scrollPosition) === -1;
    const scrolledToEnd = scrollLength - scrollPosition === clientLength;
    const inBetween = scrollPosition > 0 && !scrolledToEnd;

    if (scrolledToBeginning) {
      currentScrollState = 'atBeginning';
    } else if (scrolledToEnd) {
      currentScrollState = 'atEnd';
    } else {
      currentScrollState = 'inbetween';
    }

    // console.log(currentScrollState, scrollState);
    if (currentScrollState !== scrollState) {
      const css = classnames(
        // vertical ? styles.scrollY : styles.scrollX,
        scrolledToBeginning ? styles.atEnd : null,
        inBetween ? styles.inBetween : null,
        scrolledToEnd ? styles.atBeginning : null
      );
      // console.log('updated state onScroll');
      this.setState({ scrollStyles: css, scrollState: currentScrollState });
    }
  };

  render() {
    const { vertical, asContainer, hint, children, ...rest } = this.props;
    const { scrollStyles } = this.state;
    const css = classnames(
      vertical ? styles.scrollY : styles.scrollX,
      scrollStyles
    );
    const ElementToRender = asContainer;

    if (ElementToRender) {
      return (
        <ElementToRender className={css} onScroll={this.handleScroll}>
          <div className={styles.overlayAtBeginning} />
          <div className={styles.overlayAtEnd} />
          <div data-cropshop-scroll='' className={styles.content} {...rest}>
            {children}
          </div>
        </ElementToRender>
      );
    }
    return (
      <div className={css} onScroll={this.handleScroll}>
        <div className={styles.overlayAtBeginning} />
        <div className={styles.overlayAtEnd} />
        <div className={styles.overlayHint} />
        <div data-cropshop-scroll='' className={styles.content} {...rest}>
          {children}
        </div>
      </div>
    );
  }
}

export default Scrollable;
