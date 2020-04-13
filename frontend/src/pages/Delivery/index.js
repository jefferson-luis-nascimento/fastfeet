import React, { useState, useEffect, useCallback } from 'react';
import { MdRemoveRedEye, MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { DeliveryInfo, DeliveryDates, DeliverySignature } from './styles';

import Container from '~/components/Container';
import Filter from '~/components/Filter';
import Table from '~/components/Table';
import PageTitle from '~/components/PageTitle';
import CustomModal from '~/components/CustomModal';

import api from '~/services/api';
import history from '~/services/history';

export default function Delivery() {
  const [data, setData] = useState(null);
  const [paging, setPaging] = useState({ currentPage: 1, totalPages: 1 });
  const [deliveryItem, setDeliveryItem] = useState(null);
  const [filter, setFilter] = useState('');

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const numberOfPages = useCallback((totalItems, itemsPerPage) => {
    const rest = totalItems % itemsPerPage;

    return Math.trunc(totalItems / itemsPerPage) + (rest > 0 ? 1 : 0);
  }, []);

  const loadDeliveries = useCallback(
    (page, product) => {
      async function load() {
        const response = await api.get('/deliveries', {
          params: { page, q: product },
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
  }, []);

  useEffect(() => {
    loadDeliveries(paging.currentPage, filter);
  }, [filter]);

  function handleRegister() {
    history.push('/deliveries/register');
  }

  async function handleVisualize(id) {
    const response = await api.get(`/deliveries/${id}`);

    setDeliveryItem({
      ...response.data,
      start_date_formatted: response.data.start_date
        ? format(parseISO(response.data.start_date), 'dd/MM/yyyy', {
            locale: pt,
          })
        : 'Data de Retirada não informada.',
      end_date_formatted: response.data.end_date
        ? format(parseISO(response.data.end_date), 'dd/MM/yyyy', {
            locale: pt,
          })
        : 'Data de Entrega não informada.',
    });

    openModal();
  }

  function handleEdit(id) {
    history.push(`/deliveries/register/${id}`);
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
    <>
      <Container>
        <PageTitle>Gerenciando Encomendas</PageTitle>
        <Filter
          filter={filter}
          setFilter={setFilter}
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
      {openModal && deliveryItem && (
        <CustomModal openModal={modalIsOpen} setIsOpen={setIsOpen}>
          <DeliveryInfo>
            <h3>Informações da Encomenda</h3>
            <div>
              <strong>Produto: </strong>
              <span>{deliveryItem.product}</span>
            </div>
            <div>
              <strong>Endereço: </strong>
              <span>{deliveryItem.recipient.fullAddress}</span>
            </div>
            <div>
              <strong>Cidade/UF: </strong>
              <span>{`${deliveryItem.recipient.city} - ${deliveryItem.recipient.state}`}</span>
            </div>
            <div>
              <strong>CEP: </strong>
              <span>{deliveryItem.recipient.zip_code}</span>
            </div>
          </DeliveryInfo>
          <DeliveryDates>
            <h3>Datas</h3>
            <div>
              <strong>Retirada: </strong>
              <span>{deliveryItem.start_date_formatted}</span>
            </div>
            <div>
              <strong>Entrega: </strong>
              <span>{deliveryItem.end_date_formatted}</span>
            </div>
          </DeliveryDates>
          <DeliverySignature>
            <strong>Assinatura do Destinatário</strong>

            {deliveryItem.signature && (
              <img src={deliveryItem.signature.url} alt="Assinatura" />
            )}
          </DeliverySignature>
        </CustomModal>
      )}
    </>
  );
}
