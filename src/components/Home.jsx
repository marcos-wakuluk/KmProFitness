import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import AdminView from "./AdminView";
import ClientView from "./ClientView";
import CompletedData from "../screens/CompleteData";

const Home = ({ navigation }) => {
  const route = useRoute();
  const { user } = route.params || {};

  const isAdmin = user.isAdmin === true;
  const completedData = user.newUser;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>
      {isAdmin && <AdminView navigation={navigation} />}
      {completedData && <CompletedData user={user} />}
      {!completedData && !isAdmin && <ClientView navigation={navigation} user={user} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Home;
