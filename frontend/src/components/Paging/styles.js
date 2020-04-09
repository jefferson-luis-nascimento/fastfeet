import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background: none;
    border: none;
    padding: 10px;
    color: #444;
    font-size: 16px;
    font-weight: bold;

    &:hover {
      background: #ddd;
    }
  }
`;
