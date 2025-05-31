import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Input, Button } from "react-native-elements";
import { API_BASE_URL } from "@env";

const PasswordRecovery = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleRecovery = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/password-recovery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        navigation.navigate("Login");
      } else {
        alert("Ocurrio un error al enviar el email de recuperacion de contraseña");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/KM-color-black.png")} style={styles.logo} />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Enviar email" onPress={handleRecovery} />
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
    marginTop: "-75%",
    marginBottom: "20%",
  },
});

export default PasswordRecovery;
