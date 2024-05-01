import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users', {
        params: {
          field: 'name'
        }
      });
      const { data } = response.data;
      const users = data.users
      setUsers(users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
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

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const renderUserItem = ({ item }) => {
    const handleUserPress = () => {
      navigation.navigate('UserDetail', { userId: item._id });
    };

    return (
      <TouchableOpacity onPress={handleUserPress}>
        <View style={styles.userItem}>
          <Text style={styles.userName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredUsers = users.filter(user => {
    const normalizedSearchText = searchText.toLowerCase();
    const normalizedUserName = user.name.toLowerCase();

    return normalizedUserName.includes(normalizedSearchText);
  });

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
        contentContainerStyle={styles.userList}
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userItem: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 8,
  },
  userList: {
    paddingBottom: 20, // Agrega espacio en la parte inferior de la lista
  },
});

export default UserList;
