import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { Input } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.CLIENT_ID_IOS,
    webClientId: process.env.CLIENT_ID_WEB,
    androidClientId: process.env.CLIENT_ID_ANDROID,
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === "success") {
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
    }
  }

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const checkIfUserIsLoggedIn = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        navigation.navigate("Home", { user });
      }
    } catch (error) {
      console.error("Error verificando la sesión:", error);
    }
  };

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = response.data;
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", { email, pass: password });
      const user = response.data.user;

      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        navigation.navigate("Home", { user });
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
  };

  const handleRegister = () => {
    navigation.navigate("Signin");
  };

  const handleForgotPassword = () => {
    navigation.navigate("PasswordRecovery");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/KM-color-black.png")} style={styles.logo} />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIcon={{ type: "font-awesome", name: "envelope", color: "#fff" }}
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIcon={{ type: "font-awesome", name: "lock", color: "#fff" }}
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={24} color="#fff" />
          </TouchableOpacity>
        }
      />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Olvido su contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerText}>¿No tienes una cuenta? Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0061a7",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 275,
    height: 150,
    marginTop: "20%",
    marginBottom: "10%",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    color: "#fff",
  },
  forgotPasswordText: {
    color: "#fff",
    marginBottom: 20,
    textAlign: "right",
  },
  loginButton: {
    backgroundColor: "#00aaff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerText: {
    color: "#fff",
    marginTop: 15,
  },
});

export default Login;
