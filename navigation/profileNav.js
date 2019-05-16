import React from "react";

import { createStackNavigator } from "react-navigation";
import DOB from "../components/DOB";
import SignIn from "../components/SignIn";
import SideMenu from "../components/SideMenu";

export default createStackNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    DOB,
    SideMenu
  }
);

