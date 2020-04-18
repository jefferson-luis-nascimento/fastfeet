import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  border: 1px solid #f8f9fd;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 20px 0px 0px;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-left: 10px;
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  margin-left: 10px;
  color: #7d40e7;
  font-weight: bold;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fd;
  padding: 20px 10px;
`;
export const DetailButton = styled(RectButton)`
  padding: 10px;
`;

export const DetailButtonText = styled.Text`
  font-size: 14px;
  color: #7d40e7;
  font-weight: bold;
`;
