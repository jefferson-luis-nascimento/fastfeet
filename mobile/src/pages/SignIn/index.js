import React from 'react';
import SubmitButton from '~/components/Button';

import { Container, Image, TextInput } from './styles';

import logoWhite from '~/assets/fastfeet-logo-white.png';

export default function SignIn() {
  return (
    <Container>
      <Image source={logoWhite} />
      <TextInput
        keyboardType="number-pad"
        secureTextEntry
        placeholder="Informe seu ID de cadastro"
      />
      <SubmitButton>Entrar no Sistema</SubmitButton>
    </Container>
  );
}
