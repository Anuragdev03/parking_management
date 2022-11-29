import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import Theme from "../../theme";

// Components
import ParkingSlot from "../NewParking/ParkingSlot";
import Button from "../../components/Button";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { removeOccupiedSpace, removeOccupiedIds } from "../../store/parking";

// Utils
import DateTime from "../../utils/DateTime";

// Types
import { ReducerObj, PropType } from "../../types";

// Windonw size
const { width, height } = Dimensions.get("window");

export default function PaymentDetail(props: PropType) {
  let { navigation, route } = props;
  const dispatch = useDispatch();
  let data = route.params?.item;

  const occupiedSpace = useSelector(
    (state: ReducerObj) => state.parkingReducer.occupiedSpace
  );

  const occupiedSpaceIds: number[] = useSelector(
    (state: ReducerObj) => state.parkingReducer.occupiedIds
  );

  // Function handles the payment completion
  function handleSubmit() {
    try {
      let filteredData = occupiedSpace.filter(
        (occupiedSpace) => occupiedSpace.token !== data.token
      );
      let selectedSpacesIds = data?.selectedSpace.map(
        (space: object) => space?.id
      );
      let filterOccupiedIds = [];

      for (let i = 0; i < occupiedSpaceIds?.length; i++) {
        if (!selectedSpacesIds?.includes(occupiedSpaceIds[i])) {
          filterOccupiedIds?.push(occupiedSpaceIds[i]);
        }
      }

      dispatch(removeOccupiedIds(filterOccupiedIds));
      dispatch(removeOccupiedSpace(filteredData));

      // Send data
      let paymentData = {
        car_registeration: data?.carRegNo,
        charge: totalCost,
      };

      axios.post("https://httpstat.us/200", paymentData);

      navigation.push("Success", { message: "Payment Successful" });
    } catch (err) {
      navigation.push("Warning");
    }
  }

  // Function to calculate cost
  function calculateCost(parkedTime: string | undefined) {
    let hr = Number(parkedTime && parkedTime.split(":")[0]);
    let mm = Number(parkedTime && parkedTime.split(":")[1]);

    if (hr < 2) {
      return 10;
    } else if (hr <= 2 && mm < 1) {
      return 10;
    } else if (hr === 2 && mm > 0) {
      return 30;
    } else {
      return hr * 10 - 10;
    }
  }

  // Function that return the tiem spent on parking space
  function getParkedTime() {
    let currentTime = new Date().toTimeString();
    const parkedTime = DateTime.timediff(data?.parkingTime, currentTime);
    return parkedTime;
  }
  const parkedTime = getParkedTime();
  const costPerSpace = calculateCost(parkedTime);
  const totalCost = data?.selectedSpace?.length * costPerSpace;

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.title}>Payment Detail</Text>

      <View style={style.detailContainer}>
        <View style={style.col}>
          <Text style={style.subTitle}>1. Vehicle Reg No:</Text>
          <View style={style.textView}>
            <Text style={style.text}>{data?.carRegNo}</Text>
          </View>
        </View>

        <View style={style.col}>
          <Text style={style.subTitle}>2. Parked Time:</Text>
          <View style={style.textView}>
            <Text style={style.text}>{data?.parkingTime}</Text>
          </View>
        </View>

        <Text style={style.subTitle}>
          3.{" "}
          {data?.selectedSpace.length > 1
            ? "Selected Slots:"
            : "Selected slot:"}
        </Text>
        <View style={style.row}>
          <FlatList
            data={data?.selectedSpace}
            horizontal
            renderItem={({ item }) => (
              <ParkingSlot index={item?.id} selected={true} small disable />
            )}
          />
        </View>

        <View style={style.description}>
          <Text style={style.description__text} testID="deregister-time-spent">
            1. Time Spent: {parkedTime} Hr
          </Text>
          <Text style={style.description__text}>
            2. Cost per space: {costPerSpace} $
          </Text>
          <Text style={style.description__text} testID="deregister-charge">
            3. Total cost: {data?.selectedSpace.length} * {costPerSpace} ={" "}
            {totalCost} $
          </Text>
        </View>

        <View style={{ position: "absolute", bottom: 20 }}>
          <Button onPress={handleSubmit} text="COMPLETE PAYMENT" testId="deregister-payment-button" />
        </View>
      </View>
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
  detailContainer: {
    backgroundColor: Theme.PRIMARY_FONT_COLOR,
    height: height * 0.9,
    width: width - 50,
    borderRadius: 20,
    padding: 20,
    display: "flex",
    marginTop: 10,
    alignItems: "center",
    position: "relative",
  },
  col: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    paddingRight: 5,
    opacity: 0.7,
    paddingVertical: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    color: Theme.PRIMARY_FONT_COLOR,
    padding: 10,
  },
  textView: {
    backgroundColor: Theme.BACKGROUND_COLOR,
    borderRadius: 5,
    minWidth: 140,
  },
  description: {
    width: width - 90,
    height: 130,
    borderColor: Theme.BACKGROUND_COLOR,
    borderRadius: 5,
    opacity: 0.5,
    borderWidth: 2,
    marginTop: 10,
    padding: 5,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  description__text: {
    fontSize: 18,
    color: Theme.BACKGROUND_COLOR,
    fontWeight: "500",
    paddingBottom: 10,
  },
});
