import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import TransferScreen from "./TransferScreen";
import TransferDetailScreen from "./TransferDetailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TransferScreen" component={TransferScreen} />
        <Stack.Screen
          name="TransferDetailScreen"
          component={TransferDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
