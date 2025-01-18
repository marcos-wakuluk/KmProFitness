import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet, Alert, Platform, Image, TextInput, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { WebView } from "react-native-webview";
import Ionicons from "react-native-vector-icons/Ionicons";

const DietPlanList = ({ navigation }) => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    fetchPdfFiles();
  }, []);

  const fetchPdfFiles = async () => {
    try {
      let url = "http://localhost:3000/pdfFiles";
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
      <Button title="Ver PDF" onPress={() => setSelectedPdf(item.mealPdfUrl)} />
      <Button title="Asignar a Cliente" onPress={() => navigation.navigate("AssignDietView", { dietId: item._id })} />
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

        const response = await fetch("http://localhost:3000/uploadPdf", {
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

  const filteredDiet = pdfFiles.filter((diet) => {
    const normalizedSearchText = searchText.toLowerCase();
    const normalizedUserName = diet.name.toLowerCase();

    return normalizedUserName.includes(normalizedSearchText);
  });

  return (
    <>
      <View style={styles.background}></View>
      <Image source={require("../assets/KM-white.png")} style={styles.image} />
      {selectedPdf ? (
        <>
          <TouchableOpacity onPress={() => setSelectedPdf(null)}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <WebView source={{ uri: selectedPdf }} style={{ flex: 1, marginTop: "5%" }} />
        </>
      ) : (
        <>
          <TextInput style={styles.searchInput} placeholder="Buscar por nombre" value={searchText} onChangeText={(text) => setSearchText(text)} />
          <FlatList data={filteredDiet} keyExtractor={(pdf) => pdf._id.toString()} renderItem={renderPdfItem} style={{ marginTop: "5%" }} />
          <View style={{ marginBottom: "5%" }}>
            <Button
              title="Ver PDF de Ejemplo"
              onPress={() => setSelectedPdf("https://www.renfe.com/content/dam/renfe/es/General/PDF-y-otros/Ejemplo-de-descarga-pdf.pdf")}
            />
            <Button title="Subir PDF" onPress={uploadPdf} />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
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
});

export default DietPlanList;
