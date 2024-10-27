import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Card from "./Card";
import { motivationalQuotes } from "../constants";
import Contact from "./Contact";
import { useRoute } from "@react-navigation/native";

const ClientView = ({ navigation }) => {
  const route = useRoute();
  const { user } = route.params;
  const username = user.email;

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <View style={styles.background}></View>

      <Image source={require("../assets/KM-white.png")} style={styles.image} />

      <View style={styles.contentContainer}>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: user._id })}>
            <Icon name="person" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("DietPlanScreen")}>
            <Icon name="restaurant" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Workout")}>
            <Icon name="barbell-sharp" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
            <Icon name="wallet" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.welcomeText}>{`Hola ${username}`}</Text>
        <Card phrases={motivationalQuotes} />
        <Card title={"Como llegar a mi objetivo --> link a pdf"} />
        <Card title={"Recorda ir a entrenar hoy"} />
      </View>

      <View style={[styles.contactContainer, { backgroundColor: "white" }]}>
        <Contact />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  background: {
    position: "absolute",
    backgroundColor: "#069af1",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  divider: {
    backgroundColor: "black",
    height: 2,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    zIndex: 1,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  contactContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  welcomeText: {
    fontSize: 40,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
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
});

export default ClientView;
