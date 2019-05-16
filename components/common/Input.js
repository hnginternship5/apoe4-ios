import React, { Component } from "react";
import { TextInput, StyleSheet, Text, View, Dimensions } from "react-native";
const wS = Dimensions.get("window");
const dh = wS.height;
const dw = wS.width;

const hh = h => {
  return (dh * h) / 670;
};

const ww = w => {
  return (dw * w) / 375;
};

const errorText = {
  name: "Names should not contain numbers, please check again.",
  password: "",
  confirmpassword:"Password did not match the previous password",
  number: "",
  email: "Email format is invalid, please check again."
};

//To use this component, import into the parent component and pass props {name: state, type: boolean}
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: true, value: "" };
  }

  async componentDidUpdate(prevProps, prevState) {
    // if (prevState.valid !== this.state.valid) {
    //   this.props.formValid({
    //     name: this.props.name,
    //     valid: this.state.valid
    //   });
    // }
  }

  async updateValid(state) {
    await this.setState({ valid: state });
    await this.props.formValid({
      name: this.props.name,
      valid: state
    });
  }

  
  validateInput = (event, name) => {
    const value = event.nativeEvent.text;
    switch (name) {
      case "name":
        const alpha = /^[a-zA-Z\s]+$/;
        return alpha.test(value)
          ? this.updateValid(true)
          : this.updateValid(false);
      case "email":
        const mail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
        return mail.test(value)
          ? this.updateValid(true)
          : this.updateValid(false);
      case "confirmpassword":
        return this.props.password === value
          ? this.updateValid(true)
          : this.updateValid(false);
      default:
        return this.updateValid(true);
    }
  };

  render() {
    const { input, feedback } = styles;
    const {
      placeholder,
      secureTextEntry,
      autoCorrect,
      value,
      style,
      feedback_style,
      onChangeText,
      feedback_text,
      type
    } = this.props;
    const updateValue = async text => {
      this.setState({
        valid: true
      });
      if (text.length === 0) {
        this.setState({
          valid: false
        });
      }

      return await onChangeText(text);
    };
    return (
      <View>
        <TextInput
          value={value}
          autoCorrect={autoCorrect || false}
          placeholder={placeholder}
          blurOnSubmit={false}
          onChangeText={text => updateValue(text)}
          onBlur={e => {
            e.nativeEvent.text ? this.validateInput(e, type) : "";
          }}
          style={
            style || this.state.valid
              ? { ...input, ...{ marginBottom: hh(20) } }
              : { ...input, ...{ borderColor: "red", marginBottom: hh(10) } }
          }
          secureTextEntry={secureTextEntry || false}
        />
        {this.state.valid ? null : (
          <Text style={feedback_style || feedback}>
            {errorText[type] || "Invalid field input, please recheck."}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    padding: ww(10),
    paddingLeft: ww(20),
    height: hh(45),
    width: "100%",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#3380CC"
  },
  feedback: {
    color: "red",
    justifyContent: "flex-start",
    paddingBottom: hh(10)
  }
});

export { Input };
