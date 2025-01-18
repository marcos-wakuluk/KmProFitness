import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet, Alert, Platform, TextInput, Image } from "react-native";
// import * as DocumentPicker from 'expo-document-picker';
import axios from "axios";

const WorkoutList = ({ navigation }) => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchPdfFiles();
  }, [pdfFiles]);

  const fetchPdfFiles = async () => {
    try {
      let url = "http://localhost:3000/pdfFilesTraining";
      const response = await axios.get(url);
      const pdfFiles = response.data;

      setPdfFiles(pdfFiles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
      setLoading(false);
    }
  };

  const renderPdfItem = ({ item }) => (
    <View style={styles.pdfItem}>
      <Text>{item.name}</Text>
      <Button title="Asignar a Cliente" onPress={() => navigation.navigate("AssignWorkoutView", { workoutId: item._id })} />
    </View>
  );

  const assignToClient = (pdfId) => {
    // Aquí puedes implementar la lógica para asignar el PDF al cliente seleccionado
    // Puedes abrir un modal para seleccionar el cliente o realizar alguna otra acción
    console.log(`Asignar PDF ${pdfId} a un cliente`);
  };

  const uploadPdf = async () => {
    try {
      let result = null;
      if (Platform.OS === "ios") {
        result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
      } else if (Platform.OS === "android") {
        result = await DocumentPicker.getDocumentAsync({ type: "application/pdf", copyToCacheDirectory: false });
      }

      if (result) {
        const fileUri = result.assets[0].uri;
        const fileName = result.assets[0].name;
        const formData = new FormData();

        formData.append("pdf", {
          uri: fileUri,
          name: fileName,
          type: "application/pdf",
        });
        formData.append("name", fileName);
        formData.append("description", "Descripción");

        const response = await fetch("http://localhost:3000/uploadPdfTraining", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.ok) {
          Alert.alert("Éxito", "El PDF se ha subido correctamente");
        } else {
          Alert.alert("Error", "Ha ocurrido un error al subir el archivo PDF");
        }
      } else {
        Alert.alert("Error", "No se ha seleccionado ningún archivo PDF");
      }
    } catch (error) {
      console.log("Error al seleccionar el archivo PDF:", error);
      Alert.alert("Error", "Ha ocurrido un error al seleccionar el archivo PDF");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const filteredDiet = pdfFiles.filter((workout) => {
    const normalizedSearchText = searchText.toLowerCase();
    const normalizedUserName = workout.name.toLowerCase();

    return normalizedUserName.includes(normalizedSearchText);
  });

  return (
    <>
      <View style={styles.background}></View>
      <Image source={require("../assets/KM-white.png")} style={styles.image} />
      <TextInput style={styles.searchInput} placeholder="Buscar por nombre" value={searchText} onChangeText={(text) => setSearchText(text)} />
      <FlatList data={filteredDiet} keyExtractor={(pdf) => pdf._id.toString()} renderItem={renderPdfItem} />
      <Button title="Subir PDF" onPress={uploadPdf} />
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
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pdfItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default WorkoutList;
