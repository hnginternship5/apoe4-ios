import React from "react";

import {
  createStackNavigator
} from "react-navigation";

import SignIn from "../screens/auth/LoginView";
import SignUp from "../screens/auth/SignUp";
import ForgotPassword from "../screens/auth/ForgotPassword";

export default createStackNavigator({
  Login: {
    screen: SignIn
  },
  Join: {
    screen: SignUp
  },
  Forgot: {
    screen: ForgotPassword
  }
});