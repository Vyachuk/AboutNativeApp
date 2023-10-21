import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase/config";

import { useEffect } from "react";
import { Alert } from "react-native";
import { signInThunk, signUpThunk } from "../../redux/Auth/authOperation";
import { selectUser } from "../../redux/Auth/authSelectors";
import { useDispatch, useSelector } from "react-redux";

export default function useAuthLogicHook({ creds, profile, screen }) {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const authState = useSelector(selectUser);

  useEffect(() => {
    console.log(authState.user);
    if (authState.user) navigate("Home", { screen: "Posts" });

    if (authState.error)
      Alert.alert("Error", JSON.parse(JSON.stringify(authState.error)));
  }, [authState]);

  const handleSubmit = () => {
    if (!(creds.email && creds.password)) return;
    if (screen === "LoginScreen") dispatch(signInThunk(creds));
    if (screen === "RegistrationScreen" && profile?.name) {
      dispatch(
        signUpThunk({
          name: profile.name,
          photo: profile.photo,
          ...creds,
        })
      );
    }
  };

  return { handleSubmit };
}
