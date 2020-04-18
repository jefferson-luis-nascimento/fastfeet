import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex-direction: row;
`;

export const RadioButton = styled(RectButton)`
  background: #fff;
  padding: 10px 0px 10px 10px;
`;

export const RadioButtonText = styled.Text`
  margin-right: 10px;
  font-size: 16px;
  color: ${(props) => (props.checked ? '#7d40e7' : '#ddd')};
`;
