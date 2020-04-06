import { takeLatest, call, put, all } from 'redux-saga/effects';

import { signInSuccess } from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (error) {
    console.tron.warn(error);
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
