import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage,
} from 'react-icons/md';

import { Container, TableList, Footer } from './styles';
import Action from '~/components/Action';
import NameWithInitials from '~/components/NameWithInitials';
import Status from '~/components/Status';

export default function Table({ data }) {
  const [newData] = useState({
    columns: data.columns,
    items: data.items.map((item, itemIndex) => ({
      newItem: Object.values(item).map((value, index) => ({
        value,
        type: data.columns[index].type || '',
        index: itemIndex,
      })),
    })),
  });

  function renderColumn(type, value, index) {
    switch (type) {
      case 'id':
        return <td>#{value}</td>;
      case 'initials':
        return (
          <>
            <td>
              <NameWithInitials index={index}>{value}</NameWithInitials>
            </td>
          </>
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
              {Object.values(newItem).map((value) =>
                Object.values(value).map((newValue) =>
                  renderColumn(newValue.type, newValue.value, newValue.index)
                )
              )}
              <td className="actions">
                <Action />
              </td>
            </tr>
          ))}
        </tbody>
      </TableList>
      <Footer>
        <MdFirstPage size={20} color="#666" />
        <MdChevronLeft size={20} color="#666" />
        <MdChevronRight size={20} color="#666" />
        <MdLastPage size={20} color="#666" />
      </Footer>
    </Container>
  );
}

Table.propTypes = {
  data: PropTypes.shape.isRequired,
};
