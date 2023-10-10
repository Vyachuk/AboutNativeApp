import { View, ImageBackground, StyleSheet } from "react-native";

export default function RegistrationScreen({ children }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background/back_1x.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        {children}
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
