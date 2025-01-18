import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, ActivityIndicator, FlatList } from "react-native";
import axios from "axios";
import { calculateAge } from "../utils/functions";

const UserDetail = ({ route }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const userData = response.data.data;

      setUser(userData.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const keyTranslations = {
    biceps: "Bíceps",
    waist: "Cintura",
    chest: "Pecho",
    thigh: "Muslo",
    dietPlan: "Plan de alimentación",
    trainingPlan: "Plan de entrenamiento",
    weight: "Peso",
    date: "Fecha",
  };

  const renderHeader = () => (
    <View style={styles.headerRow}>
      {user.details &&
        user.details.length > 0 &&
        Object.keys(user.details[0])
          .filter((key) => key !== "_id")
          .map((key, index) => (
            <Text style={styles.headerCell} key={index}>
              {keyTranslations[key] || key}
            </Text>
          ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {Object.entries(item)
        .filter(([key]) => key !== "_id")
        .map(([key, value], idx) => (
          <Text style={styles.cell} key={idx}>
            {key === "date" ? new Date(value).toLocaleDateString("es-AR", { year: "2-digit", month: "2-digit", day: "2-digit" }) : value}
          </Text>
        ))}
    </View>
  );

  const renderUserInfo = () => (
    <View style={styles.userDetailContainer}>
      <Text style={styles.userInfo}>{`Nombre: ${user.name} ${user.lastName}`}</Text>
      <Text style={styles.userInfo}>{`Edad: ${calculateAge(user.birthday)} años`}</Text>
      <Text style={styles.userInfo}>{`Email: ${user.email}`}</Text>
      <Text style={styles.userInfo}>{`Teléfono: ${user.phone}`}</Text>
      <Text style={styles.userInfo}>{`Altura: ${user.height} cm`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.background}></View>
      <Image source={require("../assets/KM-white.png")} style={styles.image} />
      {user && (
        <FlatList
          data={user.details}
          ListHeaderComponent={() => (
            <>
              {renderUserInfo()}
              {renderHeader()}
            </>
          )}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.tableContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    top: "10%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userDetailContainer: {
    marginTop: 250,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    padding: 5,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    padding: 5,
  },
  tableContainer: {
    marginTop: 20,
  },
});

export default UserDetail;
