import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

type IconButtonProps = {
  icon: string;
  color: string;
  size: number;
  onPress: () => void;
};
export default function IconButton({
  icon,
  size,
  color,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={(pressed) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons icon={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.7,
  },
});
