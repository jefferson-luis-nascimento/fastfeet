import React from 'react';
import { StatusBar } from 'react-native';

import {
  Container,
  Header,
  NameContainer,
  WelcomeText,
  NameText,
  ExitButton,
  ListHeader,
  ListHeaderTitle,
  RadioContainer,
  RadioButton,
} from './styles';

import Avatar from '~/components/Avatar';

const exitIcon = {
  name: 'exit-to-app',
  size: 30,
  color: '#e74040',
};

export default function Dashboard() {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header>
        <Avatar />
        <NameContainer>
          {/* <WelcomeText>Bem vindo de volta,</WelcomeText> */}
          {/* <NameText>Gaspar Antunes</NameText> */}
        </NameContainer>
        {/* <ExitButton icon={exitIcon} /> */}
      </Header>

      <ListHeader>
        {/* <ListHeaderTitle>Entregas</ListHeaderTitle> */}
        <RadioContainer />
      </ListHeader>
    </Container>
  );
}
