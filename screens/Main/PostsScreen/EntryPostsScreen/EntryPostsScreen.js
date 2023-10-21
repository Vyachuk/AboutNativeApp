import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PostItem } from "../../../../components/PostItem";
import { FontFamily } from "../../../../constants/globalThemeConstants";
export const POSTS = [
  {
    image: require("../../../../assets/mock/forest.webp"),
    title: "Forest",
    location: "Lviv",
    comments: "2",
    id: 0,
  },
  {
    image: require("../../../../assets/mock/apache.jpeg"),
    title: "Terapak",
    location: "Kyiv",
    comments: "44",
    id: 1,
  },
  {
    image: require("../../../../assets/mock/tundra.jpeg"),
    title: "Tundra",
    location: "Sahara",
    comments: "22",
    id: 2,
  },
];

const EntryPostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.ownerContainer}>
        <Image
          source={require("../../../../assets/woman.png")}
          style={styles.image}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Natali Romanova</Text>
          <Text style={styles.mail}>email@example.com</Text>
        </View>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={POSTS}
          renderItem={({ item }) => <PostItem post={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  ownerContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 32,
  },
  listWrapper: {
    marginBottom: 48,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  textWrapper: {
    justifyContent: "center",
    height: 60,
  },
  title: {
    fontFamily: FontFamily.robotoBold,
    fontSize: 13,
  },
  mail: {
    fontSize: 11,
  },
});

export default EntryPostsScreen;
