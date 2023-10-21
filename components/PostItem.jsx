import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather, FontAwesome5, FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { colors, FontFamily } from "../constants/globalThemeConstants";

export const PostItem = ({ post }) => {
  const { id, image, location, title, comments } = post;

  const { navigate } = useNavigation();

  const handleCommentsClick = () => {
    navigate("Comments");
  };

  const handleLocation = () => {
    navigate("Map", {
      locationCoords: { latitude: 49.842957, longitude: 24.031111 },
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.descriptionContainer}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.commentsBtn}
            activeOpacity={0.5}
            onPress={handleCommentsClick}
          >
            {comments ? (
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
                color: comments ? colors.textColor : colors.gray,
              }}
            >
              {comments}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.commentsBtn}>
            <Feather name="thumbs-up" size={24} color={colors.orange} />
            <Text
              style={{
                ...styles.commentsNumber,
                color: colors.textColor,
              }}
            >
              {20}
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
