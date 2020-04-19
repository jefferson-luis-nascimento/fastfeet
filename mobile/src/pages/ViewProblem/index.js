import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  BackgroundNavigation,
  List,
  ListItem,
  Problem,
  Date,
} from './styles';

import api from '~/services/api';

export default function ViewProblem() {
  const [problems, setProblems] = useState([]);

  const route = useRoute();

  const { delivery } = route.params;

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`/deliveries/${delivery.id}/problems`);

      setProblems(
        response.data.rows.map((problem) => ({
          ...problem,
          formattedDate: format(parseISO(problem.created_at), 'dd/MM/yyyy', {
            locale: pt,
          }),
        }))
      );
    }

    loadProblems();
  }, []);

  return (
    <Container>
      <BackgroundNavigation />
      <List
        data={problems}
        keyExtractor={(problem) => String(problem.id)}
        renderItem={({ item: problem }) => (
          <ListItem>
            <Problem>{problem.description}</Problem>
            <Date>{problem.formattedDate}</Date>
          </ListItem>
        )}
      />
    </Container>
  );
}
