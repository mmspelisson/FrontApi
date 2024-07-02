import React from 'react';
import { Container } from './Styles';

const SidebarItem = ({ Icon, Text, visible }) => {
  if (!visible) {
    return null; 
  }

  return (
    <Container>
      <Icon />
      {Text}
    </Container>
  );
};

export default SidebarItem;
