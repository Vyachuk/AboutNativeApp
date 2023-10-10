import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Text,
} from "react-native";
import CustomButton from "./CustomButton";

export default function RegistrationScreen() {
  return (
    <View style={styles.wrap}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.inputWrap}>
          <TextInput style={styles.input} placeholder="Введіть текст" />
          <TextInput style={styles.input} placeholder="Введіть текст" />
          <TextInput style={styles.input} placeholder="Введіть текст" />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.container}>
        <CustomButton />
        <Text>Вже є акаунт? Увійти</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "flex-end",
  },
  keyboardAvoidingView: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 16,
  },
  inputWrap: {
    paddingTop: 150,
    paddingBottom: 50,
  },
  submitButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: "100%",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 80,

    backgroundColor: "white",
    alignItems: "center",
    rowGap: 16,
  },
  input: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    backgroundColor: "violet",
  },
});
