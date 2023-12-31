import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  useWindowDimensions,
  Dimensions,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/colors';
import { useState, useEffect } from 'react';
import OutlineButton from '../components/UI/OutlineButton';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '../store/store';
import { loginUser } from '../slices/login/loginSlice';
import axios from "axios";
import { IUserLogin } from '../models/user';
//import React, {useState, useEffect} from 'react';

interface IButtonProps {
  children: any;
  onPress: () => void;
}



const LoginScreen: React.FunctionComponent = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const { width, height } = useWindowDimensions();
  let imageSize = 70;
  if (width < 380) {
    imageSize = 50;
  }
  if (height < 400) {
    imageSize = 40;
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };
  const [enteredEmail, setEnteredEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(enteredEmail);
  console.log(password);
  const [showPassword, setShowPassword] = useState(false);

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  /* useEffect (() => {
    const authenticate = async () => {
      axios
        .post(
          "";
        )
        .then((response) => {
          console.log(response);
        });

    }
    authenticate();
  }, []); */

  const handleFocusEmail = () => {
    setIsFocusedEmail(true);
  };

  const handleBlurEmail = () => {
    setIsFocusedEmail(false);
  };

  const handleFocusPassword = () => {
    setIsFocusedPassword(true);
  };

  const handleBlurPassword = () => {
    setIsFocusedPassword(false);
  };
  function getEmailHandler(enteredEmail: any) {
    setEnteredEmail(enteredEmail);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  async function loginHandler() {
    //await dispatch(loginUser());
    const Info: IUserLogin = {
      username: enteredEmail,
      password: password,
    };
    await dispatch(loginUser(Info)).then((e:any) => {
      console.log(e);
      //setLoading(false);
    });
  }
  async function registerHandler() {
    if (isButtonPressed) {
      setIsButtonPressed(false);
    } else {
      setIsButtonPressed(true);
    }
    navigation.navigate('Merchant Register');
  }
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
      <KeyboardAvoidingView style={styles.container} behavior='position'>
        <View style={styles.loginContainer}>
          <Text style={styles.welcome}>W E L C O M E !!</Text>
          <Text style={styles.subHeading}>Sign in to continue.</Text>
          <TextInput
            selectionColor='black'
            placeholderTextColor='#9097a6'
            style={[styles.input, isFocusedEmail && styles.focusedTextInput]}
            onChangeText={getEmailHandler}
            value={enteredEmail}
            placeholder='Enter phone no.'
            onFocus={handleFocusEmail}
            onBlur={handleBlurEmail}
            textAlign='center'
            inputMode='text'
            /* keyboardType='email-address' */
          />
          <View style={{ width: '90%' }}>
            <TextInput
              style={[
                styles.inputPassword,
                isFocusedPassword && styles.focusedTextInput,
              ]}
              placeholder='Enter your Password'
              autoCorrect={false}
              secureTextEntry={!showPassword} // Toggle secure text entry based on the state
              value={password}
              onBlur={() => handleBlurPassword()}
              onChangeText={(text) => setPassword(text)}
              onFocus={handleFocusPassword}
              textContentType='password'
              textAlign='center'
            />

            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                top: 15,
              }}
              onPress={togglePasswordVisibility}
            >
              <Ionicons
                style={styles.icon}
                name={showPassword ? 'eye' : 'eye-off'}
                size={18}
                color={Colors.primary500}
              />
              {/* <Text>{showPassword ? 'Hide' : 'Show'} Password</Text> */}
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 10 }}>
            <OutlineButton
              backgroundColor='#3400e8'
              direction='center'
              isButtonPressed={isButtonPressed}
              onPress={loginHandler}
            >
              LOGIN
            </OutlineButton>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={{ marginHorizontal: 5 }}>Don't have an account?</Text>
            <TouchableHighlight onPress={registerHandler}>
              <Text style={{ color: '#096bde', textDecorationLine: 'none' }}>
                Register
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    margin: 0,
    padding: 24,
    marginTop: (deviceHeight * 5) / 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: '#077113',
    overflow: 'hidden',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  topHeading: {
    fontWeight: 'bold',
    color: '#077113',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30,
  },
  welcome: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
  },
  subHeading: {
    marginBottom: 30,
    color: '#828893',
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    backgroundColor: '#E8F0FE',
    borderRadius: 4,
    width: '90%',
  },
  inputPassword: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    backgroundColor: '#E8F0FE',
    borderRadius: 4,
    width: '100%',
  },
  focusedTextInput: {
    borderColor: '#007aff', // Focused border color
  },
  bottomContainer: {
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
    color: 'black',
    marginTop: 2,
    fontSize: 30,
  },
});
