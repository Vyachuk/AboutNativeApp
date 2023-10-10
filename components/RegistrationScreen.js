import { View, StyleSheet } from "react-native";

export default function RegistrationScreen() {
  return <View style={styles.container}></View>;
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 550,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: "flex-end",
    position: "absolute",
    bottom: 0,
  },
});
