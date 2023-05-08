import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Login';
import SignIn from './src/components/SignIn';
import PasswordRecovery from './src/components/PasswordRecovery';
import Home from './src/components/Home';
import TopMenu from './src/components/TopMenu';
import Profile from './src/components/Profile';
// import Workout from './src/components/Workout';
// import FoodPlan from './src/components/FoodPlan';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Home"
        // screenOptions={{
        //   headerRight: () => <TopMenu />,
        // }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signin" component={SignIn} />
        <Stack.Screen name="ForgotPassword" component={PasswordRecovery} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        {/* <Stack.Screen name="Workout" component={Workout} /> */}
        {/* <Stack.Screen name="FoodPlan" component={FoodPlan} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
