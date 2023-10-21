import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { colors, FontFamily } from "../../../../constants/globalThemeConstants";
import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [comment, setComment] = useState("");
  const route = useRoute();
  useEffect(() => {
    if (route.params) {
      setPhotoUrl(route.params.image);
    }
  }, [route.params]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {photoUrl && <Image style={styles.image} source={photoUrl} />}
        {/* <FlatList
          data={comment}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CommentItem data={item} />}
        /> */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Коментувати..."
              placeholderTextColor={colors.gray}
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity
              style={styles.sendBtn}
              // onPress={handleSendComment}
            >
              <AntDesign name="arrowup" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
  image: {
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
    width: "100%",
  },
  inputContainer: {
    height: 50,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    backgroundColor: colors.ligthGray,
    borderRadius: 100,
  },
  input: {
    width: "85%",
    fontFamily: FontFamily.robotoMedium,
    fontSize: 16,
    color: colors.textColor,
    paddingLeft: 8,
  },
  sendBtn: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orange,
    borderRadius: 50,
  },
});

export default CommentsScreen;
