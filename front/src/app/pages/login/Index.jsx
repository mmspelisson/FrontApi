import React from 'react'
import LeftPane from './LoginLeftPane'
import RightPane from './LoginRightPane'
import {Container} from './Styles.js'

const SplitScreen = () => {
  return (
    <Container>
      <LeftPane />
      <RightPane />
    </Container>
  );
};

export default SplitScreen
