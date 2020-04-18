import styled from 'styled-components/native';
import { lighten } from 'polished';

export const Container = styled.View`
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const Initials = styled.Text`
  text-align: center;
  text-align-vertical: center;
  background: ${(props) => lighten(0.25, props.color)};
  width: 80px;
  height: 80px;
  border-radius: 40px;
  color: ${(props) => props.color};
  margin: 0 5px;
  font-size: 35px;
`;
