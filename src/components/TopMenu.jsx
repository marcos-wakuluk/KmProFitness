import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon={({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        )}
        onPress={() => navigation.navigate('Home')}
      />
      <IconButton
        icon={({ color, size }) => (
          <Icon name="bell-outline" color={color} size={size} />
        )}
        onPress={() => navigation.navigate('Workout')}
      />
      <IconButton
        icon={({ color, size }) => (
          <Icon name="bell-outline" color={color} size={size} />
        )}
        onPress={() => navigation.navigate('FoodPlan')}
      />
      <IconButton
        icon={({ color, size }) => (
          <Icon name="account-outline" color={color} size={size} />
        )}
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default Menu;
