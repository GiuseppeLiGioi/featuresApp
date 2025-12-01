import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "HomePage" }} />
      <Stack.Screen name="addPlace" options={{ title: "Aggiungi" }} />
      <Stack.Screen name="map" options={{ title: "Vedi" }} />
      <Stack.Screen name="placeDetails" options={{ title: "Dettagli" }} />
    </Stack>
  );
}
