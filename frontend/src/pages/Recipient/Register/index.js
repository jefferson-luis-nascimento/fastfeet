import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { AddressContainer, CityContainer } from './styles';

import Container from '~/components/Container';
import RegisterHeader from '~/components/RegisterHeader';
import Input from '~/components/Form/Input';
import Form from '~/components/Form';

import api from '~/services/api';
import history from '~/services/history';

export default function Register({ match }) {
  const formRef = useRef(null);

  const { id } = match.params;

  useEffect(() => {
    async function loadRecipients() {
      if (id) {
        const response = await api.get(`/recipients/${id}`);

        formRef.current.setData({
          name: response.data.name,
          address: response.data.address,
          number: response.data.number,
          address_complement: response.data.address_complement,
          city: response.data.city,
          state: response.data.state,
          zip_code: response.data.zip_code,
        });
      }
    }

    loadRecipients();
  }, [id]);

  function handleBack() {
    history.push('/recipients');
  }

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        address: Yup.string().required('O destinatário é obrigatório'),
        number: Yup.number().required('O número é obrigatório'),
        address_complement: Yup.string(),
        city: Yup.string().required('A cidade obrigatória'),
        state: Yup.string()
          .min(2, 'O estado deve possuir 2 caracteres')
          .max(2, 'O estado deve possuir 2 caracteres')
          .required('O estado é obrigatório'),
        zip_code: Yup.string()
          .required('O CEP é obrigatório')
          .min(8, 'CEP deve possuir 8 caracters')
          .max(8, 'CEP deve possuir 8 caracters'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        name,
        address,
        number,
        address_complement,
        city,
        state,
        zip_code,
      } = data;

      if (id) {
        try {
          await api.put(`/recipients/${id}`, {
            name,
            address,
            number,
            address_complement,
            city,
            state,
            zip_code,
          });

          toast.success('Destinatário alterado com sucesso!');

          reset();

          history.push('/recipients');
        } catch (error) {
          toast.error('Falha ao alterar a o destinatário!');
        }
      } else {
        try {
          await api.post('/recipients', {
            name,
            address,
            number,
            address_complement,
            city,
            state,
            zip_code,
          });

          toast.success('Destinatário cadastrado com sucesso!');

          reset();
        } catch (error) {
          toast.error('Falha ao gravar o destinatário!');
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
        Cadastro de Destinatários
      </RegisterHeader>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" label="Nome" placeholder="Nome do destinatário" />
        <AddressContainer>
          <Input
            className="address"
            name="address"
            label="Rua"
            placeholder="Rua Exemplo"
          />
          <Input name="number" label="Número" placeholder="Número" />
          <Input
            name="address_complement"
            label="Complemento"
            placeholder="Complemento se tiver"
          />
        </AddressContainer>
        <CityContainer>
          <Input name="city" label="Cidade" placeholder="Nome da cidade" />
          <Input name="state" label="Estado" placeholder="Sigla do estado" />
          <Input name="zip_code" label="CEP" placeholder="CEP da rua" />
        </CityContainer>
      </Form>
    </Container>
  );
}

Register.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
