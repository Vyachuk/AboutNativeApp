import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { StatusBar, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors, FontFamily } from "../../../constants/globalThemeConstants";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
const Tab = createBottomTabNavigator();

const index = () => {
  const [isProfileActive, setIsProfileActive] = useState(false);

  const navigation = useNavigation();
  const ProfileScreenWrapper = () => {
    useFocusEffect(
      useCallback(() => {
        setIsProfileActive(true);
        return () => {
          setIsProfileActive(false);
        };
      }, [])
    );

    return <ProfileScreen />;
  };
  return (
    <Tab.Navigator
      id="home"
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          minHeight: 70,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: FontFamily.robotoMedium,
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: -0.408,
          color: colors.textColor,
        },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarStyle: {
            display: "flex",
          },
          headerShown: false,
          tabBarIcon: () => (
            <AntDesign name="appstore-o" size={24} color={colors.textColor} />
          ),
        }}
      />
      {isProfileActive ? (
        <>
          <Tab.Screen
            name="Profile"
            component={ProfileScreenWrapper}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Feather name="user" size={24} color={colors.white} />
              ),
              tabBarItemStyle: {
                alignSelf: "center",
                height: 40,
                maxWidth: 70,
                borderRadius: 20,
                backgroundColor: colors.orange,
              },
            }}
          />
          <Tab.Screen
            name="Create"
            component={CreatePostsScreen}
            options={{
              tabBarStyle: { display: "none" },
              title: "Створити публікацію",
              tabBarIcon: () => (
                <Fontisto name="plus-a" size={18} color={colors.textColor} />
              ),
              headerLeft: () => (
                <TouchableOpacity
                  style={{ marginLeft: 16 }}
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Feather
                    name="arrow-left"
                    size={24}
                    color={colors.textColor}
                  />
                </TouchableOpacity>
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Create"
            component={CreatePostsScreen}
            options={{
              tabBarStyle: { display: "none" },
              title: "Створити публікацію",
              tabBarIcon: () => (
                <Fontisto name="plus-a" size={18} color={colors.white} />
              ),
              tabBarItemStyle: {
                alignSelf: "center",
                height: 40,
                maxWidth: 70,
                borderRadius: 20,
                backgroundColor: colors.orange,
              },
              headerLeft: () => (
                <TouchableOpacity
                  style={{ marginLeft: 16 }}
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Feather
                    name="arrow-left"
                    size={24}
                    color={colors.textColor}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreenWrapper}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Feather name="user" size={24} color={colors.textColor} />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default index;
