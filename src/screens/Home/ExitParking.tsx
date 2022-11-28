import { View, Text, StyleSheet, Pressable } from "react-native";

interface PropType {
  navigation: {
    push: Function;
  };
}

export default function ExitParking(props: PropType) {
  const { navigation } = props;
  return (
    <View style={style.container}>
      <Text style={style.text}>OR</Text>

      <Pressable onPress={() => navigation.push("ExitParking")}>
        <Text style={style.exitText}>EXIT PARKING</Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "300",
    margin: 10,
  },
  exitText: {
    color: "red",
    fontWeight: "500",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    letterSpacing: 2
  },
});
