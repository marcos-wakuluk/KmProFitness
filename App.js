import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Login';
import SignIn from './src/components/SignIn';
import PasswordRecovery from './src/components/PasswordRecovery';
import Home from './src/components/Home';
import Profile from './src/components/Profile';
import DietPlanScreen from './src/components/DietPlanScreen';
import Workout from './src/components/Workout';
import Payment from './src/components/Payment';
import UserList from './src/components/UserList';
import DietPlanList from './src/components/DietPlanList';
import WorkoutList from './src/components/WorkoutList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signin" component={SignIn} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Workout" component={Workout} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="UserList" component={UserList} />
        <Stack.Screen name="DietPlanList" component={DietPlanList} />
        <Stack.Screen name="WorkoutList" component={WorkoutList} />
        <Stack.Screen name="DietPlanScreen" component={DietPlanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
