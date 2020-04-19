import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;

export const BackgroundNavigation = styled.View`
  background: #7d40e7;
  height: 180px;
`;

export const Content = styled.View`
  flex: 1;
  background: #fff;
  margin: -100px 20px 20px;

  border-radius: 4px;
`;

export const Detail = styled.View`
  border: 1px solid #f8f9fd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;

export const HeaderText = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  margin-left: 10px;
`;

export const LabelContainer = styled.View`
  justify-content: center;
  align-items: flex-start;
`;

export const Label = styled.Text`
  color: #ccc;
  font-weight: bold;
`;

export const Text = styled.Text`
  color: #444;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Buttons = styled.View`
  background: #f8f9fd;
  border: 1px solid #f8f9fd;
  border-radius: 4px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled(RectButton)`
  flex: 1;
  height: 80px;
  justify-content: center;
  align-items: center;
`;
export const ButtonText = styled.Text`
  text-align: center;
  color: #ccc;
`;
