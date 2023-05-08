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

  const handleSave = () => {
    // Save profile data
  };

  const handleImagePick = () => {
    // Handle profile image pick
  };

  return (
    <View style={styles.container}>
      <Image
        source={profileImage || ''}
        style={styles.profileImage}
      />
      <Button onPress={handleImagePick}>Pick Profile Image</Button>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        label="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        label="Height"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        label="Weight"
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
  },
});

export default Profile;
