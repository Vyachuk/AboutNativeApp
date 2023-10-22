import { signInThunk, signUpThunk } from "../../redux/Auth/authOperation";
import { useDispatch } from "react-redux";

export default function useAuthLogicHook({ creds, profile, screen }) {
  const dispatch = useDispatch();

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
