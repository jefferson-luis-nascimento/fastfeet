import React, { useState, useEffect, useCallback } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import Container from '~/components/Container';
import Filter from '~/components/Filter';
import Table from '~/components/Table';
import PageTitle from '~/components/PageTitle';

import api from '~/services/api';
import history from '~/services/history';

export default function Recipient() {
  const [data, setData] = useState(null);
  const [paging, setPaging] = useState({ currentPage: 1, totalPages: 1 });
  const [filter, setFilter] = useState('');

  const numberOfPages = useCallback((totalItems, itemsPerPage) => {
    const rest = totalItems % itemsPerPage;

    return Math.trunc(totalItems / itemsPerPage) + (rest > 0 ? 1 : 0);
  }, []);

  const loadRecipients = useCallback(
    (page, name) => {
      async function load() {
        const response = await api.get('/recipients', {
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
            { name: 'Nome' },
            { name: 'Endereço' },
          ],
          items: response.data.rows.map((recipient) => {
            return {
              id: recipient.id,
              name: recipient.name,
              fullAddress: `${recipient.fullAddress}, ${recipient.city} - ${recipient.state}`,
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
    loadRecipients(1);
  }, []);

  useEffect(() => {
    loadRecipients(paging.currentPage, filter);
  }, [filter]);

  function handleRegister() {
    history.push('/recipients/register');
  }

  function handleEdit(id) {
    history.push(`/recipients/register/${id}`);
  }

  async function handleRemove(id) {
    const ok = window.confirm(`Confirma a exclusão do destinatário #${id}?`);

    if (!ok) return;

    try {
      await api.delete(`/recipients/${id}`);
      toast.success('Registro excluído com sucesso!');

      await loadRecipients(paging.currentPage);
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
      <PageTitle>Gerenciando Destinatários</PageTitle>
      <Filter
        filter={filter}
        setFilter={setFilter}
        placeholder="Buscar por destinatários"
        handleRegister={handleRegister}
      />
      <Table
        data={data}
        paging={paging}
        loadItems={loadRecipients}
        handleAction={handleAction}
      />
    </Container>
  );
}
