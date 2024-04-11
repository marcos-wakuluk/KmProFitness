import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import AdminView from './AdminView';
import ClientView from './ClientView';
import CompletedData from '../screens/CompleteData';
import MonthlyCheckup from './monthlyCheckup';

const Home = ({ navigation }) => {
  const route = useRoute();
  const { userRole } = route.params || {};
  const [userData, setUserData] = useState(null);
  const id = '66070ee0e2566b81fb3c9e7b'
  const completedData = false // sacar de user.completedData;

  const [monthlyCheckup, setMonthlyCheckup] = useState(false);

  const currentDate = new Date();
  const lastUpdateDate = new Date();

  const monthsDiff = (currentDate.getFullYear() - lastUpdateDate.getFullYear()) * 12 + (currentDate.getMonth() - lastUpdateDate.getMonth());

  // Verifica si han pasado un mes o más
  // if (monthsDiff >= 1) {
  //   setMonthlyCheckup(true);
  // } else {
  //   setMonthlyCheckup(false);
  // }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://localhost:3000/users/${id}`);
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <View style={styles.container}>
      {userRole === 'admin' && <AdminView navigation={navigation} />}
      {userRole === 'client' && completedData ? <CompletedData /> : monthlyCheckup ? <MonthlyCheckup /> : <ClientView navigation={navigation} />}
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
