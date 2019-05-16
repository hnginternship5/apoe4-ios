import React from "react";
import MainTabNavigator from "./sideNav";
import AuthLoadingScreen from "../screens/auth/authLoad";
import authStack from "./authnav";
import { Dimensions } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";


// const AppDrawer = createDrawerNavigator(
//   {
//     Home: StartingScreen
//   },
//   {
//     contentComponent: props => <SideMenu {...props} />,
//     drawerWidth: Dimensions.get("window").width * 0.6
//   }
// );

const AppNavigator = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    load: { screen: AuthLoadingScreen },
    auth: authStack,
    Main: MainTabNavigator
  },
  {
    initialRouteName: "load"
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;

