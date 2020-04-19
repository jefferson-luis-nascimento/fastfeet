import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  Image,
  TextContainer,
  Label,
  Text,
  ExitButton,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const dispatch = useDispatch();

  const { id, name, email, avatar, created_at } = useSelector(
    (state) => state.user.profile
  );

  const date = useMemo(() => {
    return format(parseISO(created_at), 'dd/MM/yyyy', { locale: pt });
  }, [created_at]);

  function handleSignOut() {
    Alert.alert(
      'FastFeet',
      'Deseja realmente sair do sitema?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            dispatch(signOut());
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <Container>
      <Image
        url={avatar ? avatar.url : null}
        defaultText={name}
        index={parseInt(id, 10)}
      />
      <TextContainer>
        <Label>Nome Completo</Label>
        <Text>{name}</Text>
      </TextContainer>
      <TextContainer>
        <Label>E-mail</Label>
        <Text>{email}</Text>
      </TextContainer>
      <TextContainer>
        <Label>Data de Cadastro</Label>
        <Text>{date}</Text>
      </TextContainer>

      <ExitButton onPress={handleSignOut}>Logout</ExitButton>
    </Container>
  );
}
