import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/fastfeet-logo.png';

import { Content } from '~/pages/_layouts/auth/styles';

import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve possuir no mínimo 6 caracteres')
    .required('Senha é obrigatória.'),
});

export default function SingIn() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  async function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Content>
      <img src={logo} alt="FastFeet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          label="SEU E-MAIL"
          placeholder="exemplo@email.com"
        />

        <Input
          name="password"
          type="password"
          label="SUA SENHA"
          placeholder="Sua senha segura"
        />
        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no Sistema'}
        </button>
      </Form>
    </Content>
  );
}
