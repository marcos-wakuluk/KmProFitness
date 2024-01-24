import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import AdminView from './AdminView';
import ClientView from './ClientView';

const Home = ({ navigation }) => {
  const route = useRoute();
  const { userRole } = route.params || {};

  return (
    <View style={styles.container}>
      {userRole === 'admin' && <AdminView navigation={navigation} />}
      {userRole === 'client' && <ClientView navigation={navigation} />}
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
