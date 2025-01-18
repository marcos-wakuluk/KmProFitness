import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const AdminView = ({ navigation }) => {
  return (
    <>
      <View style={styles.background}></View>
      <Image source={require("../assets/KM-white.png")} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("UserList")}>
            <Icon name="person" size={50} color="black" />
            <Text style={styles.cardText}>Usuarios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DietPlanList")}>
            <Icon name="restaurant" size={50} color="black" />
            <Text style={styles.cardText}>Alimentacion</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("WorkoutList")}>
            <Icon name="barbell-sharp" size={50} color="black" />
            <Text style={styles.cardText}>Rutinas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Payment")}>
            <Icon name="wallet" size={50} color="black" />
            <Text style={styles.cardText}>Pagos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    top: "20%",
  },
  welcomeText: {
    fontSize: 40,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: "#666",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    elevation: 5,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    color: "black",
  },
});

export default AdminView;
