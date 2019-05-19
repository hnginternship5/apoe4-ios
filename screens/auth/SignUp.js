import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  Input,
  CustomButton,
  AuthContainer,
  Radio
} from "../../components/common";
import { connect } from "react-redux";
import { actions } from "../../state/actions";
import { post_action } from "../../services/requests";
import AsyncStorage from "@react-native-community/async-storage";

const wS = Dimensions.get("window");
const dh = wS.height;
const dw = wS.width;

const hh = h => {
  return (dh * h) / 670;
};

const ww = w => {
  return (dw * w) / 375;
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "signup",
      body: {},
      valid: false,
      radio: false,
      loading: false,
      disabled: false,
      modal: {
        state: false,
        content: ""
      }
    };
  }
  async componentDidUpdate(prevProps) {
    //destructure redux props
    const {
      reg_auth_state,
      reg_auth,
      reg_auth_error,
      token_auth,
      token_auth_state
    } = this.props.state;
    //update view when request is in progress from redux state
    if (reg_auth_state !== prevProps.state.reg_auth_state) {
      this.handleRequestResult(reg_auth_state, reg_auth, reg_auth_error);
    }

    //store token in store on signup success
    if (token_auth_state === "success") {
      await AsyncStorage.setItem("userToken", token_auth);
      this.props.navigation.navigate("Login");
    }
  }

  //This part manages the view based on the auth redux state
  async handleRequestResult(reg_auth_state, reg_auth, reg_auth_error) {
    switch (reg_auth_state) {
      case "success":
        this.setState({
          loading: false,
          disabled: false
        });
        await this.props.dispatch(
          actions("SET_TOKEN_AUTH_FULFILLED", reg_auth.accessToken)
        );
        break;
      case "failed":
        this.setState({
          loading: false,
          disabled: false
        });
        this.handleModal(true, {
          header: "Error",
          body: reg_auth_error.message
        });
        break;
      case "pending":
        this.setState({
          loading: true,
          disabled: true
        });
        break;
      default:
    }
  }

  //function calls api
  async signup(body) {
    try {
      await this.props.dispatch(
        actions("SET_REG_AUTH", post_action("", body, `auth/register`, ``))
      );
    } catch (error) {}
  }

  //this recieves props from input component to update the parent state
  async updateInput(val, name) {
    const previousState = {
      ...this.state.body
    };
    previousState[name] = val;
    await this.setState({
      body: previousState
    });
  }

  //This part is needed to manage input validation result
  async formValid(event) {
    try {
      const intitialValid = {
        ...this.state.intitialValid
      };
      intitialValid[event.name] = event.valid;
      await this.setState({
        intitialValid: intitialValid
      });
      const result = {
        ...this.state.intitialValid
      };
      let value = true;
      Object.values(result).forEach(each => {
        value = value && each;
      });
      await this.setState({
        valid: value
      });
    } catch (error) {
      this.handleModal(true, {
        header: "Error",
        body:
          typeof error === "object"
            ? "An Error Occured, Please Try Again"
            : error
      });
    }
  }

  //function handle if modal/notification should be displayed
  handleModal = async (event, content) => {
    const previousState = {
      ...this.state.modal
    };
    previousState["state"] = event;
    previousState["content"] = content || {};
    await this.setState({
      modal: previousState
    });
  };

  renderPage() {
    return (
      <ScrollView
        style={{
          flex: 1
        }}
      >
        <Text
          style={{
            fontSize: ww(24),
            fontWeight: "600",
            color: "#676767"
          }}
        >
          Sign Up
        </Text>
        <View
          style={{
            width: "100%",
            marginVertical: hh(20)
          }}
        >
          <Input
            value={this.state.body.fullname}
            placeholder="Full Name"
            type="name"
            onChangeText={text => this.updateInput(text, "fullname")}
            name="name"
            formValid={event => this.formValid(event)}
          />
          <Input
            value={this.state.body.email}
            placeholder="Email Address"
            type="email"
            name="email"
            formValid={event => this.formValid(event)}
            onChangeText={text => this.updateInput(text, "email")}
          />
          <Input
            value={this.state.body.password}
            placeholder="Password"
            type="password"
            onChangeText={text => this.updateInput(text, "password")}
            secureTextEntry={true}
            name="password"
            formValid={event => this.formValid(event)}
          />
          {this.state.body.password ? (
            <Input
              value={this.state.body.confirmpassword}
              placeholder="Confirm Password"
              type="confirmpassword"
              onChangeText={text => this.updateInput(text, "confirmpassword")}
              secureTextEntry={true}
              password={this.state.body.password}
              name="confirmpassword"
              formValid={event => this.formValid(event)}
            />
          ) : null}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: hh(10)
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    radio: !this.state.radio
                  })
                }
              >
                <Radio color="#3380CC" selected={this.state.radio} />
              </TouchableOpacity>
              <Text
                style={{
                  color: "#676767",
                  fontWeight: "500",
                  fontStyle: "normal",
                  fontSize: ww(14)
                }}
              >
                Accept Terms and Conditions
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: "center"
          }}
        >
          <CustomButton
            onPress={() => this.signup(this.state.body)}
            placeholder="Sign up"
            loading={this.state.loading}
            disabled={
              this.state.disabled || !this.state.radio || !this.state.valid
            }
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            paddingTop: "15%"
          }}
        >
          <Text
            style={{
              fontSize: ww(16),
              fontWeight: "500",
              color: "#676767"
            }}
          >
            Already have an account ?
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text
              style={{
                fontSize: ww(16),
                fontWeight: "600",
                paddingLeft: "5%",
                color: "#3380CC"
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <AuthContainer
        modal={{
          data: {
            header: this.state.modal.content.header,
            body: this.state.modal.content.body
          },
          visible: this.state.modal.state,
          handleModal: this.handleModal
        }}
        child={this.renderPage()}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    padding: ww(20),
    height: hh(45),
    width: "100%",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#3380CC",
    marginBottom: hh(20)
  }
});

export default connect(store => {
  return {
    state: store.states
  };
})(SignUp);
