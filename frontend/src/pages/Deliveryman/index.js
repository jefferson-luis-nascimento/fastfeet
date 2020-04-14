import React, { useState, useEffect, useCallback } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import Container from '~/components/Container';
import Filter from '~/components/Filter';
import Table from '~/components/Table';
import PageTitle from '~/components/PageTitle';

import api from '~/services/api';
import history from '~/services/history';

export default function Deliveryman() {
  const [data, setData] = useState(null);
  const [paging, setPaging] = useState({ currentPage: 1, totalPages: 1 });
  const [filter, setFilter] = useState('');

  const numberOfPages = useCallback((totalItems, itemsPerPage) => {
    const rest = totalItems % itemsPerPage;

    return Math.trunc(totalItems / itemsPerPage) + (rest > 0 ? 1 : 0);
  }, []);

  const loadDeliverymen = useCallback(
    (page, name) => {
      async function load() {
        const response = await api.get('/deliverymen', {
          params: { page, q: name },
        });

        setPaging({
          currentPage: page,
          itemsPerPage: 5,
          totalPages: numberOfPages(response.data.count, 5),
        });

        setData({
          columns: [
            { name: 'ID', type: 'id' },
            { name: 'Index', show: false },
            { name: 'Foto', type: 'image' },
            { name: 'Nome' },
            { name: 'E-mail' },
          ],
          items: response.data.rows.map((deliveryman) => {
            return {
              id: deliveryman.id,
              index: deliveryman.id,
              image: {
                url: deliveryman.avatar ? deliveryman.avatar.url : null,
                defaultValue: deliveryman.name,
              },
              name: deliveryman.name,
              email: deliveryman.email,
            };
          }),
          actions: [
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
        });
      }

      load();
    },
    [numberOfPages]
  );

  useEffect(() => {
    loadDeliverymen(1);
  }, []);

  useEffect(() => {
    loadDeliverymen(paging.currentPage, filter);
  }, [filter]);

  function handleRegister() {
    history.push('/deliverymen/register');
  }

  function handleEdit(id) {
    history.push(`/deliverymen/register/${id}`);
  }

  async function handleRemove(id) {
    const ok = window.confirm(`Confirma a exclusão do entregador #${id}?`);

    if (!ok) return;

    try {
      await api.delete(`/deliverymen/${id}`);
      toast.success('Registro excluído com sucesso!');

      await loadDeliverymen(paging.currentPage);
    } catch (error) {
      toast.error('Não foi possível excluir o registro nesse momento!');
    }
  }

  function handleAction(action, id) {
    switch (action.toLowerCase()) {
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
      <PageTitle>Gerenciando Entregadores</PageTitle>
      <Filter
        filter={filter}
        setFilter={setFilter}
        placeholder="Buscar por entregador"
        handleRegister={handleRegister}
      />
      <Table
        data={data}
        paging={paging}
        loadItems={loadDeliverymen}
        handleAction={handleAction}
      />
    </Container>
  );
}
