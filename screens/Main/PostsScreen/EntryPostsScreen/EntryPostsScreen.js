import React from "react";
import { Text, View, StyleSheet } from "react-native";

const EntryPostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Post Screen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default EntryPostsScreen;
