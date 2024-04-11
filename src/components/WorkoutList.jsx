import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet } from 'react-native';

const WorkoutList = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleAddNewPdf = () => {
    // Aquí puedes implementar la lógica para agregar un nuevo PDF
    // Puedes abrir un formulario para ingresar detalles del nuevo PDF
    console.log('Agregar nuevo PDF');
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
      <Button title="Agregar Nuevo PDF" onPress={handleAddNewPdf} />
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

export default WorkoutList;
