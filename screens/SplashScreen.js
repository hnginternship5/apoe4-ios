import React, { Component } from "react";
import { StackActions } from "react-navigation";
import { View, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: "StartingScreen"
    })
  ]
});

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/logo-white.png")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "rgba(3, 36, 118, 1)"
  },
  image: {
    height: 100,
    alignSelf: "center"
  }
});
