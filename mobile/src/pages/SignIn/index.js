import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SubmitButton from '~/components/Button';

import { Container, Image, TextInput } from './styles';

import logoWhite from '~/assets/fastfeet-logo-white.png';

import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const [id, setId] = useState(null);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
    if (!id) {
      Alert.alert('FastFeet', 'Informe seu Id de cadastro.');
      return;
    }

    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <Image source={logoWhite} />
      <TextInput
        keyboardType="number-pad"
        secureTextEntry
        placeholder="Informe seu ID de cadastro"
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        value={id}
        onChangeText={(e) => setId(e)}
      />
      <SubmitButton onPress={handleSubmit} loading={loading}>
        Entrar no Sistema
      </SubmitButton>
    </Container>
  );
}
