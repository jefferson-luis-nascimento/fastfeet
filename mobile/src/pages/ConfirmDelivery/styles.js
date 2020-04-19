import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { RectButton } from 'react-native-gesture-handler';
import Button from '~/components/Button';

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
  padding: 10px;
`;

export const CameraContainer = styled.View`
  background: #fff;
  position: relative;
  padding: 10px 0;
  flex: 1;
  margin-bottom: 30px;
`;

export const CameraPreview = styled.View`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 30px;
`;

export const Image = styled.Image`
  flex: 1;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const TakePhotoButton = styled(RectButton)`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: -20px;
`;

export const SubmitButton = styled(Button)`
  background: #7d40e7;
  height: 60px;
  justify-content: center;
  align-items: center;
`;
