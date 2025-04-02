import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, TextInput, StyleSheet, Text, FlatList, Button, Image, ActivityIndicator } from "react-native";
import { CheckBox } from "react-native-elements";

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
      const response = await axios.get("http://localhost:3001/users", {
        params: {
          field: "name,trainingPlan,lastUpdate",
        },
      });
      const { data } = response.data;
      setUsers(data.users);
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
    const normalizedUserName = user.name.toLowerCase();
    return normalizedUserName.includes(normalizedSearchText);
  });

  const handleSaveChanges = async () => {
    try {
      await Promise.all(
        users.map((user) => axios.put(`http://localhost:3001/users/${user._id}`, { trainingPlan: user.trainingPlan }))
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
    const fecha = new Date(item.lastUpdateTraining);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const fechaFormateada = `${dia < 10 ? "0" + dia : dia}/${mes < 10 ? "0" + mes : mes}/${anio}`;

    return (
      <View style={styles.userItem}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text>{fechaFormateada}</Text>
        <CheckBox checked={item.trainingPlan === workoutId} onPress={() => handleCheckboxChange(item._id)} />
      </View>
    );
  };

  return (
    <>
      <View style={styles.background}></View>
      <Image source={require("../assets/KM-white.png")} style={styles.image} />
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar usuario"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList data={filteredUsers} keyExtractor={(user) => user._id.toString()} renderItem={renderUserItem} />
      <Button title="Guardar" onPress={handleSaveChanges} />
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    backgroundColor: "#069af1",
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
  },
});

export default AssignWorkoutView;
