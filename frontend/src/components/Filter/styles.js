import styled from 'styled-components';

export const Container = styled.div`
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
