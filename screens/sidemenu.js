import React from 'react';
import { Button, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet
} from 'react-native';

export default class sideMenu extends React.Component {
  static navigationOptions = {
    title: 'Please sign in'
  };

  render() {
    return (
      <View>
        <Button title='Sign in!' onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Main');
  };
}

// More code like OtherScreen omitted for brevity
