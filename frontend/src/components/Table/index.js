import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, TableList } from './styles';
import Action from '~/components/Action';
import NameWithInitials from '~/components/NameWithInitials';
import Status from '~/components/Status';
import Paging from '~/components/Paging';

export default function Table({ data }) {
  const [newData, setNewData] = useState(null);

  useEffect(() => {
    if (!data) return;

    console.tron.log(data);

    setNewData({
      columns: data.columns.map((column) => ({
        name: column.name,
        type: column.type ? column.type : '',
        show: column.show === undefined ? true : column.show,
      })),
      actions: data.actions,
      items: data.items.map((item) => ({
        newItem: Object.values(item).map((value, index) => {
          return {
            value,
            type: data.columns[index].type || '',
            show:
              data.columns[index].show === undefined
                ? true
                : data.columns[index].show,
            index: item.index,
          };
        }),
      })),
    });
  }, [data]);

  function renderColumn(item) {
    if (!item.show) return <></>;

    switch (item.type) {
      case 'id':
        return <td>#{item.value}</td>;
      case 'initials':
        return (
          <td>
            <NameWithInitials index={item.index}>{item.value}</NameWithInitials>
          </td>
        );
      case 'status':
        return (
          <>
            <td>
              <Status>{item.value}</Status>
            </td>
          </>
        );
      default:
        return <td>{item.value}</td>;
    }
  }

  return (
    <Container>
      <TableList>
        <thead>
          <tr>
            {newData &&
              newData.columns.map(
                (column) =>
                  column.show && <th key={column.name}>{column.name}</th>
              )}
            <th className="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {newData &&
            newData.items.map((newItem) => (
              <tr key={newItem.id}>
                {Object.values(newItem).map((value) =>
                  Object.values(value).map((newValue) => renderColumn(newValue))
                )}
                <td className="actions">
                  <Action actions={newData.actions} />
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
  data: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.arrayOf(PropTypes.object).isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
