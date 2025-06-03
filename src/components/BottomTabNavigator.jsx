import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import DietPlanScreen from './DietPlanScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Plan de Alimentación') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Guía de Entrenamiento') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Pago') {
            iconName = focused ? 'card' : 'card-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Plan de Alimentación" component={DietPlanScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
