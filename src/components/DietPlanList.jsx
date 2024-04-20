import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet, Alert, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const DietPlanList = () => {
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
        { id: 1, name: 'File1.pdf' },
        { id: 2, name: 'File2.pdf' },
        { id: 3, name: 'File3.pdf' },
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
      <Button title="Asignar a Cliente" onPress={() => assignToClient(item.id)} />
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
      if (Platform.OS === 'ios') {
        result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      } else if (Platform.OS === 'android') {
        result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf', copyToCacheDirectory: false });
      }

      if (result.type === 'success') {
        setSelectedPdf(result);

        const fileUri = result.uri;
        const fileName = fileUri.split('/').pop();
        const formData = new FormData();
        formData.append('pdf', {
          uri: fileUri,
          name: fileName,
          type: 'application/pdf',
        });

        const response = await fetch('http://localhost:3000//uploadPdf', {
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

        Alert.alert('Éxito', 'El PDF se ha subido correctamente');
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
        keyExtractor={(pdf) => pdf.id.toString()}
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
