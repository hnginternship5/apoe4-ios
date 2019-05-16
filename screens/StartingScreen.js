import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import HomeScreen from '../components/HomePage';

export default class StartingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLaunch: true,
      value: 'Nothing yet'
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('launched')
      .then(value => {
        console.log(value);
        if (value === null) {
          setTimeout(() => {
            AsyncStorage.setItem('launched', 'true')
              .then(() => {
                this.setState({
                  firstLaunch: false,
                  value
                });
                // this.props.navigation.replace('Tutorial');
              })
              .catch(error => {
                console.log(error);
              });
          }, 5000);
        } else {
          this.setState({
            firstLaunch: false,
            value
          });
          // this.props.navigation.replace('SignIn');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // checkStart() {
  //   return this.state.firstLaunch ? (
  //     <HomeScreen/>
  //   ) : (
  //     <View style={styles.container}>
  //       <Text style={styles.image}>{this.state.value}</Text>
  //     </View>
  //   );
  // }

  render() {
    return  <HomeScreen />;
  }
}

