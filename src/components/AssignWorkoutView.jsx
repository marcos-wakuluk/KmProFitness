import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, TextInput, StyleSheet, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { CheckBox } from "react-native-elements";
import { API_BASE_URL } from "@env";

const AssignWorkoutView = ({ navigation, route }) => {
  const { workoutId } = route.params;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/users`, {
        params: {
          field: "name,trainingPlan,lastUpdate",
        },
      });
      setUsers(data.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleCheckboxChange = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        return { ...user, trainingPlan: user.trainingPlan === workoutId ? null : workoutId };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredUsers = users.filter((user) => {
    const normalizedSearchText = searchText.toLowerCase();
    const normalizedUserName = (user?.name ?? user?.email ?? "").toLowerCase();
    return normalizedUserName.includes(normalizedSearchText);
  });

  const handleSaveChanges = async () => {
    try {
      await Promise.all(
        filteredUsers.map(async (user) => {
          await axios.put(`${API_BASE_URL}/users/${user._id}`, { trainingPlan: user.trainingPlan });
        })
      );
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderUserItem = ({ item }) => {
    let fechaFormateada = "";
    if (item.mealPlan !== null && item.lastUpdateTraining) {
      const fecha = new Date(item.lastUpdateTraining);
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const anio = fecha.getFullYear();
      fechaFormateada = `${dia < 10 ? "0" + dia : dia}/${mes < 10 ? "0" + mes : mes}/${anio}`;
    }

    return (
      <View style={styles.userItem}>
        <Text style={styles.userName}>{item.name}</Text>
        {item.mealPlan !== null && fechaFormateada !== "" && <Text style={styles.date}>{fechaFormateada}</Text>}
        <CheckBox checked={item.trainingPlan === workoutId} onPress={() => handleCheckboxChange(item._id)} />
      </View>
    );
  };

  return (
    <>
      <View style={styles.background}></View>
      <Image source={require("../assets/KM-white.png")} style={styles.image} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuario"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList data={filteredUsers} keyExtractor={(user) => user._id.toString()} renderItem={renderUserItem} />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
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
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    marginRight: "auto",
    fontSize: 24,
  },
  date: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#333333",
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#00aaff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    margin: 20,
    elevation: 3,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
  },
});

export default AssignWorkoutView;
