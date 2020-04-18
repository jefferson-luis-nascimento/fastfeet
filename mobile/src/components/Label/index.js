import React from 'react';
import PropTypes from 'prop-types';

import { Container, HeaderText, Text } from './styles';

export default function Label({ header, children, style }) {
  return (
    <Container style={style}>
      {header && (
        <HeaderText className="header" style={style}>
          {header}
        </HeaderText>
      )}
      <Text className="content" style={style}>
        {children}
      </Text>
    </Container>
  );
}

Label.propTypes = {
  header: PropTypes.string,
  children: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Label.defaultProps = {
  header: null,
  style: {},
};
