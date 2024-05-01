import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { calculateAge } from '../utils/functions';
import { Table, Rows } from 'react-native-table-component';

const UserDetail = ({ route }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const userData = response.data.data;

      setUser(userData.user);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user:', error);
      setLoading(false);
    }
  };

  const handleButtonClick = (number) => {
    setSelectedNumber(number);
    setShowTable(true);
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
      <View style={styles.background}></View>
      <Image
        source={require('../assets/KM-white.png')}
        style={styles.image}
      />
      {user && (
        <View style={styles.userDetailContainer}>
          <Text style={styles.userInfo}>{`Nombre: ${user.name}`}</Text>
          <Text style={styles.userInfo}>{`Edad: ${calculateAge(user.birthday)} años`}</Text>
          <Text style={styles.userInfo}>{`Email: ${user.email}`}</Text>
          <Text style={styles.userInfo}>{`Telefono: ${user.phone}`}</Text>
          <Text style={styles.userInfo}>{`Altura: ${user.height} cm`}</Text>

          <View style={styles.buttonContainer}>
            {[1, 2, 3].map(number => (
              <TouchableOpacity key={number} style={styles.button} onPress={() => handleButtonClick(number)}>
                <Text style={styles.buttonText}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {showTable && selectedNumber >= 1 && selectedNumber <= 10 && (
            <View style={styles.tableContainer}>
              <Text style={styles.tableHeaderText}>Fecha {selectedNumber}:</Text>
              <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Rows data={[['peso', user.weight], ['Biceps', user.details[0].biceps], ['Cintura', user.details[0].waist], ['Pecho', user.details[0].chest], ['Muslo', user.details[0].thigh], ['plan de alimentacion', user.details[0].thigh], ['plan de entrenamiento', user.details[0].thigh]]} textStyle={styles.tableText} />
              </Table>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    backgroundColor: '#0061a7',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  image: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: 0,
    height: 200,
    width: 200,
    alignSelf: 'center',
    top: '40%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetailContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#009688',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableContainer: {
    marginTop: 20,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  tableHeader: {
    backgroundColor: '#f1f8ff',
  },
  tableText: {
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default UserDetail;
