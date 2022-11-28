import { Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';

import Theme from "../../theme";

// Type
import { ParkingSlot as ParkingSlotType } from "../../types";

// Redux
import { useDispatch } from "react-redux";
import { updateSelectedSpace } from "../../store/parking";

export default function ParkingSlot({
  index,
  name,
  selected,
  occupied,
  small,
  disable,
}: ParkingSlotType) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function handlePress() {
    try {
      let data = {
        id: index,
        name,
      };

      dispatch(updateSelectedSpace(data));
    } catch (err) {
      navigation?.push("Warning");
    }
  }
  return (
    <Pressable
      onPress={handlePress}
      disabled={occupied || disable ? true : false}
      style={[
        style.container,
        {
          backgroundColor: selected ? "green" : Theme.SECONDARY_BUTTON,
          opacity: occupied ? 0.4 : 1,
          width: small ? 30 : 50,
          height: small ? 30 : 50,
        },
      ]}
      testID={`parking-drawing-space-${index}`}
    >
      <Text
        style={[style.text, { fontSize: small ? 12 : 18 }]}
        testID={`parking-drawing-space-number-${index}`}
      >
        {index}
      </Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    backgroundColor: Theme.SECONDARY_BUTTON,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  text: {
    color: Theme.PRIMARY_FONT_COLOR,
    alignItems: "center",
    fontWeight: "600",
    fontSize: 18,
  },
});
