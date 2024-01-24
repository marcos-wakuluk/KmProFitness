import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa el ícono que desees usar

// import ProfileScreen from './ProfileScreen'; // Importa tus pantallas
import DietPlanScreen from './DietPlanScreen';
import WorkoutGuideScreen from './WorkoutGuideScreen';
import PaymentScreen from './PaymentScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline'; // Reemplaza con los nombres de los íconos que desees
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
        activeTintColor: 'blue', // Color de ícono activo
        inactiveTintColor: 'gray', // Color de ícono inactivo
      }}
    >
      {/* <Tab.Screen name="Perfil" component={ProfileScreen} /> */}
      <Tab.Screen name="Plan de Alimentación" component={DietPlanScreen} />
      {/* <Tab.Screen name="Guía de Entrenamiento" component={WorkoutGuideScreen} />
      <Tab.Screen name="Pago" component={PaymentScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
