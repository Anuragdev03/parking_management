import React, { memo, useEffect } from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';

// Components
import ParkingSlot from "./ParkingSlot";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedSpace } from "../../store/parking";

// Types
import { ReducerObj } from "../../types";

// Utility function
import ArrayMethod from "../../utils/array";

const { width, height } = Dimensions.get("window");

function ParkingSpace() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const parkingSpace = useSelector(
    (state: ReducerObj) => state.parkingReducer.parkingSpace
  );

  const parkingSlotData = useSelector(
    (state: ReducerObj) => state.parkingReducer.parkingSlotData
  );

  const selectedSlots = useSelector(
    (state: ReducerObj) => state.parkingReducer.selectedSpace
  );

  const occupiedIds = useSelector(
    (state: ReducerObj) => state.parkingReducer.occupiedIds
  );

  useEffect(() => {
    selectRandomSlots();
  }, []);

  // Funtion that select the random slot and update the state
  function selectRandomSlots() {
    try {
      let randomSlots = ArrayMethod.getRandomElement(
        parkingSlotData,
        parkingSpace,
        occupiedIds
      );

      dispatch(updateSelectedSpace(randomSlots));
    } catch (err) {
      navigation?.push("warning")
    }
  }

  // Render Flatlis
  function renderList({ item }: any) {
    let occupied = false;
    let selected = false;

    Array.isArray(occupiedIds) &&
      occupiedIds?.forEach((id) => {
        if (id === item.id) {
          occupied = true;
        }
      });

    Array.isArray(selectedSlots) &&
      selectedSlots?.forEach((data) => {
        if (data?.id === item.id) {
          selected = true;
        }
      });

    return (
      <ParkingSlot
        key={item.id}
        index={item.id}
        name={item.name}
        occupied={occupied}
        selected={selected}
      />
    );
  }
  return (
    <View style={style.container}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FlatList
          style={style.flatList}
          numColumns={4}
          data={parkingSlotData}
          renderItem={renderList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    maxWidth: width - 50,
    height: height * 0.55,
    marginVertical: 20,
    borderRadius: 20,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  flatList: {
    height: height * 0.5,
  },
});

export default memo(ParkingSpace);
