import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd, MdSearch } from 'react-icons/md';

import { Container } from './styles';

export default function Filter({ placeholder, handleRegister }) {
  return (
    <Container>
      <div>
        <MdSearch size={24} color="#999" />
        <input type="text" name="filer" id="filter" placeholder={placeholder} />
      </div>
      <button type="button" onClick={handleRegister}>
        <MdAdd size={24} color="#fff" />
        <span>CADASTRAR</span>
      </button>
    </Container>
  );
}

Filter.propTypes = {
  placeholder: PropTypes.string.isRequired,
  handleRegister: PropTypes.func.isRequired,
};
