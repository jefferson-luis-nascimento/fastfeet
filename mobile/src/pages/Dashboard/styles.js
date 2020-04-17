import styled from 'styled-components/native';

import Button from '~/components/Button';

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
  font-size: 16px;
  font-weight: bold;
  color: #444;
`;
export const ExitButton = styled(Button)`
  background: #fff;
  align-self: center;
`;

export const ListHeader = styled.View`
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
`;
export const ListHeaderTitle = styled.View`
  font-size: 24px;
  font-weight: bold;
  color: #444;
`;
export const RadioContainer = styled.View``;
export const RadioButton = styled(Button)`
  background: #fff;
  color: ${(props) => (props.checked ? '#7d40e7' : '#999')};
`;
