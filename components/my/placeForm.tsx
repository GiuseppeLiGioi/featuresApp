import { Colors } from "@/constants/theme";
import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

type UserLocation = {
  lat: number;
  lng: number;
};
type PlaceFormProps = {
  initialLocation?: UserLocation | null;
};

export default function PlaceForm({ initialLocation }: PlaceFormProps) {
  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [pickedLocation, setPickedLocation] = useState<UserLocation | null>();
  function changeTitleHandler(enteredText: string) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri: string) {
    setSelectedImage(imageUri);
  }
  function pickLocationHandler(location: UserLocation | null) {
    setPickedLocation(location);
  }

  function savePlaceHandler() {
    console.log(pickedLocation);
    console.log(enteredTitle);
    console.log(selectedImage);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.labelText}>Title</Text>
        <TextInput
          placeholder="Inserisci il titolo..."
          value={enteredTitle}
          onChangeText={changeTitleHandler}
          style={styles.input}
        />
      </View>
      <ImagePicker onPickImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button title="Add Place" onPress={savePlaceHandler} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  labelText: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
