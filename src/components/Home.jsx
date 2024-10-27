import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import AdminView from "./AdminView";
import ClientView from "./ClientView";
import CompletedData from "../screens/CompleteData";

const Home = ({ navigation }) => {
  const route = useRoute();
  const { user } = route.params || {};

  const isAdmin = user.isAdmin === true;
  const completedData = user.newUser;
  // const completedData = true
  const [monthlyCheckup, setMonthlyCheckup] = useState(false);

  const currentDate = new Date();
  const lastUpdateDate = new Date();

  const monthsDiff = (currentDate.getFullYear() - lastUpdateDate.getFullYear()) * 12 + (currentDate.getMonth() - lastUpdateDate.getMonth());

  // Verifica si han pasado un mes o más
  // if (monthsDiff >= 1) {
  //   setMonthlyCheckup(true);
  // } else {
  //   setMonthlyCheckup(false);
  // }

  return (
    <View style={styles.container}>
      {isAdmin && <AdminView navigation={navigation} />}
      {/* <CompletedData user={user} /> */}
      {completedData && <CompletedData user={user} />}
      {!completedData && !isAdmin && <ClientView navigation={navigation} user={user} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Home;
