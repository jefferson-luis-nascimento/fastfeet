import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select/async';
import { useField } from '@unform/core';

import { Container } from './styles';
import Label from '~/components/Form/Label';
import Error from '~/components/Form/Error';

export default function AsyncSelect({
  name,
  label,
  defaultOptions,
  loadOptions,
  ...rest
}) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map((option) => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  async function loadItems(inputText) {
    await loadOptions(inputText);
  }

  return (
    <Container>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <Select
        cacheOptions
        loadOptions={loadOptions}
        defaultValue={defaultValue}
        defaultOptions={defaultOptions}
        onInputChange={loadItems}
        ref={selectRef}
        {...rest}
        onSelectResetsInput={false}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  loadOptions: PropTypes.func.isRequired,
};

AsyncSelect.defaultProps = {
  label: null,
};
