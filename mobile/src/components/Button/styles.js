import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 46px;
  background: #82bf18;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  align-self: stretch;
`;

export const Text = styled.Text`
  color: #fff;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align-vertical: center;
  background: transparent;
`;
