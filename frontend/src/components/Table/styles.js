import styled from 'styled-components';

export const Container = styled.div``;

export const TableList = styled.table`
  width: 100%;
  border: none;
  border-spacing: 0 15px;

  th {
    font-size: 16px;
    color: #444;
    text-align: left;
    padding: 5px 10px;
  }

  th .actions {
    text-align: right;
  }

  td {
    background: #fff;
    color: #666;
    text-align: left;
    line-height: 20px;
    padding: 5px 10px;
  }

  td .actions {
    text-align: end;
  }

  td:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  td:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
