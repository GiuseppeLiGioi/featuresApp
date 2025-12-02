import { Button, Text, View } from "react-native";

export default function ImagePicker() {
  function takeImageHandler() {}
  return (
    <View>
      <Text>sono picker</Text>

      <View>
        <Button title="Take Image" onPress={takeImageHandler} />
      </View>
    </View>
  );
}
