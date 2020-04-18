import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Text } from './styles';

export default function Button({ children, loading, icon, ...rest }) {
  function render() {
    return children ? (
      <Text>{children}</Text>
    ) : (
      <Icon name={icon.name} size={icon.size} color={icon.color} />
    );
  }

  return (
    <Container {...rest}>
      {loading ? <ActivityIndicator size="small" color="#fff" /> : render()}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  icon: null,
  loading: false,
};
