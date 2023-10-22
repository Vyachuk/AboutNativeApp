import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Text,
  Image,
  Pressable,
} from "react-native";
import CustomButton from "../../../components/CustomButton";
import AuthLayout from "../components/AuthLayout";
import { styles } from "../styles";
import useAuthLogicHook from "../useAuthHook";

export default function LoginScreen() {
  const { navigate } = useNavigation();
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });
  const { handleSubmit } = useAuthLogicHook({
    creds,
    screen: "LoginScreen",
  });

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  return (
    <AuthLayout>
      <View style={styles.wrap}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.formWrap}>
            <Text style={styles.title}>Увійти</Text>
            <TextInput
              style={styles.styledInput}
              placeholder="Адреса електронної пошти"
              value={creds.email}
              onChangeText={(email) => setCreds({ ...creds, email })}
            />
            <View>
              <TextInput
                secureTextEntry={!isPasswordShow}
                style={styles.styledInput}
                placeholder="Пароль"
                value={creds.password}
                onChangeText={(password) => setCreds({ ...creds, password })}
              />
              <Pressable
                style={styles.showBtn}
                onPress={() => setIsPasswordShow(!isPasswordShow)}
              >
                <Text style={styles.showBtnTitle}>
                  {isPasswordShow ? "Сховати" : "Показати"}
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={{ ...styles.container, paddingBottom: 144 }}>
          <CustomButton text={"Увійти"} click={handleSubmit} />
          <Text style={styles.informText}>
            Немає аккаунту?{" "}
            <Text
              style={styles.actionText}
              onPress={() => navigate("RegistrationScreen")}
              activeOpacity={0.5}
            >
              Зареєструватися
            </Text>
          </Text>
        </View>
      </View>
    </AuthLayout>
  );
}
