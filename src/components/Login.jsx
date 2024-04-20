import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    iosClientId: process.env.CLIENT_ID_IOS,
    webClientId: process.env.CLIENT_ID_WEB,
    androidClientId: process.env.CLIENT_ID_ANDROID
  });

  useEffect(() => {
    handleSignInWithGoogle()
  }, [response])

  async function handleSignInWithGoogle() {
    const user = await getLocalUser()
    if (!user) {
      if (response?.type === "success") {
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
    if (!token) return;
    try {
      const response = await axios.get(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const user = response.data;
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      return user; // Devolver el usuario obtenido
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    signInWithGoogle();
  }, [response]);

  const signInWithGoogle = async () => {
    try {
      const userJSON = await AsyncStorage.getItem("@user");

      if (userJSON) {
        setUserInfo(JSON.parse(userJSON));
      } else if (response?.type === "success") {
        const userInfo = await getUserInfo(response.authentication.accessToken);
        navigation.navigate('Home', { user: userInfo });
      }
    } catch (error) {
      console.error("Error retrieving user data from AsyncStorage:", error);
    }
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
            onPress={() => promptAsync()}
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
