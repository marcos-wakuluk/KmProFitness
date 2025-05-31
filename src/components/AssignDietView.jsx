import { useState, useEffect } from "react";
import axios from "axios";
import { View, TextInput, StyleSheet, Text, FlatList, Button, Image, ActivityIndicator } from "react-native";
import { CheckBox } from "react-native-elements";
import { API_BASE_URL } from "@env";

const AssignDietView = ({ navigation, route }) => {
  const { dietId } = route.params;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [userCheckboxes, setUserCheckboxes] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/users`, {
        params: {
          field: "name,mealPlan,lastUpdate",
        },
      });
      setUsers(data.data.users);
      initializeCheckboxes(data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const initializeCheckboxes = (users) => {
    const checkboxes = {};
    users.forEach((user) => {
      checkboxes[user._id] = user.mealPlan === dietId;
    });
    setUserCheckboxes(checkboxes);
  };

  const handleCheckboxChange = (userId) => {
    setUserCheckboxes((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const renderUserItem = ({ item }) => {
    const fecha = new Date(item.lastUpdateMeal);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const fechaFormateada = `${dia < 10 ? "0" + dia : dia}/${mes < 10 ? "0" + mes : mes}/${anio}`;

    return (
      <View style={styles.userItem}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text stile={styles.date}>{fechaFormateada}</Text>
        <CheckBox checked={userCheckboxes[item._id]} onPress={() => handleCheckboxChange(item._id)} />
      </View>
    );
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
          const newMealPlan = userCheckboxes[user._id] ? dietId : null;
          await axios.put(`${API_BASE_URL}/users/${user._id}`, { mealPlan: newMealPlan });
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
      <Button title="Guardar" onPress={handleSaveChanges} />
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
  userName: {
    marginRight: "auto",
    fontSize: 24,
  },
  date: {
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
});

export default AssignDietView;
