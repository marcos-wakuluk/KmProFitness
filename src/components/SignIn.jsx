import React, { useEffect, useReducer, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Input, Button, CheckBox, Text } from 'react-native-elements';

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "405200534919-ata6h1i6es75mepqqu4i4uokgl782flm.apps.googleusercontent.com",
    iosClientId: "405200534919-9t0ffa84n7nu0nhtfk166keougdosleg.apps.googleusercontent.com",
    androidClientId: "405200534919-g3c1uta6mh11gm3sgb9l790cippuqn5c.apps.googleusercontent.com"
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken)
      accessToken && fetchUserInfo()
    }
  }, [response, accessToken])

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/oauth2/v1/certs", {
      headers: {
        Authorizarion: `Bearer ${accessToken}`
      }
    })

    const userInfo = await response.json()
    setUser(userInfo)
  }

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 35, fontWeigth: 'bold', marginBottom: 20 }}>Welcome</Text>
          <Image source={{ uri: user.picture }} style={{ width: 100, height: 100, borderRadius: 50 }}></Image>
          <Text style={{ fontSize: 20, fontWeigth: 'bold' }}>{user.name}</Text>
        </View>
      )
    }
  }

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
      <Image source={require('../assets/KM-color-black.png')} style={styles.logo} />
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
      {user && <ShowUserInfo />}
      {user === null && (
        <>
          <TouchableOpacity
            disabled={!request}
            onPress={() => {
              promptAsync()
            }}
          >
            <Image source={require("../assets/google-button-dark.png")} style={{ width: 300, height: 40 }} />
          </TouchableOpacity>
        </>
      )}
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
