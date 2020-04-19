import styled from 'styled-components/native';

import Avatar from '~/components/Avatar';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  justify-content: center;
  align-items: flex-start;
  padding: 30px 20px;
`;

export const Image = styled(Avatar)`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  margin-bottom: 20px;
  align-self: center;
`;

export const TextContainer = styled.View``;

export const Label = styled.Text`
  font-size: 14px;
  color: #999;
`;

export const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ExitButton = styled(Button)`
  background: #e74040;
  height: 60px;
`;
