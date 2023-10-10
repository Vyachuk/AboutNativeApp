import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SharedLayout from "./components/SharedLayout";
import RegistrationScreen from "./components/RegistrationScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <SharedLayout>
        <RegistrationScreen />
      </SharedLayout>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
