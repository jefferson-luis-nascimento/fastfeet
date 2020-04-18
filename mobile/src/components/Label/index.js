import React from 'react';
import PropTypes from 'prop-types';

import { Container, HeaderText, Text } from './styles';

export default function Label({ header, children }) {
  return (
    <Container>
      {header && <HeaderText>{header}</HeaderText>}
      <Text>{children}</Text>
    </Container>
  );
}

Label.propTypes = {
  header: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Label.defaultProps = {
  header: null,
};
