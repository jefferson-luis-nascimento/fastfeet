import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import {
  Container,
  Header,
  HeaderText,
  Footer,
  DetailButton,
  DetailButtonText,
} from './styles';

import Label from '~/components/Label';

export default function ListItem({ delivery }) {
  const date = useMemo(() => {
    return format(parseISO(delivery.created_at), 'dd/MM/yyyy', { locale: pt });
  }, [delivery.created_at]);

  const status = useMemo(() => {
    console.tron.log();
    switch (delivery.status.toLowerCase()) {
      case 'pendente':
        return 0;
      case 'retirada':
        return 1;
      case 'entregue':
        return 2;
      default:
        return 4;
    }
  }, [delivery.status]);

  function handleViewDetail() {}

  return (
    <Container>
      <Header>
        <Icon name="truck" color="#7d40e7" size={20} />
        <HeaderText>Encomenda {delivery.id}</HeaderText>
      </Header>

      <ProgressSteps
        activeStep={status}
        activeStepIconBorderColor="#7d40e7"
        progressBarColor="#7d40e7"
        completedProgressBarColor="#7d40e7"
        labelColor="#b9b9b9"
        activeLabelColor="#7d40e7"
        completedStepIconColor="#7d40e7"
        activeStepNumColor="#7d40e7"
        completedStepNumColor="#7d40e7"
      >
        <ProgressStep label="Aguardando Retirada" removeBtnRow />

        <ProgressStep label="Retirada" removeBtnRow />

        <ProgressStep label="Entregue" removeBtnRow />
      </ProgressSteps>
      <Footer>
        <Label header="Data">{date}</Label>
        <Label header="Cidade">{delivery.recipient.city}</Label>
        <DetailButton onPress={handleViewDetail}>
          <DetailButtonText>Ver detalhes</DetailButtonText>
        </DetailButton>
      </Footer>
    </Container>
  );
}

ListItem.propTypes = {
  delivery: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
