import { Colors } from "@/constants/theme";
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "./OutlinedButton";

type ImagePickerProps = {
  onPickImage: (uri: string) => void;
};
export default function ImagePicker({ onPickImage }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission(): Promise<boolean> {
    //piccolo check perche può essere null al primo render.
    if (!cameraPermissionInformation) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted; // true se consentito, false se negato
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permission to use this app"
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.canceled) {
      setPickedImage(image.assets[0].uri);
      onPickImage(image.assets[0].uri);
    }
  }
  let imagePreview = <Text>No image picked yet!</Text>;
  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
