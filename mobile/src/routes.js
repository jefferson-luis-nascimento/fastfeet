import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const activeTintLabelColor = '#7d40e7';
const inactiveTintLabelColor = '#999';

export default function createRouter(isSigned = false) {
  return !isSigned ? (
    <Stack.Navigator
      headerBackTitleVisible={false}
      headerLayoutPreset="center"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#7d40e7',
        },
        headerTintColor: '#FFF',
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: '', headerTransparent: true }}
      />
    </Stack.Navigator>
  ) : (
    <Tabs.Navigator
      tabOptions={{
        activeTintColor: '#7d40e7',
        inactiveTintColor: '#999',
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Entregas',
          tabBarIcon: ({ color }) => (
            <Icon name="list" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle" size={30} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
