import {
  FlatList,
  Dimensions,
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Theme from "../../theme";

// Redux
import { useSelector } from "react-redux";
import { ReducerObj, PropType, OccupiedSpace } from "../../types";

const { width, height } = Dimensions.get("window");

export default function ExitParking(props: PropType) {
  let { navigation } = props;

  const occupiedSpace = useSelector(
    (state: ReducerObj) => state.parkingReducer.occupiedSpace
  );

  // Render the list of parked vehicle data
  function renderList(item: OccupiedSpace, index: number) {
    return (
      <Pressable onPress={() => navigation.push("PaymentDetail", { item })}>
        <View style={style.listItem}>
          <Text style={style.listItemText}>
            {index + 1}. {item?.carRegNo}
          </Text>
          <Image
            source={require("../../assets/arrow-right.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>
      </Pressable>
    );
  }

  // Render if data array is empty
  function emptyComponent() {
    return (
      <View style={style.emptyComponent}>
        <Text style={{ fontStyle: "italic", fontWeight: "600" }}>
          No Data Available
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={style.container}>
      <View style={style.listContainer}>
        <Text style={style.title}>Exit Parking</Text>
        <View style={style.divider} />
        <FlatList
          data={occupiedSpace}
          renderItem={({ item, index }) => renderList(item, index)}
          keyExtractor={(item) => item?.token}
          style={style.flatList}
          ListEmptyComponent={emptyComponent}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.BACKGROUND_COLOR,
    width: width,
    paddingHorizontal: 10,
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: Theme.BACKGROUND_COLOR,
    fontWeight: "600",
    letterSpacing: 2,
    paddingBottom: 5,
  },
  flatList: {
    height: height * 0.89,
  },
  listContainer: {
    backgroundColor: Theme.PRIMARY_FONT_COLOR,
    height: height * 0.9,
    width: width - 50,
    borderRadius: 20,
    padding: 20,
    display: "flex",
    marginTop: 10,
    position: "relative",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#c6c6c6",
  },
  listItem: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listItemText: {
    fontSize: 16,
    textTransform: "uppercase",
    color: Theme.SECONDARY_FONT_COLOR,
    fontWeight: "500",
  },
  emptyComponent: {
    alignItems: "center",
    marginVertical: "20%",
  },
});
