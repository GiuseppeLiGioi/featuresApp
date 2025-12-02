import { Colors } from "@/constants/theme";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
export default function PlaceItem({ place, onSelect }) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  fallBackText: {
    fontSize: 16,
    color: Colors.primary200,
    textAlign: "center",
  },
});
