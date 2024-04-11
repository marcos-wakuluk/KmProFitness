import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native';

const linkMP = 'https://www.mercadolibre.com.ar/'


const Payment = () => {
  const handlePress = () => {
    Linking.openURL(linkMP);
  };

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.link}>Mercado pago</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
})

export default Payment;
