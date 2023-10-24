import { signInThunk, signUpThunk } from "../../redux/Auth/authOperation";
import { useDispatch } from "react-redux";
import { uploadImageToServer } from "../../utils/uploadImageToServer.js";

export default function useAuthLogicHook({ creds, profile, screen }) {
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!(creds.email && creds.password)) return;
    if (screen === "LoginScreen") dispatch(signInThunk(creds));
    if (screen === "RegistrationScreen" && profile?.name) {
      const imageUrl = await uploadImageToServer({
        imageUri: profile.photo,
        folder: "avatars",
      });
      dispatch(
        signUpThunk({
          name: profile.name,
          photo: imageUrl,
          ...creds,
        })
      );
    }
  };

  return { handleSubmit };
}
