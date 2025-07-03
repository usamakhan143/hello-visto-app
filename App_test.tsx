import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet } from "react-native";
import SplashScreen from "./src/screens/shared/SplashScreen";

const Stack = createStackNavigator();

// Simple test screen
function TestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Visto - Navigation Test</Text>
    </View>
  );
}

// Simple Onboarding screen
function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Onboarding Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7C3AED",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
