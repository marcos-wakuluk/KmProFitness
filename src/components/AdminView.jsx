import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AdminView = ({ navigation }) => {
  return (
    <>
      <View style={styles.background}></View>
      <Image
        source={require('../assets/KM-white.png')}
        style={styles.image}
      />
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('UserList')}>
            <Icon name="person" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DietPlanList')}>
            <Icon name="restaurant" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('WorkoutList')}>
            <Icon name="fitness" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
            <Icon name="wallet" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    backgroundColor: '#0061a7',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  image: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: 0,
    height: 200,
    width: 200,
    alignSelf: 'center',
    top: '40%',
  },
  welcomeText: {
    fontSize: 40,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
})

export default AdminView;
