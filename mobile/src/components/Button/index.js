import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({ children, loading, style, ...rest }) {
  return (
    <Container style={style} {...rest}>
      {loading ? (
        <ActivityIndicator style={style} size="small" color="#fff" />
      ) : (
        <Text style={style}>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  loading: false,
};
