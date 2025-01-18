import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

const Workout = () => {
  const source = "https://www.renfe.com/content/dam/renfe/es/General/PDF-y-otros/Ejemplo-de-descarga-pdf.pdf";

  return (
    <>
      <View style={styles.background}></View>
      <Image source={require("../assets/KM-white.png")} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>Plan de Entrenamiento</Text>
        <WebView source={{ uri: source }} style={styles.pdf} onLoad={() => console.log("PDF loaded")} onError={(error) => console.log(error)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    backgroundColor: "#0061a7",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  image: {
    position: "absolute",
    resizeMode: "contain",
    zIndex: 0,
    height: 200,
    width: 200,
    alignSelf: "center",
    top: "40%",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100,
  },
});

export default Workout;
