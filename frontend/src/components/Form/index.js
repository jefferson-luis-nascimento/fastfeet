import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Form({ children }) {
  return <Container>{children}</Container>;
}
