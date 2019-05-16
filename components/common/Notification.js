import React, { Component } from "react";
import {
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Image
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

const Notification = ({ handleModal, visible, data }) => {
  const closeModal = state => {
    handleModal(!state);
  };
  const { btn, btn_text, header_text, body_text } = styles;
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View
          style={{
            marginTop: 22,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              backgroundColor: "#DDE7FF",
              borderRadius: 10,
              width: "80%",
              height: "30%",
              alignItems: "center"
            }}
          >
            <View
              style={{
                height: "60%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 30
                }}
              >
                <Image
                  source={require("../../assets/icons/info-icon.png")}
                  style={{
                    height: ww(25),
                    width: ww(25),
                    marginRight: 5,
                    alignItems: "center"
                  }}
                />
                <Text style={header_text}>{data.header}</Text>
              </View>
              <Text style={body_text}> {data.body} </Text>
            </View>
            <View
              style={{
                height: "30%",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={btn}
                onPress={() => {
                  closeModal(true);
                }}
              >
                <Text style={btn_text}> OK </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: hh(40),
    width: 0.35 * dw,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#3380CC"
  },
  btn_text: {
    textAlign: "center",
    fontSize: ww(16),
    fontWeight: "500",
    color: "white"
  },
  header_text: {
    color: "#3380CC",
    paddingBottom: 10,
    fontSize: ww(18),
    fontWeight: "bold",
    alignItems: "center"
  },
  body_text: {
    color: "#3380CC",
    fontSize: ww(16),
    fontWeight: "500",
    padding: 10
  }
});

export { Notification };
