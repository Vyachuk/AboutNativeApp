import React, { useEffect } from "react";
import { Image, View, StyleSheet, Text, FlatList } from "react-native";
import AuthLayout from "../../Auth/components/AuthLayout";
import { styles } from "../../Auth/styles";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../constants/globalThemeConstants";
import { POSTS } from "../PostsScreen/EntryPostsScreen/EntryPostsScreen";
import { PostItem } from "../../../components/PostItem";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/Auth/authSelectors";

const ProfileScreen = () => {
  const { user } = useSelector(selectUser);

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
