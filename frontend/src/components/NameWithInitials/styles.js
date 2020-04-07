import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Initials = styled.div`
  text-align: center;
  padding: 10px;
  background: ${(props) => lighten(0.25, props.color)};
  border-radius: 50%;
  color: ${(props) => props.color};
  margin: 0 5px;
  font-size: 16px;
  font-weight: bold;
`;

export const Name = styled.span`
  color: #666;
  font-size: 16px;
  font-weight: bold;
`;
