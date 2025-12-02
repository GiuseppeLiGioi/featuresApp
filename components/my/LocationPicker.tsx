import { Colors } from "@/constants/theme";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { getMapPreview } from "../../util/location";
import OutlinedButton from "./OutlinedButton";

type UserLocation = {
  lat: number;
  lng: number;
};

export default function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState<UserLocation | null>(
    null
  );
  const [locationPermissionInformation, requestPermession] =
    useForegroundPermissions();
  async function verifyPermissions() {
    //piccolo check perche può essere null al primo render.
    if (!locationPermissionInformation) {
      const permissionResponse = await requestPermession();
      return permissionResponse.granted;
    }
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermession();

      return permissionResponse.granted; // true se consentito, false se negato
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permission to use this app"
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync({});
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {}
  return (
    <View>
      <View style={styles.mapPreview}>
        <Image
          source={{
            uri: getMapPreview(pickedLocation?.lat, pickedLocation?.lng),
          }}
        />
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
