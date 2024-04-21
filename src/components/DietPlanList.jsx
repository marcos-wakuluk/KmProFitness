import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet, Alert, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const DietPlanList = ({ navigation }) => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    fetchPdfFiles();
  }, []);

  const fetchPdfFiles = async () => {
    try {
      // Aquí deberías realizar la lógica para obtener la lista de archivos PDF
      // Puedes hacer una solicitud a tu servidor o cargar archivos localmente
      // En este ejemplo, simplemente cargamos una lista ficticia
      const fakePdfFiles = [
        { _id: 1, name: 'File1.pdf' },
        { _id: 2, name: 'File2.pdf' },
        { _id: 3, name: 'File3.pdf' },
      ];

      setPdfFiles(fakePdfFiles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching PDF files:', error);
      setLoading(false);
    }
  };

  const renderPdfItem = ({ item }) => (
    <View style={styles.pdfItem}>
      <Text>{item.name}</Text>
      <Button title="Asignar a Cliente" onPress={() => navigation.navigate('AssignDietView', { dietId: item._id })} />
    </View>
  );

  const uploadPdf = async () => {
    try {
      let result = null;
      if (Platform.OS === 'ios') {
        result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      } else if (Platform.OS === 'android') {
        result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf', copyToCacheDirectory: false });
      }

      if (result) {
        const fileUri = result.assets[0].uri;
        const fileName = fileUri.split('/').pop();
        const formData = new FormData();
        formData.append('pdf', {
          uri: fileUri,
          name: fileName,
          type: 'application/pdf',
        });
        formData.append('name', fileName);
        formData.append('description', 'Descripción');

        const response = await fetch('http://localhost:3000/uploadPdf', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.ok) {
          Alert.alert('Éxito', 'El PDF se ha subido correctamente');
        } else {
          Alert.alert('Error', 'Ha ocurrido un error al subir el archivo PDF');
        }
      } else {
        Alert.alert('Error', 'No se ha seleccionado ningún archivo PDF');
      }
    } catch (error) {
      console.log('Error al seleccionar el archivo PDF:', error);
      Alert.alert('Error', 'Ha ocurrido un error al seleccionar el archivo PDF');
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
    <View style={styles.container}>
      <FlatList
        data={pdfFiles}
        keyExtractor={(pdf) => pdf._id.toString()}
        renderItem={renderPdfItem}
      />
      <Button title="Subir PDF" onPress={uploadPdf} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DietPlanList;
