import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { MdMoreHoriz } from 'react-icons/md';
import { Container, Badge, ActionList, ActionItem } from './styles';

export default function Action({ id, actions, handleAction }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function renderIcon(icon) {
    const { Icon, size, color } = icon;

    return <Icon size={size} color={color} />;
  }

  function handleActionSelected(action) {
    setVisible(false);
    handleAction(action, id);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} visible={visible}>
        <MdMoreHoriz size={20} color="#666" />
      </Badge>

      <ActionList visible={visible}>
        {actions.map((action) => (
          <ActionItem
            key={action.name}
            onClick={() => handleActionSelected(action.name)}
          >
            <>{renderIcon(action.icon)}</>
            <span>{action.name}</span>
          </ActionItem>
        ))}
      </ActionList>
    </Container>
  );
}

Action.propTypes = {
  id: PropTypes.number.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.shape({
        Icon: PropTypes.element.isRequired,
        size: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  handleAction: PropTypes.func.isRequired,
};
