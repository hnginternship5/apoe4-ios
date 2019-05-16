import React from "react";
import { StyleSheet, View } from "react-native";
import AppContainer from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import getStore from "./state/store";

const { store } = getStore();

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppContainer />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
