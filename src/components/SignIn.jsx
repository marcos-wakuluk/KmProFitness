import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { Input, Button, CheckBox, Text } from "react-native-elements";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/KM-color-black.png")} style={styles.logo} />
      <Input placeholder="Nombre" value={name} onChangeText={setName} />
      <Input placeholder="Correo electrónico" value={email} onChangeText={setEmail} />
      <Input placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      <CheckBox
        checked={isChecked}
        onPress={() => setIsChecked(!isChecked)}
        iconType="material-community"
        checkedIcon="checkbox-outline"
        uncheckedIcon="checkbox-blank-outline"
        title="Aceptar terminos y condiciones"
      />
      <Button title="Registrarse" onPress={handleSignUp} disabled={!isFormCompleted} />
      <View style={styles.containerSeparator}>
        <View style={styles.separator} />
        <TextInput style={styles.textInput}></TextInput>
        <View style={styles.separator} />
      </View>
      {user && <ShowUserInfo />}
      {user === null && (
        <>
          <TouchableOpacity
            disabled={!request}
            onPress={() => {
              promptAsync();
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
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 275,
    height: 150,
    marginTop: "-35%",
    marginBottom: "20%",
  },
  containerSeparator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  separator: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    flex: 1,
  },
  textInput: {
    marginHorizontal: 10,
    color: "#000",
  },
});

export default SignIn;
