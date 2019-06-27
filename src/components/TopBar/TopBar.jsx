import React from 'react';
import sizeMe from 'react-sizeme';
import { connect } from 'react-redux';
import { TopBar as FoundationTopBar } from 'react-foundation';

import { updateTopBarHeight } from '../../redux/size';

const SizeAwareTopBar = sizeMe({ monitorHeight: true, monitorWidth: false })(
  FoundationTopBar
);

const mapStateToProps = state => ({
  storedHeight: state.size.topbarHeight
});

const updateHeight = (storedHeight, currentHeight, dispatch) => {
  if (storedHeight !== currentHeight) {
    dispatch(updateTopBarHeight(currentHeight));
  }
};

const TopBar = props => {
  const { storedHeight, dispatch, ...rest } = props;

  return (
    <SizeAwareTopBar
      onSize={({ height }) => updateHeight(storedHeight, height, dispatch)}
      {...rest}
    />
  );
};

export default connect(mapStateToProps)(TopBar);
