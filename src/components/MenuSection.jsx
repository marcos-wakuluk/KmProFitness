import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const MenuSection = ({ navigation, user }) => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: user._id })}>
        <Icon name="person" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("DietPlanScreen", { mealPlan: user.mealPlan })}>
        <Icon name="restaurant" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Workout", { trainingPlan: user.trainingPlan })}>
        <Icon name="barbell-sharp" size={40} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
        <Icon name="wallet" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
});

export default MenuSection;
