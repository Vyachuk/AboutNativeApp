import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "../navigation/RootNavigation";
import Home from "./Main/Home";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { refreshUser } from "../redux/Auth/authSlice";
import { selectStateChanged } from "../redux/Auth/authSelectors";
import { auth } from "../firebase/config";

export default function Entrypoint() {
  const [isAuth, setIsAuth] = useState(false);
  const stateChanged = useSelector(selectStateChanged);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const data = {
          user: {
            name: user.displayName,
            email: user.email,
            id: user.uid,
            avatar: user.photoURL,
          },
          stateChanged: true,
        };

        dispatch(refreshUser(data));
        setIsAuth(true);
      } else {
        return;
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {isAuth ? <Home /> : <RootNavigation />}
    </NavigationContainer>
  );
}
