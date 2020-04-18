import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Text,
  StatusBarProgress,
  Footer,
  DetailButton,
} from './styles';

import Label from '~/components/Label';

export default function ListItem() {
  return (
    <Container>
      <Icon name="truck" color="#7d40e7" size={20} />
      <Text>Encomenda 01</Text>
      <StatusBarProgress />
      <Footer>
        <Label header="Data">14/01/2020</Label>
        <Label header="Cidade">Diadema</Label>
        <DetailButton>Ver detalhes</DetailButton>
      </Footer>
    </Container>
  );
}
