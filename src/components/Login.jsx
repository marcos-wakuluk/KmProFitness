import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Button, Image, Text } from 'react-native';
import { Input } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "405200534919-9t0ffa84n7nu0nhtfk166keougdosleg.apps.googleusercontent.com",
    webClientId: "405200534919-ata6h1i6es75mepqqu4i4uokgl782flm.apps.googleusercontent.com"
  });

  useEffect(() => {
    handleSignInWithGoogle()
  }, [response])

  async function handleSignInWithGoogle() {
    const user = await getLocalUser()
    if (!user) {
      if (response?.type === "success") {
        console.log("🚀 ~ handleSignInWithGoogle ~ response.authentication.accessToken:", response.authentication.accessToken)
        getUserInfo(response.authentication.accessToken)
      }
    } else {
      setUserInfo(user)
    }
  }

  const getLocalUser = async () => {
    const data = AsyncStorage.getItem("@user")
    if (!data) return null

    return data
  }

  const getUserInfo = async (token) => {
    if (!token) return
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Autorization: `Bearer ${token}` }
        }
      )
      const user = await response.json()
      await AsyncStorage.setItem("@user", JSON.stringify(user))
      setUserInfo(user)
    } catch (error) {
      console.log(error)
    }
  }



  const handleLogin = (userRole) => {
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
    navigation.navigate('Home', { userRole });
  };

  const handleRegister = () => {
    navigation.navigate('Signin');
  };

  const handleforgotPassword = () => {
    navigation.navigate('PasswordRecovery');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/KM-color-black.png')} style={styles.logo} />
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
      {!userInfo ? (
        <View>
          <Button
            title="sign in whit google"
            disabled={!request}
            onPress={() => {
              promptAsync()
            }}
          />
        </View>
      ) : (
        <View>
          {userInfo?.picture && (
            <Image source={{ uri: userInfo.picture }} />
          )}
          <Text>Email: {userInfo.email}</Text>
          <Text>Verified: {userInfo.verified_email ? "yes" : "no"}</Text>
          <Text>Name:{userInfo.name}</Text>
          <Button
            title='Remove Local Storage'
            onPress={async () => await AsyncStorage.removeItem("@user")} />
        </View>
      )}
      <Button title="Iniciar sesión cliente" onPress={() => handleLogin('client')} />
      <Button title="Iniciar sesión admin" onPress={() => handleLogin('admin')} />
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
