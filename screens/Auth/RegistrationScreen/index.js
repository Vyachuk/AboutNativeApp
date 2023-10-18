import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Text,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomButton from "../../../components/CustomButton";
import AuthLayout from "../components/AuthLayout";
import { styles } from "../styles";
import { colors } from "../../../constants/globalThemeConstants";

export default function RegistrationScreen() {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [login, setLogin] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const handleRegister = () => {
    console.log(
      "Login: " + login + ", ",
      "Email: " + mail + ", ",
      "Password: " + pass
    );
    setLogin("");
    setMail("");
    setPass("");
  };
  return (
    <AuthLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrap}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <View style={styles.imageFormWrap}>
              <Image
                source={require("../../../assets/woman.png")}
                style={styles.imageForm}
              />
              <View style={styles.iconImageWrap}>
                <AntDesign
                  name="closecircleo"
                  size={25}
                  color={colors.gray}
                  backgroundColor={colors.white}
                />
                {/* <AntDesign
                name="pluscircleo"
                color={colors.orange}
                size={25}
                backgroundColor={colors.white}
              /> */}
              </View>
            </View>
            <View style={styles.formWrap}>
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={styles.styledInput}
                placeholder="Логін"
                value={login}
                onChangeText={(text) => setLogin(text)}
              />
              <TextInput
                style={styles.styledInput}
                placeholder="Адреса електронної пошти"
                value={mail}
                onChangeText={(text) => setMail(text)}
              />
              <View>
                <TextInput
                  secureTextEntry={!isPasswordShow}
                  style={styles.styledInput}
                  placeholder="Пароль"
                  value={pass}
                  onChangeText={(text) => setPass(text)}
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
          <View style={styles.container}>
            <CustomButton click={handleRegister} text={"Зареєстуватися"} />
            <Text style={styles.informText}>
              Вже є акаунт? <Text style={styles.actionText}>Увійти</Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </AuthLayout>
  );
}
