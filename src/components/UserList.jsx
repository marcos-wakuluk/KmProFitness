import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
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
          fields: 'email,name'
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
          <Text>{item.name}</Text>
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
      />
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default UserList;
