import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View``;

export const CCamera = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  height: 200px;
`;

export const TakePhotoButton = styled(RectButton)`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  align-self: center;

  margin-top: 10px;
`;
