import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@rocketseat/unform';

import { SelectContainer } from './styles';

import Container from '~/components/Container';
import RegisterHeader from '~/components/RegisterHeader';
import AsyncSelect from '~/components/Form/AsyncSelect';
import Form from '~/components/Form';

import api from '~/services/api';
import history from '~/services/history';

export default function Register() {
  const [recipients, setRecipients] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleBack() {
    history.push('/deliveries');
  }

  function handleSave() {}

  return (
    <Container>
      <RegisterHeader handleBack={handleBack} handleSave={handleSave}>
        Cadastro de Encomendas
      </RegisterHeader>
      <Form>
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
            name="deleiveryman_id"
            label="Entregador"
            placeholder="Selecione um Entregador"
            defaultOptions={deliverymen}
            loadOptions={loadDeliverymen}
            noOptionsMessage={() => 'Nenhum entregador encontrado'}
          />
        </SelectContainer>

        <Input className="product" type="text" name="product" label="Produto" />
      </Form>
    </Container>
  );
}
