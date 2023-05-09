import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const Profile = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSave = async (imageUri, name, age, height, weight) => {
    try {
      // Crea un objeto FormData con los datos del usuario
      const formData = new FormData();
      formData.append('image', { uri: imageUri, name: 'profile.jpg', type: 'image/jpeg' });
      formData.append('name', name);
      formData.append('age', age);
      formData.append('height', height);
      formData.append('weight', weight);

      // Envía los datos del usuario a la API
      const response = await fetch('https://miapi.com/usuarios', {
        method: 'POST',
        body: formData,
      });

      // Comprueba si la respuesta de la API es exitosa
      if (response.ok) {
        console.log('Datos del usuario guardados en la API');
      } else {
        console.error('Error al guardar los datos del usuario en la API:', response.status);
      }
    } catch (error) {
      console.error('Error al guardar los datos del usuario:', error);
    }
  };

  const handleImagePick = () => {
    // Handle profile image pick
  };

  return (
    <View style={styles.container}>
      <Image
        source={profileImage || require('../../assets/user-default.png')}
        style={styles.profileImage}
      />
      <Button onPress={handleImagePick}>Pick Profile Image</Button>
      <TextInput
        label="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        label="Telefono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        label="Edad"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        label="Altura"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        label="Peso"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <Button onPress={handleSave}>Save</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    alignSelf: 'center',
  },
});

export default Profile;
