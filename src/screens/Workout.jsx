import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Workout = () => {
  return (
    <>
      <View style={styles.background}></View>
      <Image
        source={require('../assets/KM-white.png')}
        style={styles.image}
      />
      <View style={styles.container}>
        <Text>aca se va a ver el pdf</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default Workout;
