import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import { Input, Button, CheckBox, Text, } from 'react-native-elements';

const SignIn = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  useEffect(() => {
    setIsFormCompleted(name !== '' && email !== '' && password !== '' && isChecked);
  }, [name, email, password, isChecked]);

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://ejemplo.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
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
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/KM-color-black.png')} style={styles.logo} />
      <Input
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CheckBox
        checked={isChecked}
        onPress={() => setIsChecked(!isChecked)}
        iconType="material-community"
        checkedIcon="checkbox-outline"
        uncheckedIcon="checkbox-blank-outline"
        title="Aceptar terminos y condiciones"
      />
      <Button
        title="Registrarse"
        onPress={handleSignUp}
        disabled={!isFormCompleted}
      />
      <View style={styles.containerSeparator}>
        <View style={styles.separator} />
        <TextInput style={styles.textInput}>O</TextInput>
        <View style={styles.separator} />
      </View>

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
    marginTop: '-35%',
    marginBottom: '20%',
  },
  containerSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10
  },
  separator: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    flex: 1,
  },
  textInput: {
    marginHorizontal: 10,
    color: '#000',
  },
});

export default SignIn;
