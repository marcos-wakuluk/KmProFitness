import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const SpinnerOverlay = ({ text = "Cargando...", color = "#00aaff", size = "large" }) => (
  <View style={styles.overlay}>
    <ActivityIndicator size={size} color={color} />
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  text: {
    color: "#fff",
    marginTop: 10,
    fontSize: 18,
  },
});

export default SpinnerOverlay;
