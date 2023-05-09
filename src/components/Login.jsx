import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // try {
    //   const response = await fetch('https://ejemplo.com/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ email, password })
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     navigation.navigate('Home');
    //   } else {
    //     // TODO
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    navigation.navigate('Home');

  };

  const handleRegister = () => {
    navigation.navigate('Signin');
  };

  const handleforgotPassword = () => {
    navigation.navigate('PasswordRecovery');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/KM-color-black.png')} style={styles.logo} />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <TouchableOpacity onPress={handleRegister}>
        <Text>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleforgotPassword}>
        <Text>Olvido su contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 275,
    height: 150,
    marginTop: '20%',
    marginBottom: '20%',
  }
});

export default Login;
