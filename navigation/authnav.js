import React from "react";

import {
  createStackNavigator
} from "react-navigation";

import loginScreen from "../screens/auth/Login";
import SignUpScreen from "../screens/auth/SignUp";
import ForgotPassword from "../screens/auth/ForgotPassword";

export default createStackNavigator({
  Login: {
    screen: loginScreen
  },
  Join: {
    screen: SignUpScreen
  },
  Forgot: {
    screen: ForgotPassword
  }
});