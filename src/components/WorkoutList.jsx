import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, Platform, TextInput, Image, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { WebView } from "react-native-webview";
import Ionicons from "react-native-vector-icons/Ionicons";

const WorkoutList = ({ navigation }) => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    fetchPdfFiles();
  }, []);

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
      <Text style={{ fontSize: 20 }}>{item.name}</Text>
      <TouchableOpacity onPress={() => setSelectedPdf(item.url)} style={styles.iconButton}>
        <Ionicons name="eye" size={24} color="#d1e0f3" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AssignWorkoutView", { workoutId: item._id })} style={styles.iconButton}>
        <Ionicons name="person-add" size={24} color="#d1e0f3" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AssignWorkoutView", { workoutId: item._id })} style={styles.iconButton}>
        <Ionicons name="trash" size={24} color="#d1e0f3" />
      </TouchableOpacity>
    </View>
  );

  const uploadPdf = async () => {
    try {
      let result = null;
      if (Platform.OS === "ios") {
        result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
        result = result.assets[0];
      } else if (Platform.OS === "android") {
        result = await DocumentPicker.getDocumentAsync({ type: "application/pdf", copyToCacheDirectory: false });
      }

      if (result) {
        const fileUri = result.uri;
        const fileName = result.name;
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
      if (DocumentPicker.isCancel(error)) {
        console.log("Selección de archivo cancelada");
      } else {
        console.log("Error al seleccionar el archivo PDF:", error);
        Alert.alert("Error", "Ha ocurrido un error al seleccionar el archivo PDF");
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const filteredWorkout = pdfFiles.filter((workout) => {
    const normalizedSearchText = searchText.toLowerCase();
    const normalizedUserName = workout.name.toLowerCase();

    return normalizedUserName.includes(normalizedSearchText);
  });

  return (
    <>
      <View style={styles.background}></View>
      <Image source={require("../assets/KM-white.png")} style={styles.image} />
      {selectedPdf ? (
        <>
          <WebView source={{ uri: selectedPdf }} style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => setSelectedPdf(null)} style={styles.floatingButton}>
            <Ionicons name="arrow-back" size={40} color="black" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.searchContainer}>
            <TextInput style={styles.searchInput} placeholder="Buscar..." value={searchText} onChangeText={(text) => setSearchText(text)} />
            <TouchableOpacity onPress={uploadPdf} style={styles.uploadButton}>
              <Ionicons name="add" size={24} color="#32CD32" />
            </TouchableOpacity>
          </View>
          <FlatList data={filteredWorkout} renderItem={renderPdfItem} keyExtractor={(item) => item._id} />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
  uploadButton: {
    padding: 10,
    borderRadius: 5,
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
    top: "40%",
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
  floatingButton: {
    position: "absolute",
    bottom: 20,
    padding: 10,
    elevation: 5,
  },
});

export default WorkoutList;
