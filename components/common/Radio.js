import React, { Component } from "react";
import { View } from "react-native";

//To use this component, import into the parent component and pass props {name: state, type: boolean}
const Radio = ({ color, selected }) => {
  return (
    <View
      style={{
        height: 15,
        width: 15,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: color ? color : "blue",
        backgroundColor: selected ? (color ? color : "#3380CC") : "white",
        marginRight: 10
      }}
    />
  );
};

export { Radio };
