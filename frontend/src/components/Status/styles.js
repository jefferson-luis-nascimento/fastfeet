import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
`;

export const Content = styled.span`
  background: ${(props) => lighten(0.3, props.color)};
  border: 0;
  position: relative;
  height: 30px;
  padding: 8px 10px 2px 25px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.color};

  &::before {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 10px;
    height: 10px;
    background: ${(props) => props.color};
    content: '';
    border-radius: 50%;
  }
`;
