import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const AdminView = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image source={require("../assets/KM-white.png")} style={styles.image} />
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("UserList")}>
            <Icon name="person" size={50} color="black" />
            <Text style={styles.cardText}>Usuarios</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DietPlanList")}>
            <Icon name="restaurant" size={50} color="black" />
            <Text style={styles.cardText}>Alimentación</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("WorkoutList")}>
            <Icon name="barbell-sharp" size={50} color="black" />
            <Text style={styles.cardText}>Rutinas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0061a7",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    resizeMode: "contain",
    height: 150,
    width: 150,
    marginBottom: 40,
  },
  menuContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: "#666",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    elevation: 5,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    color: "black",
  },
});

export default AdminView;
