import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Text,
  Image,
} from "react-native";
import CustomButton from "./CustomButton";

export default function RegistrationScreen() {
  return (
    <View style={styles.wrap}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.formWrap}>
          <View style={styles.imageFormWrap}>
            <Image
              source={require("../assets/woman.png")}
              style={styles.imageForm}
            />
          </View>
          <Text style={styles.title}>Реєстрація</Text>
          <TextInput style={styles.styledInput} placeholder="Логін" />
          <TextInput
            style={styles.styledInput}
            placeholder="Адреса електронної пошти"
          />
          <TextInput style={styles.styledInput} placeholder="Пароль" />
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
  imageFormWrap: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: -60 }, { translateY: -60 }],
  },
  imageForm: {
    width: 120,
    height: 120,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 500,
    letterSpacing: 0.3,
    marginBottom: 33,
    paddingTop: 92,
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

  submitButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: "100%",
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 80,

    backgroundColor: "white",
    alignItems: "center",
    rowGap: 16,
  },
  formWrap: {
    marginBottom: 43,
    rowGap: 16,
  },
  styledInput: {
    height: 50,
    padding: 16,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
  },
});
