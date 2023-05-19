import React, { useState,useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import {useAuthRequest } from 'expo-auth-session/providers/google';
import {makeRedirectUri } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const[userInfo, setUserInfo] = useState(null)
  const [password, setPassword] = useState('');
  
  const [request, response, promptAsync] = useAuthRequest({
    clientId: '',
    scopes: ['profile', 'email'],
    redirectUri: makeRedirectUri({
      scheme: 'kmprofitness'
     }),

  });
  useEffect(()=>{
    handleSingInWithGoogle()
  }, [response])


  const handleSingInWithGoogle = async () => {
    const user = await AsyncStorage.getItem('@user')
    if (!user){
      if (response?.type==="success") {
        await getUserInfo(response.authentication.accessToken)
          //navigation.navigate('Home');
      }
    }else{
      setUserInfo(JSON.parse(user))
    }
  };
  const getUserInfo = async (token) => {
    if (!token) return
    try{
      const response = await fetch('https://www.google.com/userinfo/v2/me',{
        headers :{Authorization: `Bearer ${token}`},
      }
    )
    const user = await response.json()
    await AsyncStorage.setItem('@user',JSON.stringify(user))
    setUserInfo(user)
    }catch(error){
      console.log(error)
    }

  }
  const handleRegister = () => {
    navigation.navigate('Signin');
  };

  const handleForgotPassword = () => {
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
      <Button title="Iniciar sesión"  />
      <TouchableOpacity onPress={handleRegister}>
        <Text>{JSON.stringify(userInfo)}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text>¿Olvidó su contraseña?</Text>
      </TouchableOpacity>
      <Button title='Iniciar sesión con Google' onPress={() => promptAsync()}/>
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
  },
});

export default Login;
