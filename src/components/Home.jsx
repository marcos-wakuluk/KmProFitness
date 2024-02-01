import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import AdminView from './AdminView';
import ClientView from './ClientView';
import CompletedData from '../screens/CompleteData';

const Home = ({ navigation }) => {
  const route = useRoute();
  const { userRole } = route.params || {};
  const completedData = false // sacar de user.completedData;

  return (
    <View style={styles.container}>
      {userRole === 'admin' && <AdminView navigation={navigation} />}
      {userRole === 'client' && completedData ? <ClientView navigation={navigation} /> : <CompletedData />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Home;
