import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  #initials {
    text-align: center;
    padding: 10px;
    background: ${lighten(0.25, '#a28fd0')};
    border-radius: 50%;
    color: #a28fd0;
    margin: 0 5px;
    font-size: 16px;
    font-weight: bold;
  }

  #name {
    color: #666;
    font-size: 16px;
    font-weight: bold;
  }
`;
