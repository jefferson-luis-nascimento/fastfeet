import React, { forwardRef } from 'react';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, CCamera, TakePhotoButton } from './styles';

const Camera = forwardRef((props, ref) => {
  const { takePicture } = props;
  return (
    <Container>
      <CCamera
        ref={ref}
        {...props}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        captureAudio={false}
      />
      <TakePhotoButton onPress={takePicture}>
        <Icon name="camera" size={40} color="#fff" />
      </TakePhotoButton>
    </Container>
  );
});

export default Camera;
