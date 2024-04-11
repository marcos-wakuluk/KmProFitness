import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Workout = () => {
  return (
    <View style={style.container}>
      <Text>Plan de entrenamiento</Text>
      <Text>aca se va a ver el pdf</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})

export default Workout;
