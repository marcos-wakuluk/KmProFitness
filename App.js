import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Login';
import SignIn from './src/components/SignIn';
import PasswordRecovery from './src/components/PasswordRecovery';
import Home from './src/components/Home';
import Profile from './src/components/Profile';
import DietPlanScreen from './src/screens/DietPlanScreen';
import Workout from './src/screens/Workout';
import Payment from './src/components/Payment';
import UserList from './src/components/UserList';
import DietPlanList from './src/components/DietPlanList';
import WorkoutList from './src/components/WorkoutList';
import UserDetail from './src/components/UserDetail';
import AssignDietView from './src/components/AssignDietView';
import AssignWorkoutView from './src/components/AssignWorkoutView';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerTitle: '', headerBackTitle: '', headerLeft: null }} name="Login" component={Login} />
          <Stack.Screen options={{ headerTitle: '', headerBackTitle: '', headerLeft: null }} name="Signin" component={SignIn} />
          <Stack.Screen options={{ headerTitle: '', headerBackTitle: '', headerLeft: null }} name="PasswordRecovery" component={PasswordRecovery} />
          <Stack.Screen options={{ headerTitle: '', headerBackTitle: '', headerLeft: null }} name="Home" component={Home} />
          <Stack.Screen options={{ headerTitle: '', headerBackTitle: '', headerLeft: null }} name="Profile" component={Profile} />
          <Stack.Screen options={{ headerTitle: '', headerBackTitle: '', headerLeft: null }} name="Workout" component={Workout} />
          <Stack.Screen options={{ headerTitle: '', headerBackTitle: '', headerLeft: null }} name="Payment" component={Payment} />
          <Stack.Screen options={{ headerTitle: '', headerBackTitle: '', headerLeft: null }} name="UserList" component={UserList} />
          <Stack.Screen options={{ headerTitle: '', headerBackTitle: '', headerLeft: null }} name="UserDetail" component={UserDetail} />
          <Stack.Screen options={{ headerTitle: '', headerBackTitle: '', headerLeft: null }} name="DietPlanList" component={DietPlanList} />
          <Stack.Screen options={{ headerTitle: '', headerBackTitle: '', headerLeft: null }} name="AssignDietView" component={AssignDietView} />
          <Stack.Screen options={{ headerTitle: '', headerBackTitle: '', headerLeft: null }} name="AssignWorkoutView" component={AssignWorkoutView} />
          <Stack.Screen options={{ headerTitle: '', headerBackTitle: '', headerLeft: null }} name="WorkoutList" component={WorkoutList} />
          <Stack.Screen options={{ headerTitle: '', headerBackTitle: '', headerLeft: null }} name="DietPlanScreen" component={DietPlanScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ SafeAreaView>
  );
}
