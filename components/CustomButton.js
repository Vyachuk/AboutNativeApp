import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../constants/globalThemeConstants";

const CustomButton = ({ text, click }) => {
  return (
    <TouchableOpacity onPress={click} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 16,
    backgroundColor: colors.orange,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
