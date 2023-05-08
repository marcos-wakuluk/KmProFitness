import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const PasswordRecovery = () => {
  return (
    <View style={styles.container}>
      <Text>Ingrese su dirección de correo electrónico para recuperar su contraseña</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default PasswordRecovery;
