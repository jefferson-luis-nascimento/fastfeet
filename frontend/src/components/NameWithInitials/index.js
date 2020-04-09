import React from 'react';
import PropTypes from 'prop-types';

import { Container, Initials, Name } from './styles';

import randomColor from '~/util/randomColor';

export default function NameWithInitials({ children, index }) {
  const words = children.split(' ');

  const initials = `${words[0].substring(0, 1)}${
    words.length > 1 ? words[words.length - 1].substring(0, 1) : ''
  }`;

  const color = randomColor(index);

  return (
    <Container>
      <Initials color={color}>{initials}</Initials>
      <Name>{children}</Name>
    </Container>
  );
}

NameWithInitials.propTypes = {
  children: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
