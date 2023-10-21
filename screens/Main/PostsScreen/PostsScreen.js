import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import EntryPostScreen from "./EntryPostsScreen/EntryPostsScreen";
import CommentsScreen from "./CommentsScreen/CommentsScreen";
import MapScreen from "./MapScreen/MapScreen";
import { colors } from "../../../constants/globalThemeConstants";
import { Feather } from "@expo/vector-icons";

const PostsStack = createStackNavigator();

const PostsScreen = () => {
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
              // onPress={handleSignOut}
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
