import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DietPlanScreen = () => {
  return (
    <View style={style.container}>
      <Text>Plan de Alimentación</Text>
      <Text>aca se va a ver el pdf</Text>
    </View>
  );
};

style = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})

export default DietPlanScreen;
