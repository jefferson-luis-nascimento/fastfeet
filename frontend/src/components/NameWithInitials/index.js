import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function NameWithInitials({ children }) {
  const words = children.split(' ');
  const initials = `${words[0].substring(0, 1)}${words[
    words.length - 1
  ].substring(0, 1)}`;

  return (
    <Container>
      <span id="initials">{initials}</span>
      <span id="name">{children}</span>
    </Container>
  );
}

NameWithInitials.propTypes = {
  children: PropTypes.string.isRequired,
};
