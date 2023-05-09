import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Menu = ({ onPressItem }) => {
  const [items, setItems] = useState([
    { id: 'perfil', title: 'Perfil' },
    { id: 'rutina', title: 'Rutina' },
    { id: 'alimentacion', title: 'Alimentación' },
    { id: 'cobro', title: 'Cobro' },
  ]);

  const renderItem = ({ item }) => (
    <TouchableHighlight
      style={styles.item}
      onPress={() => onPressItem(item.id)}
      underlayColor="#DDDDDD"
    >
      <Text>{item.title}</Text>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  menuButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
});

export default Menu;
