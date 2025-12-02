import IconButton from "@/components/my/IconButton";
import { Stack, useRouter } from "expo-router";
export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "HomePage",
          headerRight: () => (
            <IconButton
              icon="add"
              color="pink"
              size={24}
              onPress={() => router.navigate("/addPlace")}
            />
          ),
        }}
      />
      <Stack.Screen name="addPlace" options={{ title: "Aggiungi" }} />
      <Stack.Screen name="map" options={{ title: "Vedi" }} />
      <Stack.Screen name="placeDetails" options={{ title: "Dettagli" }} />
    </Stack>
  );
}
