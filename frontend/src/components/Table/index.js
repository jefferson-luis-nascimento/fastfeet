import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Container, TableList } from './styles';
import Action from '~/components/Action';
import NameWithInitials from '~/components/NameWithInitials';
import Status from '~/components/Status';
import Paging from '~/components/Paging';

export default function Table({ data }) {
  const [newData] = useState({
    columns: data.columns,
    items: data.items.map((item, itemIndex) => ({
      index: itemIndex,
      newItem: Object.values(item).map((value, index) => ({
        value,
        type: data.columns[index].type || '',
      })),
    })),
  });

  function renderColumn(type, value, index) {
    switch (type) {
      case 'id':
        return <td>#{value}</td>;
      case 'initials':
        return (
          <td>
            <NameWithInitials index={index}>{value}</NameWithInitials>
          </td>
        );
      case 'status':
        return (
          <>
            <td>
              <Status>{value}</Status>
            </td>
          </>
        );
      default:
        return <td>{value}</td>;
    }
  }

  return (
    <Container>
      <TableList>
        <thead>
          <tr>
            {newData.columns.map((column) => (
              <th key={column.name}>{column.name}</th>
            ))}
            <th className="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {newData.items.map((newItem) => (
            <tr key={newItem.id}>
              {console.tron.log(newItem)}
              {Object.values(newItem).map((value) =>
                Object.values(value).map((newValue) =>
                  renderColumn(newValue.type, newValue.value, newItem.index)
                )
              )}
              <td className="actions">
                <Action />
              </td>
            </tr>
          ))}
        </tbody>
      </TableList>
      <Paging />
    </Container>
  );
}

Table.propTypes = {
  data: PropTypes.shape.isRequired,
};
