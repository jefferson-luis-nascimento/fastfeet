import React, { useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  BackgroundNavigation,
  Content,
  Detail,
  Header,
  HeaderText,
  LabelContainer,
  Label,
  Text,
  DateContainer,
  Buttons,
  Button,
  ButtonText,
} from './styles';

export default function DeliveryDetail() {
  const route = useRoute();
  const navigation = useNavigation();

  const { delivery } = route.params;

  const start_date = useMemo(() => {
    return delivery.start_date
      ? format(parseISO(delivery.start_date), 'dd/MM/yyyy', { locale: pt })
      : '--/--/----';
  }, [delivery.start_date]);

  const end_date = useMemo(() => {
    return delivery.end_date
      ? format(parseISO(delivery.end_date), 'dd/MM/yyyy', { locale: pt })
      : '--/--/----';
  }, [delivery.end_date]);

  const fullAddress = useMemo(() => {
    return `${delivery.recipient.fullAddress}, ${delivery.recipient.city} - ${delivery.recipient.state}, ${delivery.recipient.zip_code}`;
  }, [
    delivery.recipient.city,
    delivery.recipient.fullAddress,
    delivery.recipient.state,
    delivery.recipient.zip_code,
  ]);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <BackgroundNavigation />
      <Content>
        <Detail>
          <Header>
            <Icon name="truck" size={20} color="#7d40e7" />
            <HeaderText>Informações da entrega</HeaderText>
          </Header>
          <LabelContainer>
            <Label>DESTINATÁRIO</Label>
            <Text>{delivery.recipient.name}</Text>
          </LabelContainer>
          <LabelContainer>
            <Label>ENDEREÇO DE ENTREGA</Label>
            <Text>{fullAddress}</Text>
          </LabelContainer>
          <LabelContainer>
            <Label>PRODUTO</Label>
            <Text>{delivery.product}</Text>
          </LabelContainer>
        </Detail>
        <Detail>
          <Header>
            <Icon name="calendar" size={20} color="#7d40e7" />
            <HeaderText>Situação da entrega</HeaderText>
          </Header>
          <LabelContainer>
            <Label>STATUS</Label>
            <Text>{delivery.status}</Text>
          </LabelContainer>
          <DateContainer>
            <LabelContainer>
              <Label>DATA DE RETIRADA</Label>
              <Text>{start_date}</Text>
            </LabelContainer>
            <LabelContainer>
              <Label>DATA DE ENTREGA</Label>
              <Text>{end_date}</Text>
            </LabelContainer>
          </DateContainer>
        </Detail>
        <Buttons>
          <Button
            onPress={() => navigation.navigate('AddProblem', { delivery })}
          >
            <Icon name="close-circle-outline" size={20} color="#e74040" />
            <ButtonText>Informar Problema</ButtonText>
          </Button>
          <Button
            onPress={() => navigation.navigate('ViewProblem', { delivery })}
          >
            <Icon name="information-outline" size={20} color="#e7ba40" />
            <ButtonText>Visualizar Problemas</ButtonText>
          </Button>
          <Button
            onPress={() => navigation.navigate('ConfirmDelivery', { delivery })}
          >
            <Icon name="check-circle-outline" size={20} color="#7d40e7" />
            <ButtonText>Confirmar entrega</ButtonText>
          </Button>
        </Buttons>
      </Content>
    </Container>
  );
}
