import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  NameContainer,
  WelcomeText,
  NameText,
  ExitButton,
  ListHeader,
  ListHeaderTitle,
  List,
} from './styles';

import Avatar from '~/components/Avatar';
import Radio from '~/components/Radio';
import ListItem from '~/components/ListItem';

import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';

const exitIcon = {
  name: 'exit-to-app',
  size: 50,
  color: '#e74040',
};

export default function Dashboard() {
  const dispatch = useDispatch();

  const { id, name, avatar } = useSelector((state) => state.user.profile);

  /* const [checkedPending, setCheckedPending] = useState(true);
  const [checkedDelivered, setCheckedDelivered] = useState(false);

  function handleChecked() {
    setCheckedPending(!checkedPending);
    setCheckedDelivered(!checkedDelivered);
  } */

  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get(`/deliverymen/${id}/deliveries`);

      setDeliveries(response.data);
    }

    loadDeliveries();
  }, [id]);

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
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header>
        <Avatar
          url={avatar ? avatar.url : null}
          index={parseInt(id, 10)}
          defaultText={name}
        />
        <NameContainer>
          <WelcomeText>Bem vindo de volta,</WelcomeText>
          <NameText>{name}</NameText>
        </NameContainer>
        <ExitButton>
          <Icon
            onPress={handleSignOut}
            name={exitIcon.name}
            size={exitIcon.size}
            color={exitIcon.color}
          />
        </ExitButton>
      </Header>

      <ListHeader>
        <ListHeaderTitle>Entregas</ListHeaderTitle>
        <Radio />
      </ListHeader>

      <List
        data={deliveries}
        keyExtractor={(delivery) => String(delivery.id)}
        renderItem={({ item: delivery }) => <ListItem delivery={delivery} />}
      />
    </Container>
  );
}
