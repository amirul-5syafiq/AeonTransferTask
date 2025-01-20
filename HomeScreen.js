import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Viewers</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TransferScreen")}
      >
        <Text style={styles.buttonText}>View Transfers</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
