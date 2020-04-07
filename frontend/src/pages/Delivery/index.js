import React from 'react';
import { MdAdd } from 'react-icons/md';

import { Container, DeliveryTable } from './styles';
import Action from '~/components/Action';
import NameWithInitials from '~/components/NameWithInitials';
import Status from '~/components/Status';

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
              <NameWithInitials index={1}>Jhon Doe</NameWithInitials>
            </td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>
              <Status>Entregue</Status>
            </td>
            <td>
              <Action />
            </td>
          </tr>
          <tr>
            <td>#02</td>
            <td>Wolfgang Amadeus Mozart</td>
            <td>
              <NameWithInitials index={300}>Gaspar Antunes</NameWithInitials>
            </td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>
              <Status>Pendente</Status>
            </td>
            <td>
              <Action />
            </td>
          </tr>
          <tr>
            <td>#03</td>
            <td>Jhoann Sabastian Bach</td>
            <td>
              <NameWithInitials index={3}>Dai Jiang Silva</NameWithInitials>
            </td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>
              <Status>Retirada</Status>
            </td>
            <td>
              <Action />
            </td>
          </tr>
          <tr>
            <td>#03</td>
            <td>Frederich Chopin</td>
            <td>
              <NameWithInitials index={15}>
                Jefferson Luís Nascimento
              </NameWithInitials>
            </td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>
              <Status>Cancelada</Status>
            </td>
            <td>
              <Action />
            </td>
          </tr>
        </tbody>
      </DeliveryTable>
    </Container>
  );
}
