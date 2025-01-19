import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AdminView from "./AdminView";
import ClientView from "./ClientView";
import CompletedData from "../screens/CompleteData";

const Home = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params || {};

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user, navigation]);

  const isAdmin = !!user?.isAdmin;
  const completedData = !!user?.newUser;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>
      {isAdmin ? (
        <AdminView navigation={navigation} />
      ) : completedData ? (
        <CompletedData user={user} />
      ) : (
        <ClientView navigation={navigation} user={user} />
      )}
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
