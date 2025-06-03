import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AdminView from "./AdminView";
import ClientView from "./ClientView";

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
  // const isAdmin = true;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>
      {isAdmin ? <AdminView navigation={navigation} /> : <ClientView navigation={navigation} user={user} />}
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
