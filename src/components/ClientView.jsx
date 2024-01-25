import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from './Card';
import { motivationalQuotes } from '../constants';

const ClientView = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="person" size={30} color="#1155bc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DietPlanScreen')}>
          <Icon name="restaurant" size={30} color="#1155bc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Workout')}>
          <Icon name="fitness" size={30} color="#1155bc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
          <Icon name="wallet" size={30} color="#1155bc" />
        </TouchableOpacity>
      </View>

      <Card phrases={motivationalQuotes} />
      <Card title={'Objetivos de hoy'} />
      <Card title={'busqueda con IA'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
});

export default ClientView;
