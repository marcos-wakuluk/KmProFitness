import React, { useState } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Profile = ({ user }) => {
  const navigation = useNavigation();

  const [biceps, setBiceps] = useState(user.details[0].biceps || 0);
  const [waist, setWaist] = useState(user.details[0].waist || 0);
  const [thigh, setThigh] = useState(user.details[0].thigh || 0);
  const [chest, setChest] = useState(user.details[0].chest || 0);
  const [weight, setWeight] = useState(user.details[0].weight || 0);

  const handleSave = async () => {
    try {
      const updateUser = {
        biceps: parseInt(biceps),
        waist: parseInt(waist),
        thigh: parseInt(thigh),
        chest: parseInt(chest),
        weight: parseInt(weight),
      };

      const response = await axios.put(`http://localhost:3000/usersDetails/${user._id}`, updateUser);

      Alert.alert('Datos guardados exitosamente', '', [
        { text: 'OK', onPress: () => navigation.navigate('Home', { user: response.data.data.user }) }
      ]);
    } catch (error) {
      console.error('Error al guardar los datos del usuario:', error);
      alert('Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}></View>
      <Image
        source={require('../assets/KM-white.png')}
        style={styles.image}
      />
      <TextInput
        label="Circunferencia de biceps (cm)"
        value={biceps?.toString()}
        onChangeText={setBiceps}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Circunferencia de cintura (cm)"
        value={waist?.toString()}
        onChangeText={setWaist}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Circunferencia de muslo (cm)"
        value={thigh?.toString()}
        onChangeText={setThigh}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Circunferencia de pecho (cm)"
        value={chest?.toString()}
        onChangeText={setChest}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Peso (Kg)"
        value={weight?.toString()}
        onChangeText={setWeight}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        onPress={handleSave}
        style={styles.button}
      >
        Guardar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    backgroundColor: '#069af1',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
    backgroundColor: '#52c0ff',
    color: '#144a94'
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
});

export default Profile;