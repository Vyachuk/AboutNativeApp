import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import EntryPostScreen from "./EntryPostsScreen/EntryPostsScreen";
import CommentsScreen from "./CommentsScreen/CommentsScreen";
import MapScreen from "./MapScreen/MapScreen";
import { colors } from "../../../constants/globalThemeConstants";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { signOutThunk } from "../../../redux/Auth/authOperation";

const PostsStack = createStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOutThunk())
      .unwrap()
      .catch((error) => Alert.alert("Помилка виходу з акаунту", error));
  };
  return (
    <PostsStack.Navigator
      initialRouteName="Entry"
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <PostsStack.Screen
        name="Entry"
        component={EntryPostScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              activeOpacity={0.5}
              onPress={handleSignOut}
            >
              <Feather name="log-out" size={24} color={colors.textColor} />
            </TouchableOpacity>
          ),
        }}
      />
      <PostsStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
        }}
      />
      <PostsStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Мапа",
        }}
      />
    </PostsStack.Navigator>
  );
};

export default PostsScreen;
