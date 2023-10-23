import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather, FontAwesome5, FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { colors, FontFamily } from "../constants/globalThemeConstants";
import { useGetComments } from "../hooks/useGetComments";
import { useGetLikes } from "../hooks/useGetLikes";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/Auth/authSelectors";

export const PostItem = ({ post }) => {
  const { id, imageUrl, location, title, comments, locationCoords } = post;
  const { navigate } = useNavigation();
  const { user } = useSelector(selectUser);

  const [allComments] = useGetComments(id);
  const commentCount = allComments.length;
  const [allLikes] = useGetLikes(id);
  const likesNumber = allLikes.length;

  const userLike = allLikes.find((like) => like.userId === user.id);

  const handleCommentsClick = () => {
    navigate("Comments", { id, imageUrl });
  };

  const handleLocation = () => {
    navigate("Map", {
      locationCoords,
    });
  };

  const toggleLike = async () => {
    if (userLike) {
      const docRef = doc(db, "posts", id, "likes", userLike.id);
      await deleteDoc(docRef);
    } else {
      const docRef = doc(db, "posts", id);
      await addDoc(collection(docRef, "likes"), {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.descriptionContainer}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.commentsBtn}
            activeOpacity={0.5}
            onPress={handleCommentsClick}
          >
            {commentCount > 0 ? (
              <FontAwesome
                name="comment"
                size={24}
                color={colors.orange}
                style={{
                  transform: [{ scaleX: -1 }],
                }}
              />
            ) : (
              <FontAwesome5
                name="comment"
                size={24}
                color={colors.gray}
                style={{
                  transform: [{ scaleX: -1 }],
                }}
              />
            )}
            <Text
              style={{
                ...styles.commentsNumber,
                color: commentCount ? colors.textColor : colors.gray,
              }}
            >
              {commentCount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.commentsBtn}
            onPress={toggleLike}
          >
            <Feather name="thumbs-up" size={24} color={colors.orange} />
            <Text
              style={{
                ...styles.commentsNumber,
                color: colors.textColor,
              }}
            >
              {likesNumber}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.locationBtn}
          activeOpacity={0.5}
          onPress={handleLocation}
        >
          <Feather name="map-pin" size={24} color={colors.gray} />
          <Text style={styles.locationTitle}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 32,
  },
  image: {
    height: 240,
    borderRadius: 8,
    objectFit: "cover",
    width: "100%",
  },
  title: {
    fontFamily: FontFamily.robotoMedium,
    fontSize: 16,
    color: colors.textColor,
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  btnContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
  },
  commentsBtn: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  commentsNumber: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: 16,
  },
  locationBtn: {
    maxWidth: 230,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationTitle: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: 16,
    color: colors.textColor,
    textDecorationLine: "underline",
  },
});
