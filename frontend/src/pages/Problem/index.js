import React, { useState, useEffect, useCallback } from 'react';
import { MdRemoveRedEye, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import { DeliveryInfo } from './styles';

import Container from '~/components/Container';
import Table from '~/components/Table';
import PageTitle from '~/components/PageTitle';
import CustomModal from '~/components/CustomModal';

import api from '~/services/api';

export default function Problem() {
  const [data, setData] = useState(null);
  const [paging, setPaging] = useState({ currentPage: 1, totalPages: 1 });
  const [problemItem, setProblemItem] = useState(null);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const numberOfPages = useCallback((totalItems, itemsPerPage) => {
    const rest = totalItems % itemsPerPage;

    return Math.trunc(totalItems / itemsPerPage) + (rest > 0 ? 1 : 0);
  }, []);

  const loadProblems = useCallback(
    (page) => {
      async function load() {
        const response = await api.get('/problems', {
          params: { page },
        });

        setPaging({
          currentPage: page,
          itemsPerPage: 5,
          totalPages: numberOfPages(response.data.count, 5),
        });

        setData({
          columns: [
            { name: 'ID', show: false },
            { name: 'Encomenda', type: 'id' },
            { name: 'Problema' },
          ],
          items: response.data.rows.map((problem) => {
            return {
              id: problem.id,
              delivery_id: problem.delivery_id,
              description: problem.description,
            };
          }),
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
              name: 'Excluir',
              label: 'Cancelar encomenda',
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
    loadProblems(1);
  }, []);

  async function handleVisualize(id) {
    const response = await api.get(`/problems/${id}`);

    setProblemItem(response.data);

    openModal();
  }

  async function handleRemove(id) {
    const ok = window.confirm(`Confirma o cancelamento da entrega #${id}?`);

    if (!ok) return;

    try {
      await api.delete(`/problems/${id}/cancel-delivery`);
      toast.success('Entrega cancelada com sucesso!');

      await loadProblems(paging.currentPage);
    } catch (error) {
      toast.error('Não foi possível cancelar a entrega nesse momento!');
    }
  }

  function handleAction(action, id) {
    switch (action.toLowerCase()) {
      case 'visualizar':
        handleVisualize(id);
        break;
      case 'excluir':
        handleRemove(id);
        break;
      default:
        throw new Error('Ação não encontrada.');
    }
  }

  return (
    <>
      <Container>
        <PageTitle>Problemas na Entrega</PageTitle>
        <Table
          data={data}
          paging={paging}
          loadItems={loadProblems}
          handleAction={handleAction}
        />
      </Container>
      {openModal && problemItem && (
        <CustomModal openModal={modalIsOpen} setIsOpen={setIsOpen}>
          <DeliveryInfo>
            <h3>Visualizar o Problema</h3>
            <div>
              <p>{problemItem.description}</p>
            </div>
          </DeliveryInfo>
        </CustomModal>
      )}
    </>
  );
}
