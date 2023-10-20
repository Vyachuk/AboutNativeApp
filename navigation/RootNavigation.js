import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegistrationScreen from "../screens/Auth/RegistrationScreen";

const Stack = createStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
