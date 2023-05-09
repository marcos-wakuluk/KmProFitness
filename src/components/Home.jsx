import React from 'react';
import { View, Text, Button } from 'react-native';
import Menu from './Menu';

const Home = ({ navigation }) => {
  return (
    <View>
      <Menu />
      {/* <Button title="perfil" onPress={() => navigation.navigate('Profile')} /> */}
    </View>
  );
};

export default Home;
