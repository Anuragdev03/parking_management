import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import TextField from "./TextField";

// Utils
import FormatTime from "../utils/DateTime";

// Type
interface PropType {
  getParkingTime: (time: string) => void;
}

export default function DateTime({ getParkingTime }: PropType) {
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );

  // Hide DateTime picker
  function hideDatePicker() {
    setDatePickerVisibility(false);
  }

  function handleConfirm(value: Date) {
    setDatePickerVisibility(false);
    let time = FormatTime.getTime(value);

    getParkingTime(time);
    setSelectedTime(time);
  }

  return (
    <View style={style.container}>
      <TextField
        onPressIn={() => setDatePickerVisibility(true)}
        placeholder="Parking Time"
        value={selectedTime}
        testId="input-field"
      />

      <View style={style.dateIcon} testID="date-time-icon">
        <Image
          source={require("../assets/date-time.png")}
          style={style.timeImage}
        />

        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          is24Hour={true}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  dateIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  timeImage: {
    width: 20,
    height: 20,
  },
});
