import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { SelectContainer } from './styles';

import Container from '~/components/Container';
import RegisterHeader from '~/components/RegisterHeader';
import AsyncSelect from '~/components/Form/AsyncSelect';
import Input from '~/components/Form/Input';
import Form from '~/components/Form';

import api from '~/services/api';
import history from '~/services/history';

export default function Register({ match }) {
  const formRef = useRef(null);
  const [recipients, setRecipients] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);

  const { id } = match.params;

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

    async function loadDelivery() {
      if (id) {
        const response = await api.get(`/deliveries/${id}`);

        formRef.current.setData({
          recipient_id: response.data.recipient_id,
          deliveryman_id: response.data.deliveryman_id,
          product: response.data.product,
        });

        console.tron.log(formRef.current.getData(), response.data);

        formRef.current.setFieldValue('recipient_id', {
          value: response.data.recipient_id,
          label: response.data.recipient.name,
        });
        formRef.current.setFieldValue('deliveryman_id', {
          value: response.data.deliveryman_id,
          label: response.data.deliveryman.name,
        });

        console.tron.log(formRef.current.getData(), response.data);
      }
    }

    loadDelivery();
  }, [id, loadDeliverymen, loadRecipients]);

  function handleBack() {
    history.push('/deliveries');
  }

  async function handleSubmit(data, { reset }) {
    console.tron.log(formRef.current.getData(), data);

    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        product: Yup.string().required('O nome do produto é obrigatório'),
        recipient_id: Yup.string().required('O destinatário é obrigatório'),
        deliveryman_id: Yup.string().required('O entregador é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { recipient_id, deliveryman_id, product } = data;

      if (id) {
        try {
          await api.put(`/deliveries/${id}`, {
            recipient_id,
            deliveryman_id,
            product,
          });

          toast.success('Entrega alterada com sucesso!');

          reset();

          history.push('/deliveries');
        } catch (error) {
          toast.error('Falha ao alterar a entrega!');
        }
      } else {
        try {
          await api.post('/deliveries', {
            recipient_id,
            deliveryman_id,
            product,
          });

          toast.success('Entrega cadastrada com sucesso!');

          reset();
        } catch (error) {
          toast.error('Falha ao alterar a entrega!');
        }
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Container>
      <RegisterHeader
        handleBack={handleBack}
        handleSave={() => formRef.current.submitForm()}
      >
        Cadastro de Encomendas
      </RegisterHeader>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <SelectContainer>
          <AsyncSelect
            type="text"
            name="recipient_id"
            label="Destinatário"
            placeholder="Selecione um Destinário"
            defaultOptions={recipients}
            loadOptions={loadRecipients}
            noOptionsMessage={() => 'Nenhum Destinatário encontrado'}
          />
          <AsyncSelect
            type="text"
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
