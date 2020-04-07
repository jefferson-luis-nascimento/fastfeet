import React, { useState, useEffect } from 'react';

import { MdMoreHoriz, MdRemoveRedEye, MdEdit, MdRemove } from 'react-icons/md';
import { Container, Badge, ActionList, ActionItem } from './styles';

export default function Action() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} visible={visible}>
        <MdMoreHoriz size={20} color="#666" />
      </Badge>

      <ActionList visible={visible}>
        <ActionItem>
          <MdRemoveRedEye size={20} color="#8e5be8" />
          <span>Visualizar</span>
        </ActionItem>
        <ActionItem>
          <MdEdit size={20} color="#4d85ee" />
          <span>Editar</span>
        </ActionItem>
        <ActionItem>
          <MdRemove size={20} color="#de3b3b" />
          <span>Excluir</span>
        </ActionItem>
      </ActionList>
    </Container>
  );
}
