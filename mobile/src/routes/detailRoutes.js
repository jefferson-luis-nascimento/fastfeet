import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BackButton from '~/components/BackButton';

import Dashboard from '~/pages/Dashboard';
import DeliveryDetail from '~/pages/DeliveryDetail';
import AddProblem from '~/pages/AddProblem';
import ViewProblem from '~/pages/ViewProblem';
import ConfirmDelivery from '~/pages/ConfirmDelivery';

const Stack = createStackNavigator();

export default function DeliveryRotues() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: '#fff',
        headerTransparent: true,
      }}
      initialRouteName="Dashboard"
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="DeliveryDetail"
        component={DeliveryDetail}
        options={{
          title: 'Detalhes da encomenda',
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="AddProblem"
        component={AddProblem}
        options={{
          title: 'Informar problema',
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="ViewProblem"
        component={ViewProblem}
        options={{
          title: 'Visualizar problemas',
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="ConfirmDelivery"
        component={ConfirmDelivery}
        options={{
          title: 'Confirmar entrega',
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack.Navigator>
  );
}
