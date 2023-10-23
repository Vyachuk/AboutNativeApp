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
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/Auth/authSelectors";
import { db } from "../../../../firebase/config";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { CommentItem } from "../../../../components/CommentItem";
import { useGetComments } from "../../../../hooks/useGetComments";

const CommentsScreen = () => {
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  const { user } = useSelector(selectUser);
  const route = useRoute();
  useEffect(() => {
    if (route.params) {
      setPost(route.params);
    }
  }, [route.params]);

  const handleCreateComment = async () => {
    if (comment) {
      const data = {
        comment,
        userAvatar: user.avatar,
        date: Date.now(),
        userId: user.id,
      };
      const docRef = doc(db, "posts", route.params.id);
      await addDoc(collection(docRef, "comments"), data);
      setComment("");
    }
  };

  const [allComments, setAllComments] = useGetComments(post.id);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {post.imageUrl && (
          <Image style={styles.image} source={{ uri: post.imageUrl }} />
        )}
        <View style={styles.allCommentsContainer}>
          {allComments && (
            <FlatList
              data={allComments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CommentItem data={item} />}
            />
          )}
        </View>

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
              onPress={handleCreateComment}
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
    position: "relative",
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
  allCommentsContainer: {
    overflow: "hidden",
    flex: 1,
    position: "relative",
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
