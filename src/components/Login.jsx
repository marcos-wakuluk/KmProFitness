import { useState, useEffect } from "react";
import axios from "axios";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { Input } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
WebBrowser.maybeCompleteAuthSession();
import { API_BASE_URL } from "@env";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("wakuluk.marcos@gmail.com");
  const [password, setPassword] = useState("da6d3hxa");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const checkIfUserIsLoggedIn = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const updatedUser = await fetchUser(user.id);
        await AsyncStorage.setItem("@user", JSON.stringify(updatedUser));
        navigation.navigate("Home", { user: updatedUser });
      }
    } catch (error) {
      console.error("Error verificando la sesión:", error);
    }
  };

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
      return response.data.data.user;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, pass: password });
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
        placeholderTextColor="rgba(255,255,255,0.7)"
        value={email}
        onChangeText={setEmail}
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.inputInnerContainer}
        inputStyle={styles.input}
        leftIcon={{ type: "font-awesome", name: "envelope", color: "#fff" }}
      />

      <Input
        placeholder="Contraseña"
        placeholderTextColor="rgba(255,255,255,0.7)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.inputInnerContainer}
        inputStyle={styles.input}
        leftIcon={{ type: "font-awesome", name: "lock", color: "#fff" }}
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={22} color="#fff" />
          </TouchableOpacity>
        }
      />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Olvidó su contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerText}>¿No tienes una cuenta? Registraarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0061a7",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 275,
    height: 150,
    marginTop: "40%",
    marginBottom: "20%",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: "#fff",
    marginBottom: 20,
    textAlign: "right",
    fontSize: 18,
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
    fontSize: 22,
  },
  registerText: {
    color: "#fff",
    marginTop: 15,
    fontSize: 18,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  inputInnerContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    color: "#fff",
    fontSize: 18,
    paddingLeft: 5,
  },
});

export default Login;
