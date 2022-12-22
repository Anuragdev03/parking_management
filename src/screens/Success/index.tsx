import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

import Theme from "../../theme";

// Types
import { PropType } from "../../types";

// Components
import Button from "../../components/Button";

const { width, height } = Dimensions.get("window");

export default function SuccessScreen(props: PropType) {
  const { navigation, route } = props;
  let message = route?.params?.message;

  return (
    <SafeAreaView style={style.container}>
      <View style={style.detailContainer}>
        <LottieView
          source={require("../../assets/9-success.json")}
          style={style.animation}
          resizeMode="cover"
          renderMode="AUTOMATIC"
          duration={3000}
          loop={false}
          autoPlay
          hardwareAccelerationAndroid
        />
        <LottieView
          source={require("../../assets/8-success.json")}
          style={style.animation2}
          resizeMode="cover"
          renderMode="AUTOMATIC"
          duration={4000}
          loop={false}
          hardwareAccelerationAndroid
          autoPlay
          autoSize
        />
        <Text style={style.text}>{message ? message : "SUCCESS"}</Text>
        <View style={style.homeButton}>
          <Button onPress={() => navigation.push("Home")} text="HOME" />
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
  animation: {
    width: 150,
    height: 150,
  },
  animation2: {
    position: "absolute",
  },
  detailContainer: {
    backgroundColor: Theme.PRIMARY_FONT_COLOR,
    height: height * 0.5,
    width: width - 50,
    borderRadius: 20,
    padding: 20,
    display: "flex",
    marginTop: 10,
    alignItems: "center",
    position: "relative",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  homeButton: {
    marginTop: 10,
    width: 100,
  },
});
