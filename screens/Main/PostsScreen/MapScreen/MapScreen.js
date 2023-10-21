import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      setLocation(route.params.locationCoords);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          ...location,
          latitudeDelta: 0.003,
          longitudeDelta: 0.005,
        }}
      >
        <Marker title="Location" coordinate={location} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
export default MapScreen;
