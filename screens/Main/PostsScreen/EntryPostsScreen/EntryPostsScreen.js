import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { PostItem } from "../../../../components/PostItem";
import { FontFamily } from "../../../../constants/globalThemeConstants";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/Auth/authSelectors";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase/config";

const EntryPostsScreen = () => {
  const { user } = useSelector(selectUser);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      onSnapshot(collection(db, "posts"), (doc) => {
        const allPosts = doc.docs
          .map((post) => ({ ...post.data(), id: post.id }))
          .sort((a, b) => b.date - a.date);
        setPosts(allPosts);
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.ownerContainer}>
        <Image source={{ uri: user.avatar }} style={styles.image} />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{user.name}</Text>
          <Text style={styles.mail}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={posts}
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
