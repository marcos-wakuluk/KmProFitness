import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

const UserDetail = ({ route }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const calculateAge = (birthday) => {
    const currentDate = new Date();
    const birthDate = new Date(birthday);
    let ageDiff = currentDate - birthDate;
    const age = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365));

    return age;
  };

  return (
    <>
      <View style={styles.background}></View>
      <Image
        source={require('../assets/KM-white.png')}
        style={styles.image}
      />
      {user && (
        <View style={styles.userDetailContainer}>
          <Text style={styles.userInfo}>{`Nombre: ${user.name}`}</Text>
          <Text style={styles.userInfo}>{`Edad: ${calculateAge(user.birthday)}`}</Text>
          <Text style={styles.userInfo}>{`Email: ${user.email}`}</Text>
          <Text style={styles.userInfo}>{`Telefono: ${user.phone}`}</Text>
          <Text style={styles.userInfo}>{`Peso: ${user.height}`}</Text>
          <Text style={styles.userInfo}>{`Altura: ${user.weight}`}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    backgroundColor: '#069af1',
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
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userInfo: {}
});

export default UserDetail;
