import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "../navigation/RootNavigation";
import Home from "./Main/Home";
import { useState } from "react";

export default function Entrypoint() {
  const [isAuth] = useState(true);
  return (
    <NavigationContainer>
      {isAuth ? <Home /> : <RootNavigation />}
    </NavigationContainer>
  );
}
