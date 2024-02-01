import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from './Card';
import { motivationalQuotes } from '../constants';
import Contact from './Contact';

const ClientView = ({ navigation }) => {

  const username = 'Marcos' // esto va a venir desde la DB user.name
  const gender = 'hombre' // esto va a venir desde la DB user.gender

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
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
        <Text style={styles.welcomeText}>{gender == 'hombre' ? `Bienvenido ${username}` : `Bienvenida ${username}`}</Text>
        <Card phrases={motivationalQuotes} />
        <Card title={'Objetivos de hoy'} />
        <Card title={'Como llegar a mi objetivo --> link a pdf'} />
      </View>

      <Contact style={styles.contactContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  contactContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  welcomeText: {
    fontSize: 32,
    color: '#1155bc',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },
});

export default ClientView;
