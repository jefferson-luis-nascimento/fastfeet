import React, { useState, useEffect } from 'react';
import { MdRemoveRedEye, MdEdit, MdDelete } from 'react-icons/md';

import { Container } from './styles';
import Filter from '~/components/Filter';
import Table from '~/components/Table';
import PageTitle from '~/components/PageTitle';

import api from '~/services/api';

export default function Delivery() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('/deliveries');

      setData({
        columns: [
          { name: 'ID', type: 'id' },
          { name: 'Destinarário' },
          { name: 'Entregador_id', show: false },
          { name: 'Entregador', type: 'initials' },
          { name: 'Cidade' },
          { name: 'Estado' },
          { name: 'Status', type: 'status' },
        ],
        actions: [
          {
            name: 'Visualizar',
            icon: { Icon: MdRemoveRedEye, size: 20, color: '#8e5be8' },
          },
          {
            name: 'Editar',
            icon: { Icon: MdEdit, size: 20, color: '#4d85ee' },
          },
          {
            name: 'Excluir',
            icon: { Icon: MdDelete, size: 20, color: '#de3b3b' },
          },
        ],
        items: response.data.map((delivery) => ({
          id: delivery.id,
          recipient: delivery.recipient.name,
          index: delivery.deliveryman_id,
          deliveryman: delivery.deliveryman.name,
          city: delivery.recipient.city,
          state: delivery.recipient.state,
          status: delivery.status || 'Pendente',
        })),
      });
    }

    loadDeliveries();
  }, []);

  return (
    <Container>
      <PageTitle>Gerenciando Encomendas</PageTitle>
      <Filter placeholder="Buscar por encomendas" />
      <Table data={data} />
    </Container>
  );
}
