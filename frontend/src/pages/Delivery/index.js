import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MdRemoveRedEye, MdEdit, MdDelete } from 'react-icons/md';

import { Container } from './styles';
import Filter from '~/components/Filter';
import Table from '~/components/Table';
import PageTitle from '~/components/PageTitle';

import api from '~/services/api';

export default function Delivery() {
  const [data, setData] = useState(null);

  const [paging, setPaging] = useState({ currentPage: 1, totalPages: 1 });

  function handleVisualize(action, id) {
    console.tron.log(id);
  }

  function handleEdit(action, id) {
    console.tron.log(id);
  }

  function handleRemove(action, id) {
    console.tron.log(id);
  }

  function handleAction(action, id) {
    switch (action.toLowerCase()) {
      case 'visualizar':
        handleVisualize(action, id);
        break;
      case 'editar':
        handleEdit(action, id);
        break;
      case 'excluir':
        handleRemove(action, id);
        break;
      default:
        throw new Error('Ação não encontrada.');
    }
  }

  const numberOfPages = useCallback((totalItems, itemsPerPage) => {
    const rest = totalItems % itemsPerPage;

    return Math.trunc(totalItems / itemsPerPage) + (rest > 0 ? 1 : 0);
  }, []);

  const loadDeliveries = useCallback(
    (page) => {
      async function load() {
        const response = await api.get('/deliveries', {
          params: { page },
        });

        setPaging({
          currentPage: page,
          itemsPerPage: 5,
          totalPages: numberOfPages(response.data.count, 5),
        });

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
              icon: {
                Icon: MdRemoveRedEye,
                size: 20,
                color: '#8e5be8',
              },
            },
            {
              name: 'Editar',
              icon: {
                Icon: MdEdit,
                size: 20,
                color: '#4d85ee',
              },
            },
            {
              name: 'Excluir',
              icon: {
                Icon: MdDelete,
                size: 20,
                color: '#de3b3b',
                to: '/',
              },
            },
          ],
          items: response.data.rows.map((delivery) => {
            return {
              id: delivery.id,
              recipient: delivery.recipient.name,
              index: delivery.deliveryman_id,
              deliveryman: delivery.deliveryman.name,
              city: delivery.recipient.city,
              state: delivery.recipient.state,
              status: delivery.status || 'Pendente',
            };
          }),
        });
      }

      load();
    },
    [numberOfPages]
  );

  useEffect(() => {
    loadDeliveries(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <PageTitle>Gerenciando Encomendas</PageTitle>
      <Filter placeholder="Buscar por encomendas" />
      <Table
        data={data}
        paging={paging}
        loadItems={loadDeliveries}
        handleAction={handleAction}
      />
    </Container>
  );
}
