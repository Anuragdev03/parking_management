import { useEffect } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import ExitParking from "./ExitParking";

import Theme from "../../theme";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateParkingSpace, updateAvailableSpace } from "../../store/parking";

// Windonw size
const { width } = Dimensions.get("window");

// Types
import { ReducerObj, PropType } from "../../types";

export default function Home(props: PropType) {
  let { navigation } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAvailableSpace());
  }, []);

  const availabelSpace = useSelector(
    (state: ReducerObj) => state.parkingReducer?.availableSpace
  );
  const parkingSpace = useSelector(
    (state: ReducerObj) => state.parkingReducer?.parkingSpace
  );

  // Function update the parking space data in redux store
  function handleChagne(text: string) {
    dispatch(updateParkingSpace(text));
  }

  // Function the redirect to new parking screen when click the submit button
  function handleSubmit() {
    navigation.push("NewParking");
  }

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.card}>
        <Text style={Styles.title}>Parking Management</Text>
        <Text style={Styles.text}>Enter the number of parking spaces</Text>
        <View style={Styles.textField}>
          <TextField
            onChange={handleChagne}
            placeholder={`Available parking space ${availabelSpace}`}
            keyboardType="numeric"
            maxLength={2}
            error={parkingSpace > availabelSpace ? "Sorry, required parking space is not available" : ""}
            testId="Parking-create-text-input"
          />
        </View>
        <View style={Styles.button}>
          <Button
            text="SUBMIT"
            onPress={handleSubmit}
            disable={
              availabelSpace && parkingSpace && parkingSpace <= availabelSpace ? false : true
            }
            testId="Parking-create-submit-button"
          />
        </View>

        <ExitParking navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.BACKGROUND_COLOR,
    width: width,
    paddingHorizontal: 5,
    flexShrink: 1,
    justifyContent: "center",
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    color: Theme.BACKGROUND_COLOR,
    fontWeight: "600",
    letterSpacing: 1,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    width: width - 30,
    height: 400,
    backgroundColor: Theme.PRIMARY_FONT_COLOR,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  text: {
    fontSize: 14,
    margin: 10,
    color: Theme.SECONDARY_FONT_COLOR
  },
  textField: {
    width: "70%",
    margin: 10,
  },
  button: {
    width: 120,
    marginB: 5,
  },
});
