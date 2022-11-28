import React from "react";
import { Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import Theme from "../theme";

// Types
import { ButtonType } from "../types";

const Button = ({ onPress, text, type = "PRIMARY", isLoading, disable=false, testId }: ButtonType) => {  
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`], { opacity: disable ? 0.4 : 1}]}
      disabled={disable}
      testID={testId}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    padding: 12,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 20,
  },

  container_PRIMARY: {
    backgroundColor: Theme.PRIMARY_BUTTON,
    color: "#FFF",
  },

  container_SECONDARY: {
    backgroundColor: Theme.SECONDARY_BUTTON,
    borderWidth: 2,
    color: "#FFF",
  },

  text: {
    color: Theme.PRIMARY_FONT_COLOR,
    letterSpacing: 2,
    fontWeight: "400",
  },

  text_SECONDARY: {
    color: Theme.PRIMARY_FONT_COLOR,
  },
});

export default Button;
