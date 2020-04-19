import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import {
  Container,
  BackgroundNavigation,
  Content,
  Detail,
  TextInput,
  SubmitButton,
} from './styles';

import api from '~/services/api';

export default function AddProblem() {
  const [problem, setProblem] = useState('');

  const route = useRoute();
  const navigation = useNavigation();

  const { delivery } = route.params;

  async function handleSubmit() {
    await api.post(`deliveries/${delivery.id}/problems`, {
      description: problem,
    });

    Alert.alert('FastFeet', 'Problema cadastrado com sucesso!');
    navigation.goBack();
  }

  return (
    <Container>
      <BackgroundNavigation />
      <Content>
        <Detail>
          <TextInput
            multiline
            placeholder="Inclua aqui o problema que ocorreu na entrega."
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={problem}
            onChangeText={(e) => setProblem(e)}
          />
          <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
        </Detail>
      </Content>
    </Container>
  );
}
