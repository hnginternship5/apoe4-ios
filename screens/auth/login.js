import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Input,
  CustomButton,
  AuthContainer,
  Radio
} from '../../components/common';
import { connect } from 'react-redux';
import { actions } from '../../state/actions';
import { post_action } from '../../services/requests';
import AsyncStorage from '@react-native-community/async-storage';

const wS = Dimensions.get('window');
const dh = wS.height;
const dw = wS.width;

const hh = h => {
  return (dh * h) / 670;
};

const ww = w => {
  return (dw * w) / 375;
};
const fields = {
  email: false,
  password: false
};
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'signin',
      radio: false,
      body: {},
      loading: false,
      disabled: false,
      valid: false,
      intitialValid: fields,
      modal: {
        state: false,
        content: ''
      }
    };
  }
  async componentDidUpdate(prevProps) {
    //update view when request is in progress from redux state
    const {
      login_auth_state,
      login_auth,
      login_auth_error,
      token_auth,
      token_auth_state
    } = this.props.state;
    if (login_auth_state !== prevProps.state.login_auth_state) {
      this.handleLoginResult(login_auth_state, login_auth, login_auth_error);
    }

    //store token in store on signup success
    if (token_auth_state === 'success') {
      await AsyncStorage.setItem('userToken', token_auth);
      this.props.navigation.navigate('Main');
    }
  }

  //This part manages the view based on the auth redux state
  async handleLoginResult(login_auth_state, login_auth, login_auth_error) {
    switch (login_auth_state) {
      case 'success':
        this.setState({
          loading: false,
          disabled: false
        });
        await this.props.dispatch(
          actions('SET_TOKEN_AUTH_FULFILLED', login_auth.accessToken)
        );
        await this.props.dispatch(
          actions('SET_USER_ID_FULFILLED', login_auth.userId)
        );
        break;
      case 'failed':
        this.setState({
          loading: false,
          disabled: false
        });
        this.handleModal(true, {
          header: 'Error',
          body: login_auth_error.message
        });
        break;
      case 'pending':
        this.setState({
          loading: true,
          disabled: true
        });
        break;
      default:
    }
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

  //function handle if modal/notification should be displayed
  handleModal = async (event, content) => {
    const previousState = {
      ...this.state.modal
    };
    previousState['state'] = event;
    previousState['content'] = content || {};
    await this.setState({
      modal: previousState
    });
  };

  //function calls api
  async signin(body) {
    try {
      await this.props.dispatch(
        actions('SET_LOGIN_AUTH', post_action('', body, `auth/login`, ``))
      );
    } catch (error) {
      this.handleModal(true, {
        header: 'Error',
        body: error
      });
    }
  }

  //This part is needed to manage input validation result
  async formValid(event) {
    try {
      const intitialValid = { ...this.state.intitialValid };
      intitialValid[event.name] = event.valid;
      await this.setState({
        intitialValid: intitialValid
      });
      const result = { ...this.state.intitialValid };
      let value = true;
      Object.values(result).forEach(each => {
        value = value && each;
      });
      await this.setState({
        valid: value
      });
    } catch (error) {
      this.handleModal(true, {
        header: 'Error',
        body: error
      });
    }
  }

  renderPage() {
    const {} = this.props.state;
    return (
      <View
        style={{
          flex: 1,
          borderWidth: 0,
          width: '100%',
          height: '100%',
          padding: 10
        }}
      >
        <Text
          style={{
            fontSize: ww(24),
            fontWeight: '600',
            color: '#676767'
          }}
        >
          Sign In
        </Text>
        <View
          style={{
            width: '100%',
            marginVertical: hh(20)
          }}
        >
          <Input
            value={this.state.body.email}
            placeholder='Email Address'
            type='email'
            name='email'
            formValid={event => this.formValid(event)}
            onChangeText={text => this.updateInput(text, 'email')}
          />
          <Input
            value={this.state.body.password}
            placeholder='Password'
            type='password'
            name='password'
            formValid={event => this.formValid(event)}
            secureTextEntry={true}
            onChangeText={text => this.updateInput(text, 'password')}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: hh(10)
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    radio: !this.state.radio
                  })
                }
              >
                <Radio color='#3380CC' selected={this.state.radio} />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#676767',
                  fontWeight: '500',
                  fontStyle: 'normal',
                  fontSize: ww(14)
                }}
              >
                Remember Me
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Forgot')}
            >
              <Text
                style={{
                  color: '#CC3333',
                  fontSize: ww(14),
                  fontWeight: '500'
                }}
              >
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center'
          }}
        >
          <CustomButton
            onPress={() => this.signin(this.state.body)}
            placeholder='Sign in'
            loading={this.state.loading}
            disabled={this.state.disabled || !this.state.valid}
          />

          <Text
            style={{
              textAlign: 'center',
              fontSize: ww(16),
              padding: '8%',
              fontWeight: '500',
              color: '#676767'
            }}
          >
            or
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity style={styles.btn}>
              <Image
                source={require('../../assets/google.png')}
                style={{
                  height: ww(25),
                  width: ww(25)
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Image
                source={require('../../assets/fb.png')}
                style={{
                  height: ww(25),
                  width: ww(25)
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            paddingTop: '15%'
          }}
        >
          <Text
            style={{
              fontSize: ww(16),
              fontWeight: '500',
              color: '#676767'
            }}
          >
            Dont have an account ?
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Join')}
          >
            <Text
              style={{
                fontSize: ww(16),
                fontWeight: '600',
                paddingLeft: '5%',
                color: '#3380CC'
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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

export default connect(store => {
  return {
    state: store.states
  };
})(SignIn);

const styles = StyleSheet.create({
  btn: {
    borderWidth: 2,
    borderColor: '#3380CC',
    height: hh(40),
    width: 0.35 * dw,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  input: {
    backgroundColor: 'white',
    padding: ww(20),
    height: hh(45),
    width: '100%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3380CC',
    marginBottom: hh(20)
  }
});
