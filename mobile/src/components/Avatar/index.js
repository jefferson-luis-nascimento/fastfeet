import React from 'react';
import PropTypes from 'prop-types';

import { Container, Image, Initials } from './styles';

import randomColor from '~/util/randomColor';

export default function Avatar({ url, index, defaultText, style }) {
  const words = defaultText.split(' ');

  const initials = `${words[0].substring(0, 1)}${
    words.length > 1 ? words[words.length - 1].substring(0, 1) : ''
  }`;

  const color = randomColor(index);
  return (
    <Container style={style}>
      {url ? (
        <Image source={{ uri: url }} style={style} />
      ) : (
        <Initials style={style} color={color}>
          {initials}
        </Initials>
      )}
    </Container>
  );
}

Avatar.propTypes = {
  url: PropTypes.string,
  index: PropTypes.number.isRequired,
  defaultText: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Avatar.defaultProps = {
  url: null,
  style: {},
};
