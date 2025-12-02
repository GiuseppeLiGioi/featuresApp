import { useSearchParams } from "expo-router/build/hooks";
import PlaceForm from "../components/my/PlaceForm";
type UserLocation = {
  lat: number;
  lng: number;
};
type Params = {
  pickedLat?: string;
  pickedLng?: string;
};
export default function addPlace() {
  const params = useSearchParams() as Params;
  const initialLocation: UserLocation | null =
    params.pickedLat && params.pickedLng
      ? { lat: parseFloat(params.pickedLat), lng: parseFloat(params.pickedLng) }
      : null;

  return <PlaceForm initialLocation={initialLocation} />;
}
