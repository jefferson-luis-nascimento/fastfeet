import React, { useState, useEffect, useCallback } from 'react';
import { MdRemoveRedEye, MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import Container from '~/components/Container';
import Filter from '~/components/Filter';
import Table from '~/components/Table';
import PageTitle from '~/components/PageTitle';

import api from '~/services/api';
import history from '~/services/history';

export default function Delivery() {
  const [data, setData] = useState(null);

  const [paging, setPaging] = useState({ currentPage: 1, totalPages: 1 });

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

  function handleRegister() {
    history.push('/deliveries/register');
  }

  function handleVisualize(id) {
    console.tron.log(id);
  }

  function handleEdit(id) {
    console.tron.log(id);
  }

  async function handleRemove(id) {
    const ok = window.confirm(`Confirma a exclusão da entrega #${id}?`);

    if (!ok) return;

    try {
      await api.delete(`/deliveries/${id}`);
      toast.success('Registro excluído com sucesso!');

      await loadDeliveries(paging.currentPage);
    } catch (error) {
      toast.error('Não foi possível excluir o registro nesse momento!');
    }
  }

  function handleAction(action, id) {
    switch (action.toLowerCase()) {
      case 'visualizar':
        handleVisualize(id);
        break;
      case 'editar':
        handleEdit(id);
        break;
      case 'excluir':
        handleRemove(id);
        break;
      default:
        throw new Error('Ação não encontrada.');
    }
  }

  return (
    <Container>
      <PageTitle>Gerenciando Encomendas</PageTitle>
      <Filter
        placeholder="Buscar por encomendas"
        handleRegister={handleRegister}
      />
      <Table
        data={data}
        paging={paging}
        loadItems={loadDeliveries}
        handleAction={handleAction}
      />
    </Container>
  );
}
