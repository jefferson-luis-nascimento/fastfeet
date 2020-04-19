import React, { useRef, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNCamera from 'react-native-camera';

import {
  Container,
  BackgroundNavigation,
  Content,
  CameraContainer,
  CameraPreview,
  Image,
  Camera,
  TakePhotoButton,
  SubmitButton,
} from './styles';

import api from '~/services/api';

export default function ViewProblem() {
  const cameraRef = useRef();

  const [uri, setUri] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();

  const { delivery } = route.params;

  useEffect(() => {}, []);

  async function handleSubmit() {
    const dataFile = new FormData();
    dataFile.append('file', {
      type: 'image/jpeg',
      uri,
      name: 'assignature.jpg',
    });

    console.tron.log(dataFile);

    try {
      const response = await api.post('files', dataFile);

      console.tron.log(response.data);

      await api.put(`/deliverymen/${delivery.deliveryman_id}/deliveries`, {
        delivery_id: delivery.id,
        signature_id: response.data.id,
      });

      Alert.alert('FastFeet', 'Entrega concluída com sucesso!');
      navigation.navigate('Dashboard');
    } catch (error) {
      console.tron.log(error);
    }
  }

  async function takePicture() {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      await setUri(data.uri);
    }
  }

  return (
    <Container>
      <BackgroundNavigation />
      <Content>
        {uri ? (
          <CameraPreview>
            <Image source={{ uri }} />
          </CameraPreview>
        ) : (
          <CameraContainer>
            <Camera ref={cameraRef} au type="back" captureAudio={false} />
            <TakePhotoButton onPress={takePicture}>
              <Icon name="camera" size={40} color="#fff" />
            </TakePhotoButton>
          </CameraContainer>
        )}

        <SubmitButton disabled onPress={handleSubmit}>
          Enviar
        </SubmitButton>
      </Content>
    </Container>
  );
}
