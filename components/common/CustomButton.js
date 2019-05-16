import React from "react";
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions
} from "react-native";
const wS = Dimensions.get("window");
const dh = wS.height;
const dw = wS.width;

const hh = h => {
  return (dh * h) / 670;
};

const ww = w => {
  return (dw * w) / 375;
};

//To use this component, import into the parent component and pass props {name: state, type: boolean}
const CustomButton = ({
  text_style,
  placeholder,
  disabled,
  style,
  onPress,
  loading,
  spinnerSize
}) => {
  const { btn, btn_text } = styles;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || false}
      style={style || disabled ? { ...btn, ...{ opacity: 0.5 } } : btn}
    >
      {loading ? (
        <ActivityIndicator size={spinnerSize || "large"} />
      ) : (
        <Text style={text_style || btn_text}>{placeholder || ""}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    height: hh(45),
    opacity: 1,
    backgroundColor: "#3380CC",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: ww(5)
  },
  btn_text: {
    textAlign: "center",
    fontSize: ww(16),
    fontWeight: "500",
    color: "white"
  }
});
export { CustomButton };
