import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Login';
import SignIn from './src/components/SignIn';
import PasswordRecovery from './src/components/PasswordRecovery';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Login} />
        <Stack.Screen name="Signin" component={SignIn} />
        <Stack.Screen name="ForgotPassword" component={PasswordRecovery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
