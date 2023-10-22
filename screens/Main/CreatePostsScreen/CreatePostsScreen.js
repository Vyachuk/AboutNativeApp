import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { colors, FontFamily } from "../../../constants/globalThemeConstants";
import { useNavigation } from "@react-navigation/native";
import { selectUser } from "../../../redux/Auth/authSelectors";
import { uploadImageToServer } from "../../../utils/uploadImageToServer";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";

const CreatePostsScreen = () => {
  const [photoUri, setPhotoUri] = useState(null);
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [locationCoords, setLocationCoords] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const { navigate } = useNavigation();
  const { user } = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const location = await Location.requestForegroundPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (photoUri) {
      (async () => {
        const location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocationCoords(coords);

        const [address] = await Location.reverseGeocodeAsync(coords);

        if (!address) return;

        const fullLocation = `${address.city}, ${address.region}, ${address.country}`;
        setLocation(fullLocation);
      })();
    }
  }, [photoUri]);

  const takePicture = async () => {
    if (photoUri) {
      setPhotoUri(null);
      return;
    }

    const photo = await camera.takePictureAsync();
    await MediaLibrary.createAssetAsync(photo.uri);
    setPhotoUri(photo.uri);
  };

  const handleReset = () => {
    setPhotoUri(null);
    setTitle("");
    setLocation("");
  };
  const handlePost = async () => {
    const imageUrl = await uploadImageToServer({
      imageUri: photoUri,
      folder: "postsImage",
    });
    const data = {
      imageUrl,
      title,
      location,
      locationCoords,
      userId: user.id,
      date: Date.now(),
    };
    console.log(data);
    await addDoc(collection(db, "posts"), data);

    navigate("Entry");
    handleReset();
  };

  const handleDelete = () => {
    handleReset();
    navigate("Entry");
  };

  const handleToggleCamera = () => {
    setType((prev) =>
      prev === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const isNotDisabled = photoUri && title && location;

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.image} />
        ) : (
          <Camera style={styles.camera} ref={setCamera} type={type}></Camera>
        )}

        <TouchableOpacity
          style={{
            ...styles.btnContainer,
            backgroundColor: photoUri ? colors.transparentWhite : colors.white,
          }}
          activeOpacity={0.5}
          onPress={takePicture}
        >
          {photoUri ? (
            <MaterialCommunityIcons
              name="camera-retake"
              size={24}
              color={colors.white}
            />
          ) : (
            <MaterialCommunityIcons
              name="camera"
              size={24}
              color={colors.darkGray}
            />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.5}>
        <Text style={styles.downloadText}>
          {photoUri ? "Редагувати фото" : "Завантажте фото"}
        </Text>
      </TouchableOpacity>
      <View style={styles.inputsWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Назва..."
            placeholderTextColor={colors.gray}
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View
          style={{
            ...styles.inputContainer,
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Feather name="map-pin" size={24} color={colors.gray} />
          <TextInput
            placeholder="Місцевість..."
            placeholderTextColor={colors.gray}
            style={styles.input}
            value={location}
            onChangeText={setLocation}
          />
        </View>
      </View>
      <View style={styles.bottomWrapper}>
        <TouchableOpacity
          style={{
            ...styles.postBtn,
            backgroundColor: isNotDisabled ? colors.orange : colors.ligthGray,
          }}
          activeOpacity={0.5}
          disabled={isNotDisabled ? false : true}
          onPress={handlePost}
        >
          <Text
            style={{
              ...styles.postText,
              color: isNotDisabled ? colors.white : colors.gray,
            }}
          >
            Опубліковати
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.trashBtn}
          onPress={handleDelete}
          activeOpacity={0.5}
        >
          <Feather name="trash-2" size={24} color={colors.gray} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: colors.white,
  },
  btnContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  cameraContainer: {
    position: "relative",
    height: 240,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },

  camera: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkGray,
  },
  image: {
    height: 240,
  },
  snapIcon: {
    color: colors.white,
    marginTop: 250,
  },
  input: {
    fontFamily: FontFamily.robotoMedium,
    fontSize: 16,
    color: colors.textColor,
  },
  downloadBtn: {
    marginBottom: 32,
  },
  downloadText: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: 16,
    color: colors.gray,
  },
  bottomWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  inputsWrapper: {
    gap: 16,
    marginBottom: 32,
  },
  inputContainer: {
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  postBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
  },
  postText: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: 16,
  },
  trashBtn: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.ligthGray,
  },
});
export default CreatePostsScreen;
