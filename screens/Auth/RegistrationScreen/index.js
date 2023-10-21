import { useState, useEffect } from "react";
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
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../../components/CustomButton";
import AuthLayout from "../components/AuthLayout";
import { styles } from "../styles";
import { colors } from "../../../constants/globalThemeConstants";
import { useNavigation } from "@react-navigation/native";
import useAuthLogicHook from "../useAuthHook";
import usePickImage from "../../../hooks/usePickImage";

export default function RegistrationScreen() {
  const { navigate } = useNavigation();

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const { image, pickGalleryImage } = usePickImage();

  const [profile, setProfile] = useState({ name: "", photo: "" });
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const { handleSubmit } = useAuthLogicHook({
    creds,
    profile,
    screen: "RegistrationScreen",
  });

  useEffect(() => {
    image && setProfile({ ...profile, avatar: image });
  }, [image]);
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
              <TouchableOpacity
                style={styles.iconImageWrap}
                onPress={pickGalleryImage}
              >
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
              </TouchableOpacity>
            </View>
            <View style={styles.formWrap}>
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={styles.styledInput}
                placeholder="Логін"
                value={profile.name}
                onChangeText={(name) => setProfile({ ...profile, name })}
              />
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
          <View style={styles.container}>
            <CustomButton click={handleSubmit} text={"Зареєстуватися"} />
            <Text style={styles.informText}>
              Вже є акаунт?{" "}
              <Text
                style={styles.actionText}
                onPress={() => navigate("LoginScreen")}
                activeOpacity={0.5}
              >
                Увійти
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </AuthLayout>
  );
}
