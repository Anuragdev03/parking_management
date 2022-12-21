import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import uuid from "react-native-uuid";

import Theme from "../../theme";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  updateParkingTime,
  updateCarRegNo,
  updateOccupiedSpace,
  clearData,
  updateOccupiedIds,
} from "../../store/parking";

// Types
import { ReducerObj, PropType } from "../../types";

// Windonw size
const { width, height } = Dimensions.get("window");

// Components
import ParkingSpace from "./ParkingSpace";
import DateTime from "../../components/DateTimePicker";
import TextField from "../../components/TextField";
import Button from "../../components/Button";

export default function NewParking(props: PropType) {
  let { navigation } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const availabelSpace: number = useSelector(
    (state: ReducerObj) => state.parkingReducer?.availableSpace
  );
  const parkingTime = useSelector(
    (state: ReducerObj) => state.parkingReducer?.parkingTime
  );
  const carRegNo = useSelector(
    (state: ReducerObj) => state.parkingReducer?.carRegNo
  );
  const selectedSpace = useSelector(
    (state: ReducerObj) => state.parkingReducer?.selectedSpace
  );

  function getParkingTime(time: string) {
    dispatch(updateParkingTime(time));
  }

  function handleTextChange(text: string) {
    dispatch(updateCarRegNo(text));
  }

  // Function return an array of selected parking space ids
  function getSelectedSlotsIds(selectedSpace: []) {
    let ids = selectedSpace.map((data) => data && data?.id);
    return ids;
  }

  // Function update the reudx states with submitted data and redirect to booking success page
  function handleSubmit() {
    try {
      setIsLoading(true);
      let token = uuid.v4();
      let occupiedId = getSelectedSlotsIds(selectedSpace);

      let data = {
        token,
        parkingTime,
        carRegNo,
        selectedSpace,
      };

      dispatch(updateOccupiedIds(occupiedId));
      dispatch(updateOccupiedSpace(data));
      dispatch(clearData());
      setTimeout(() => {
        setIsLoading(false);
        navigation.push("Success", { message: "Booking Successful" });
      }, 1500);
    } catch (err) {
      navigation.push("Warning");
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <KeyboardAwareScrollView>
        <Text style={style.title}>Create New Parking</Text>
        <Text style={style.text}>{`Available Space: ${availabelSpace}`}</Text>
        <View style={style.parkingSpace}>
          <ParkingSpace />
        </View>
        <View style={style.formContainer}>
          <View style={style.formContent}>
            <View style={style.dateTime}>
              <DateTime getParkingTime={getParkingTime} />
            </View>

            <View style={style.carReg}>
              <TextField
                onChange={handleTextChange}
                placeholder="Car Reg No."
                testId="parking-drawing registration-input"
              />
            </View>
          </View>

          <View style={style.makePaymentButton}>
            <Button
              onPress={handleSubmit}
              text="BOOK SPACE"
              disable={parkingTime && carRegNo ? false : true}
              isLoading={isLoading}
              testId="parking-drawing-add-carbutton"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.BACKGROUND_COLOR,
    width: width,
    paddingHorizontal: 5,
    flexShrink: 1,
    padding: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: Theme.PRIMARY_FONT_COLOR,
    letterSpacing: 1,
  },
  text: {
    fontSize: 16,
    color: Theme.PRIMARY_FONT_COLOR,
    opacity: 0.7,
    marginTop: 20,
  },
  parkingSpace: {
    display: "flex",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: Theme.PRIMARY_FONT_COLOR,
    height: height * 0.2,
    width: width - 50,
    borderRadius: 20,
    padding: 20,
    display: "flex",
    alignItems: "center",
  },
  formContent: {
    display: "flex",
    flexDirection: "row",
  },
  dateTime: {
    width: (width - 90) / 2,
    paddingHorizontal: 3,
  },
  carReg: {
    width: (width - 90) / 2,
    paddingHorizontal: 3,
  },
  makePaymentButton: {
    width: (width - 20) / 2,
    paddingTop: 5,
  },
});
