import { View, TextInput, StyleSheet, Text } from "react-native";
import Theme from "../theme";

// Types
import { TextField } from "../types";

export default function ({ onChange, placeholder, keyboardType, onPressIn, value, maxLength, error, testId }: TextField) {  
  return (
    <View style={style.container}>
      <TextInput
        onChangeText={(text) => onChange && onChange(text)}
        placeholder={placeholder}
        style={[style.input, {borderColor: error ? "red" : Theme.BACKGROUND_COLOR}]}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onPressIn={onPressIn}
        value={value}
        testID={testId}
      />
      {error && (<Text style={style.error}>{error ? error : `Somethind went wrong😔.`}</Text>)}
    </View>
  );
}

// Styles
const style = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.BACKGROUND_COLOR,
    height: 40,
    borderRadius: 20,
    color: Theme.SECONDARY_FONT_COLOR,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    fontSize: 12
  }
});
