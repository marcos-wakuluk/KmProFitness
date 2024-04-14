import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { IoPerson, IoRestaurant, IoFitness, IoWallet } from 'react-icons/io5';

const AdminView = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('UserList')}>
          <IoPerson size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DietPlanList')}>
          <IoRestaurant size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('WorkoutList')}>
          <IoFitness size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
          <IoWallet size={30} color="black" />
        </TouchableOpacity>
      </View>
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
})

export default AdminView;
