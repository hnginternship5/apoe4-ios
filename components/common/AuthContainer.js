import React, { Component } from "react";
import { View, Image, StatusBar, Dimensions, StyleSheet } from "react-native";
import { Notification } from "./Notification";
const wS = Dimensions.get("window");
const dw = wS.width;

const AuthContainer = ({ child, modal }) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Notification
        data={modal.data}
        visible={modal.visible}
        handleModal={modal.handleModal}
      />
      <StatusBar
        backgroundColor="#2a56c6"
        translucent
        barStyle="light-content"
      />
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          width: "100%"
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            padding: "7%"
          }}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={{
              height: dw * 0.2,
              width: dw * 0.2,
              marginBottom: "5%",
              alignSelf: "flex-start"
            }}
            resizeMode="contain"
          />
          {child}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export { AuthContainer };
