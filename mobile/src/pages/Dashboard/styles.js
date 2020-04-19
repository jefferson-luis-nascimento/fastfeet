import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const NameContainer = styled.View`
  flex: 1;
`;

export const WelcomeText = styled.Text`
  font-size: 14px;
  color: #999;
`;

export const NameText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #444;
`;

export const ExitButton = styled(RectButton)`
  background: #fff;
  align-self: center;
`;

export const ListHeader = styled.View`
  margin-top: 20px;
  justify-content: space-between;
  flex-direction: row;
`;

export const ListHeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #444;
`;

export const RadioContainer = styled.View`
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
  font-weight: ${(props) => (props.checked ? 'bold' : 'normal')};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
