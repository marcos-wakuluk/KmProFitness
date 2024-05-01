import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, TextInput, StyleSheet, Text, FlatList, Button, Image, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';

const AssignDietView = ({ navigation, route }) => {
  const { dietId } = route.params;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [userCheckboxes, setUserCheckboxes] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users', {
        params: {
          field: 'name,mealPlan,lastUpdate'
        }
      });
      const { data } = response.data;
      setUsers(data.users);
      initializeCheckboxes(data.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const initializeCheckboxes = (users) => {
    const checkboxes = {};
    users.forEach(user => {
      checkboxes[user._id] = user.mealPlan === dietId;
    });
    setUserCheckboxes(checkboxes);
  };

  const handleCheckboxChange = (userId) => {
    setUserCheckboxes(prevState => ({
      ...prevState,
      [userId]: !prevState[userId]
    }));
  };

  const renderUserItem = ({ item }) => {
    const fecha = new Date(item.lastUpdateMeal);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${anio}`;

    return (
      <View style={styles.userItem}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text>{fechaFormateada}</Text>
        <CheckBox
          checked={userCheckboxes[item._id]}
          onPress={() => handleCheckboxChange(item._id)}
        />
      </View>
    );
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredUsers = users.filter(user => {
    const normalizedSearchText = searchText.toLowerCase();
    const normalizedUserName = user.name.toLowerCase();
    return normalizedUserName.includes(normalizedSearchText);
  });

  const handleSaveChanges = async () => {
    try {
      const updatedUsers = filteredUsers.map(async user => {
        if (userCheckboxes[user._id]) {
          await axios.put(`http://localhost:3000/users/${user._id}`, { mealPlan: dietId });
          return { ...user, mealPlan: dietId };
        } else {
          await axios.put(`http://localhost:3000/users/${user._id}`, { mealPlan: null });
          return { ...user, mealPlan: null };
        }
      });

      await Promise.all(updatedUsers);
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar cambios:', error);
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
      <Image
        source={require('../assets/KM-white.png')}
        style={styles.image}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar usuario"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(user) => user._id.toString()}
        renderItem={renderUserItem}
      />
      <Button title="Guardar" onPress={handleSaveChanges} />
    </>
  );
};

const styles = StyleSheet.create({
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
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    marginRight: 'auto',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AssignDietView;
