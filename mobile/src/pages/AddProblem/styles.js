import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: true,
  behavior: 'padding',
})`
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
  padding: 10px;
  margin-bottom: 10px;
`;

export const TextInput = styled.TextInput`
  border: 1px solid #f8f9fd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  color: #444;
  height: 200px;
  text-align-vertical: top;
`;

export const SubmitButton = styled(Button)`
  background: #7d40e7;
  height: 60px;
`;
