import React, { useState } from 'react';

import { Container } from './styles';
import Filter from '~/components/Filter';
import Table from '~/components/Table';
import PageTitle from '~/components/PageTitle';

export default function Delivery() {
  const [data] = useState({
    columns: [
      { name: 'ID', type: 'id' },
      { name: 'Destinarário' },
      { name: 'Entregador', type: 'initials' },
      { name: 'Cidade' },
      { name: 'Estado' },
      { name: 'Status', type: 'status' },
    ],
    items: [
      {
        id: '01',
        recipient: 'Ludwing Van Beethoven',
        deliveryman: 'Jhon Doe',
        city: 'Jundiaí',
        state: 'São Paulo',
        status: 'Entregue',
      },
      {
        id: '02',
        recipient: 'Wolfgang Amadeus Mozart',
        deliveryman: 'Gaspar Antunes',
        city: 'Rio das Pedras',
        state: 'Santa Catarina',
        status: 'Pendente',
      },
      {
        id: '03',
        recipient: 'Johann Sebatian Bach',
        deliveryman: 'Dai Jang',
        city: 'Vitória',
        state: 'Espirito Santo',
        status: 'Retirada',
      },
      {
        id: '04',
        recipient: 'Fraderich Chopin',
        deliveryman: 'Tom Hanson',
        city: 'Salvador',
        state: 'Bahia',
        status: 'Cancelada',
      },
      {
        id: '05',
        recipient: 'Antonio Vivaldi',
        deliveryman: 'Rosseta Castro',
        city: 'Belém',
        state: 'Pará',
        status: 'Entregue',
      },
    ],
  });

  return (
    <Container>
      <PageTitle>Gerenciando Encomendas</PageTitle>
      <Filter placeholder="Buscar por encomendas" />
      <Table data={data} />
    </Container>
  );
}
