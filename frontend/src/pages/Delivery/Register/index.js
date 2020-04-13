import React, { useState, useEffect, useCallback, useRef } from 'react';

import { SelectContainer } from './styles';

import Container from '~/components/Container';
import RegisterHeader from '~/components/RegisterHeader';
import AsyncSelect from '~/components/Form/AsyncSelect';
import Input from '~/components/Form/Input';
import Form from '~/components/Form';

import api from '~/services/api';
import history from '~/services/history';

export default function Register() {
  const formRef = useRef(null);
  const [recipients, setRecipients] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);

  const initialData = {
    recipient_id: 0,
    deliveryman_id: 0,
    product: '',
  };

  const loadRecipients = useCallback(async (name) => {
    const response = await api.get('/recipients', {
      params: {
        q: name,
      },
    });

    const options = response.data.map((recipient) => ({
      value: recipient.id,
      label: recipient.name,
    }));

    setRecipients(options);

    return options;
  }, []);

  const loadDeliverymen = useCallback(async (name) => {
    const response = await api.get('/deliverymen', {
      params: {
        q: name,
      },
    });

    const options = response.data.map((deliveryman) => ({
      value: deliveryman.id,
      label: deliveryman.name,
    }));

    setDeliverymen(options);

    return options;
  }, []);

  useEffect(() => {
    async function load() {
      await Promise.all([loadRecipients(), loadDeliverymen()]);
    }

    load();
  }, [loadDeliverymen, loadRecipients]);

  function handleBack() {
    history.push('/deliveries');
  }

  async function handleSubmit(data, { reset }) {
    const { recipient_id, deliveryman_id, product } = data;

    await api.post('/deliveries', {
      recipient_id,
      deliveryman_id,
      product,
    });

    reset();
  }

  return (
    <Container>
      <RegisterHeader
        handleBack={handleBack}
        handleSave={() => formRef.current.submitForm()}
      >
        Cadastro de Encomendas
      </RegisterHeader>

      <Form initialData={initialData} ref={formRef} onSubmit={handleSubmit}>
        <SelectContainer>
          <AsyncSelect
            name="recipient_id"
            label="Destinatário"
            placeholder="Selecione um Destinário"
            defaultOptions={recipients}
            loadOptions={loadRecipients}
            noOptionsMessage={() => 'Nenhum Destinatário encontrado'}
          />
          <AsyncSelect
            name="deliveryman_id"
            label="Entregador"
            placeholder="Selecione um Entregador"
            defaultOptions={deliverymen}
            loadOptions={loadDeliverymen}
            noOptionsMessage={() => 'Nenhum entregador encontrado'}
          />
        </SelectContainer>

        <Input
          type="text"
          name="product"
          label="Produto"
          placeholder="Produto a ser entregue"
        />
      </Form>
    </Container>
  );
}
