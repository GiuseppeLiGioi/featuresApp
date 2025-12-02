import { FlatList, StyleSheet, Text, View } from "react-native";

import PlaceItem from "./PlaceItem";

export default function PlaceList({ places }) {
  if (!places || places.length < 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>
          Ancora non non è presente nessuna card. Creane una!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
}

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  fallBackText: {
    fontSize: 12,
    textAlign: "center",
  },
});
