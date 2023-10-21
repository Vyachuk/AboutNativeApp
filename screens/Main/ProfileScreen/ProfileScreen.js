import React, { useEffect } from "react";
import { Image, View, StyleSheet, Text, FlatList } from "react-native";
import AuthLayout from "../../Auth/components/AuthLayout";
import { styles } from "../../Auth/styles";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../constants/globalThemeConstants";
import { POSTS } from "../PostsScreen/EntryPostsScreen/EntryPostsScreen";
import { PostItem } from "../../../components/PostItem";

const ProfileScreen = () => {
  useEffect(() => {
    console.log("hello");
  }, []);
  return (
    <AuthLayout>
      <View style={styles.wrap}>
        <View style={[styles.keyboardAvoidingView, css.container]}>
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
          <Text style={styles.title}>Natali Romanova</Text>

          <FlatList
            data={POSTS}
            renderItem={({ item }) => <PostItem post={item} />}
            keyExtractor={(item) => item.id}
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
  },
});

export default ProfileScreen;
