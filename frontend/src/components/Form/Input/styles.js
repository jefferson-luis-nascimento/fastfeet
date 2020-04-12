import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 10px 20px;
`;

export const InputText = styled.input.attrs({
  type: (props) => props.type,
})``;
