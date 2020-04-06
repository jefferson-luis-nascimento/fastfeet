import React from 'react';
import { MdAdd } from 'react-icons/md';

import { Container, DeliveryTable } from './styles';
import NameWithInitials from '~/components/NameWithInitials';

export default function Delivery() {
  return (
    <Container>
      <h1>Gerenciando Encomendas</h1>

      <input type="text" name="filer" id="filter" />
      <button type="button">
        <MdAdd size={20} color="#fff" />
        <span>Cadastrar</span>
      </button>

      <DeliveryTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinarário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#01</td>
            <td>Ludwing Van Beethoven</td>
            <td>
              <NameWithInitials>Jhon Doe</NameWithInitials>
            </td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>
              <span>Entregue</span>
            </td>
            <td>
              <span>...</span>
              <ul>
                <li>Visualizar</li>
                <li>Editar</li>
                <li>Excluir</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </DeliveryTable>
    </Container>
  );
}
