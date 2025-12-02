import IconButton from "@/components/my/IconButton";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
export default function Map() {
  const router = useRouter();
  const navigation = useNavigation();
  type Location = {
    lat: number;
    lng: number;
  };

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event: MapPressEvent) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  }

  function savePickedLocationHandler() {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "You have to pick a location (by tapping on the map) frist!"
      );
      return;
    }

    router.push(
      `/addPlace?pickedLat=${selectedLocation.lat}&pickedLng=${selectedLocation.lng}`
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="save"
          color="pink"
          size={24}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, []);
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
