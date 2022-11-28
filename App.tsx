import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// Screens
import Home from "./src/screens/Home";
import NewParking from "./src/screens/NewParking";
import PaymentDetail from "./src/screens/PaymentDetail";
import SuccessScreen from "./src/screens/Success";
import ExitParking from "./src/screens/ExitParking";
import WarningScreen from "./src/screens/Warning";

// Redux store
import { Provider } from "react-redux";
import { store } from "./src/store";

type RootStackParamList = {
  Home: undefined;
  NewParking: undefined;
  PaymentDetail: undefined;
  Success: undefined;
  ExitParking: undefined;
  Warning: undefined;
};

// To avoid the logs floating over app window
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Provider store={store}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewParking"
              component={NewParking}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentDetail"
              component={PaymentDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Success"
              component={SuccessScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExitParking"
              component={ExitParking}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Warning"
              component={WarningScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </Provider>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
