import React from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';

const PasswordRecovery = () => {
  const handleRecovery = async () => {
    try {
      const response = await fetch('https://ejemplo.com/api/password-recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('Login');
      } else {
        // TODO
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/KM-color-black.png')} style={styles.logo} />
      <Text>Ingrese su dirección de correo electrónico para recuperar su contraseña</Text>
      <Button title="Enviar email" onPress={handleRecovery} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 275,
    height: 150,
    marginTop: '-75%',
    marginBottom: '20%',
  }
});

export default PasswordRecovery;
