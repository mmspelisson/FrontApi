import React from 'react';
import { Container } from './Styles';

const SidebarItem = ({ Icon, Text, visible }) => {
  if (!visible) {
    return null; // Não renderiza o componente se não for visível
  }

  return (
    <Container>
      <Icon />
      {Text}
    </Container>
  );
};

export default SidebarItem;
