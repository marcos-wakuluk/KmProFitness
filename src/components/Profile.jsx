import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { calculateAge } from "../utils/functions";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const route = useRoute();
  const { userId } = route.params || {};

  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(calculateAge(""));
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [profileImage, setProfileImage] = useState(require("../assets/user-default.png"));
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const userData = response.data.data;
      console.log("🚀 ~ fetchUser ~ userData:", userData);
      initializeUserData(userData.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoading(false);
    }
  };

  const initializeUserData = (userData) => {
    setUser(userData);
    setName(userData.name || "");
    setPhone(userData.phone || "");
    setAge(calculateAge(userData.birthday || ""));
    setWeight(userData.weight || "");
    setHeight(userData.details[0].height || "");
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        name,
        phone,
        weight,
        height,
      };

      const response = await axios.put(`http://localhost:3000/users/${user._id}`, updatedUser);

      const updatedUserData = response.data.data.user;
      setName(updatedUserData.name);
      setPhone(updatedUserData.phone);
      setAge(calculateAge(updatedUserData.birthday));
      setWeight(updatedUserData.weight);
      setHeight(updatedUserData.height);

      setEditMode(false);
    } catch (error) {
      console.error("Error al guardar los datos del usuario:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      setProfileImage(result.assets[0].uri);
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
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
      <View style={styles.container}>
        <Image source={profileImage} style={styles.profileImage} />
        <Button onPress={handleImagePick} disabled={!editMode} style={styles.button}>
          Elegir imagen de perfil
        </Button>
        <TextInput label="Nombre" value={name} onChangeText={setName} editable={editMode} style={styles.input} />
        <TextInput label="Telefono" value={phone.toString()} onChangeText={setPhone} keyboardType="phone-pad" editable={editMode} style={styles.input} />
        <TextInput label="Edad" value={age.toString()} onChangeText={setAge} keyboardType="numeric" editable={editMode} style={styles.input} />
        <TextInput label="Altura" value={weight.toString()} onChangeText={setWeight} keyboardType="numeric" editable={editMode} style={styles.input} />
        <TextInput label="Peso" value={height.toString()} onChangeText={setHeight} keyboardType="numeric" editable={editMode} style={styles.input} />
        <Button onPress={editMode ? handleSave : handleEdit} style={styles.button}>
          {editMode ? "Guardar" : "Editar"}
        </Button>
      </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    alignSelf: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
    backgroundColor: "#52c0ff",
    color: "#144a94",
  },
});

export default Profile;
