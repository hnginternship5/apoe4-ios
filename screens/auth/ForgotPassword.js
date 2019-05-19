import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Input,
  CustomButton,
  AuthContainer
} from '../../components/common';
import {
  connect
} from 'react-redux';
import {
  actions
} from '../../state/actions';
import {
  post_action
} from '../../services/requests';

const wS = Dimensions.get('window');
const dh = wS.height;
const dw = wS.width;

const hh = h => {
  return (dh * h) / 670;
};

const ww = w => {
  return (dw * w) / 375;
};

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'forgotpassword',
      email: '',
      loading: false,
      disabled: false,
      valid: false,
      body: {},
      modal: {
        state: false,
        content: {}
      }
    };
  }

  componentDidUpdate(prevProps) {
    //update view when request is in progress from redux state
    const {
      forgot_auth_state,
      forgot_auth,
      forgot_auth_error
    } = this.props.state;
    if (forgot_auth_state !== prevProps.state.forgot_auth_state) {
      this.handleRequestResult(
        forgot_auth_state,
        forgot_auth,
        forgot_auth_error
      );
    }
  }

  //This part manages the view based on the auth redux state
  handleRequestResult(forgot_auth_state, forgot_auth, forgot_auth_error) {
    switch (forgot_auth_state) {
      case 'success':
        this.setState({
          loading: false,
          disabled: false
        });
        alert(JSON.stringify(forgot_auth));
        break;
      case 'failed':
        this.setState({
          loading: false,
          disabled: false
        });
        this.handleModal(true, {
          header: 'Error',
          body: 'Unable to reset password, please try again'
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
  //This part is needed to manage input validation result
  async formValid(event) {
    try {
      const intitialValid = {
        ...this.state.intitialValid
      };
      intitialValid[event.name] = event.valid;
      await this.setState({
        intitialValid
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
        header: 'Error',
        body: typeof error === 'object' ? "An Error Occured, Please Try Again" : error
      });
    }
  }
  //this recieves props from input component to update the parent state
  updateInput(val, name) {
    this.setState({
      [name]: val
    });
  }

  //function calls api
  async forgot(body) {
    try {
      await this.props.dispatch(
        actions('SET_FORGOT_AUTH', post_action('', body, `auth/forgot`, ``))
      );
    } catch (error) {}
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

  renderPage() {
    return ( <
      View style = {
        {
          flex: 1,
          borderWidth: 0,
          width: '100%',
          height: '100%',
          padding: 10
        }
      } >
      <
      Text style = {
        {
          fontSize: ww(24),
          fontWeight: '600',
          color: '#676767'
        }
      } >
      Forgot Password <
      /Text> <
      Text style = {
        {
          fontSize: ww(16),
          marginTop: 10,
          fontWeight: 'normal',
          color: '#676767'
        }
      } >
      Please enter your email so we can help you reset your password. <
      /Text> <
      View style = {
        {
          width: '100%',
          marginVertical: hh(20)
        }
      } >
      <
      Input value = {
        this.state.body.email
      }
      placeholder = 'Email Address'
      type = 'email'
      name = 'email'
      formValid = {
        event => this.formValid(event)
      }
      onChangeText = {
        text => this.updateInput(text, 'email')
      }
      /> <
      /View> <
      View style = {
        {
          alignItems: 'center'
        }
      } >
      <
      CustomButton onPress = {
        () => this.forgot(this.state.body)
      }
      placeholder = 'Reset Password'
      loading = {
        this.state.loading
      }
      disabled = {
        this.state.disabled || !this.state.valid
      }
      /> <
      /View> <
      View style = {
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          paddingTop: '15%'
        }
      } >
      <
      Text style = {
        {
          fontSize: ww(16),
          fontWeight: '500',
          color: '#676767'
        }
      } >
      Dont have an account ?
      <
      /Text> <
      TouchableOpacity onPress = {
        () => this.props.navigation.navigate('Join')
      } >
      <
      Text style = {
        {
          fontSize: ww(16),
          fontWeight: '600',
          paddingLeft: '5%',
          color: '#3380CC'
        }
      } >
      Sign up <
      /Text> <
      /TouchableOpacity> <
      /View> <
      /View>
    );
  }

  render() {
    return ( <
      AuthContainer modal = {
        {
          data: {
            header: this.state.modal.content.header,
            body: this.state.modal.content.body
          },
          visible: this.state.modal.state,
          handleModal: this.handleModal
        }
      }
      child = {
        this.renderPage()
      }
      />
    );
  }
}

const styles = StyleSheet.create({
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

export default connect(store => {
  return {
    state: store.states
  };
})(ForgotPassword);