import React from 'react';
import PropTypes from 'prop-types';

import { Content } from './styles';

export default function Container({ children }) {
  return <Content>{children}</Content>;
}

Container.propTypes = {
  children: PropTypes.element.isRequired,
};
