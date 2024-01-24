import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Payment = () => {
  return (
    <View style={style.container}>
      <Text>Aca va todo el sistema de pago</Text>
      <Text>Link a MP</Text>
    </View>
  );
};

style = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})

export default Payment;
