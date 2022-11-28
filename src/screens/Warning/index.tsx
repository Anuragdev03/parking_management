import { Image, Dimensions, Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Theme from "../../theme";
import { PropType } from "../../types";
const { width } = Dimensions.get("window");

export default function WarningScreen(props: PropType) {
    const { navigation } = props;
  return (
    <SafeAreaView style={style.container}>
      <View style={style.detailContainer}>
        <Image source={require("../../assets/warning.png")} style={style.image} />
        <Text>Something Went Wrong, Please Try Again</Text>
        <Pressable onPress={() => navigation.push("Home")} style={style.msg}>
            <Text style={style.pressableText}>HOME</Text>
        </Pressable>
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
    justifyContent: "center",
    alignItems: "center"
  },
  detailContainer: {
    backgroundColor: Theme.PRIMARY_FONT_COLOR,
    width: width - 50,
    borderRadius: 20,
    padding: 20,
    display: "flex",
    marginTop: 10,
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 100,
    height: 100
  },
  msg: {
    marginVertical: 15,
    backgroundColor: Theme.TERNARY_COLOR,
    padding: 10,
    borderRadius: 5
  },
  pressableText: {
    color: Theme.PRIMARY_FONT_COLOR,
    letterSpacing: 2,
    fontWeight: "500"
  }
});
