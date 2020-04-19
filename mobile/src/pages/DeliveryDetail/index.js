import React from 'react';
import { StatusBar, Text } from 'react-native';

import { Container } from './styles';

export default function DeliveryDetail({ navigation }) {
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <Text>DeliveryDetail</Text>
    </Container>
  );
}
