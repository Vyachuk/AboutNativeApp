import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "../navigation/RootNavigation";
import Home from "./Main/Home";
import { useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { Text } from "react-native";

export default function Entrypoint() {
  const [isAuth] = useState(true);
  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
        <NavigationContainer>
          {isAuth ? <Home /> : <RootNavigation />}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
