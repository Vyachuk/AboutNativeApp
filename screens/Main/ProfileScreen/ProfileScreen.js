import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet, Text, FlatList } from "react-native";
import AuthLayout from "../../Auth/components/AuthLayout";
import { styles } from "../../Auth/styles";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../constants/globalThemeConstants";
import { PostItem } from "../../../components/PostItem";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/Auth/authSelectors";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const { user } = useSelector(selectUser);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      onSnapshot(collection(db, "posts"), (doc) => {
        const allPosts = doc.docs
          .map((post) => ({ ...post.data(), id: post.id }))
          .filter((post) => post.userId === user.id)
          .sort((a, b) => b.date - a.date);

        setPosts(allPosts);
      });
    })();
  }, []);

  return (
    <AuthLayout>
      <View style={styles.wrap}>
        <View style={[styles.keyboardAvoidingView, css.container]}>
          <View style={styles.imageFormWrap}>
            <Image source={{ uri: user.avatar }} style={styles.imageForm} />
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
          <Text style={styles.title}>{user.name}</Text>

          <FlatList
            data={posts}
            renderItem={({ item }) => <PostItem post={item} />}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

const css = StyleSheet.create({
  container: {
    height: "80%",
    position: "relative",
    paddingBottom: 70,
  },
});

export default ProfileScreen;
