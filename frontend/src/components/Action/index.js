import React from 'react';

import { MdMoreHoriz } from 'react-icons/md';
import { Container, Badge } from './styles';

export default function Action() {
  return (
    <Container>
      <Badge>
        <MdMoreHoriz size={20} color="#666" />
      </Badge>
    </Container>
  );
}
