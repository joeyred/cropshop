import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Scrollable.module.scss';

class Scrollable extends Component {
  state = {
    // firstRender: true,
    scrollStyles: '',
    scrollState: 'atBeginning'
    // scrollPosition: 0
  };

  // container = React.createRef(this.container);

  static defaultProps = {
    vertical: true,
    // hint: false,
    asContainer: false
  };

  static propTypes = {
    vertical: PropTypes.bool,
    // hint: PropTypes.bool,
    asContainer: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
  };

  componentDidMount() {
    const {
      vertical
      // hint
    } = this.props;

    const initStyles = classnames(
      vertical ? styles.scrollY : styles.scrollX,
      styles.atEnd
    );
    // let scrollPosition = 0;
    // if (vertical && hint) {
    //   this.container.current.scrollTop = this.container.current.scrollHeight;
    //   scrollPosition = this.container.current.scrollHeight;
    // }
    // if (!vertical && hint) {
    //   this.container.current.scrollLeft = this.container.current.scrollWidth;
    //   scrollPosition = this.container.current.scrollWidth;
    // }
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

    // console.log(scrollPosition, scrollLength, clientLength);

    const scrolledToBeginning = scrollPosition === 0;
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
    const { vertical, asContainer, children, ...rest } = this.props;
    const { scrollStyles } = this.state;
    const css = classnames(
      vertical ? styles.scrollY : styles.scrollX,
      scrollStyles
    );
    const ElementToRender = asContainer;

    if (ElementToRender) {
      return (
        <ElementToRender
          // ref={this.container}
          className={css}
          onScroll={this.handleScroll}
        >
          <div className={styles.overlayAtBeginning} />
          <div className={styles.overlayAtEnd} />
          <div className={styles.content} {...rest}>
            {children}
          </div>
        </ElementToRender>
      );
    }
    return (
      <div ref={this.container} className={css} onScroll={this.handleScroll}>
        <div className={styles.overlayAtBeginning} />
        <div className={styles.overlayAtEnd} />
        <div className={styles.content} {...rest}>
          {children}
        </div>
      </div>
    );
  }
}

export default Scrollable;
