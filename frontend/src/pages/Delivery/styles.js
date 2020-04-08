import styled from 'styled-components';

export const Container = styled.div`
  margin: 10px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 1000px;

  h1 {
    color: #444;
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 24px;
  }
`;

export const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  div {
    position: relative;
    display: flex;
    align-items: center;
  }

  div svg {
    position: absolute;
    left: 5px;
  }

  input {
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 32px;
    padding: 10px 10px 10px 30px;
    color: #444;
  }

  button {
    border: none;
    border-radius: 4px;
    background: #7d40e7;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: 5px;

    span {
      margin: 0 10px;
    }
  }
`;

export const DeliveryTable = styled.table`
  width: 100%;
  border: none;
  border-collapse: separate;
  border-spacing: 0 15px;

  tr th {
    font-size: 16px;
    color: #444;
    text-align: left;
  }

  tr th .actions {
    text-align: right;
  }

  tr td {
    border: 1px solid #fff;
    border-radius: 4px;
    background: #fff;
    color: #666;
    text-align: left;
    line-height: 20px;
    padding: 5px 10px;
  }

  tr td .actions {
    text-align: end;
  }
`;
