import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

import { Container, BackgroundNavigation, Content } from './styles';

import api from '~/services/api';

export default function ViewProblem() {
  const route = useRoute();

  const { delivery } = route.params;

  useEffect(() => {}, []);

  return (
    <Container>
      <BackgroundNavigation />
      <Content />
    </Container>
  );
}
