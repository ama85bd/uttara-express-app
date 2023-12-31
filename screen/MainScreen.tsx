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
import { useEffect, useState } from 'react';
import OutlineButton from '../components/UI/OutlineButton';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '../store/store';
import { loginUser } from '../slices/login/loginSlice';
import { IUserLogin } from '../models/user';

interface IButtonProps {
  children: any;
  onPress: () => void;
}
const MainScreen: React.FunctionComponent = () => {
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

  let homeImage = 200;
  if (width < 1680) {
    homeImage = 100;
  }
  if (height < 1600) {
    homeImage = 100;
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  const homeImageStyle = {
    width: 200,
    height: 100,
    borderWidth: 0,
    //borderRadius: imageSize / 2,
  };

  const [enteredEmail, setEnteredEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

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
    if (isButtonPressed) {
      setIsButtonPressed(false);
    } else {
      setIsButtonPressed(true);
    }
    navigation.navigate('Login');
  }

  async function mainHandler() {
    navigation.navigate('Main Page');
  }
  async function registerHandler() {
    if (isButtonPressed) {
      setIsButtonPressed(false);
    } else {
      setIsButtonPressed(true);
    }
    navigation.navigate('Merchant Register');
  }
  async function agentRegisterHandler() {
    if (isButtonPressed) {
      setIsButtonPressed(false);
    } else {
      setIsButtonPressed(true);
    }
    navigation.navigate('Agent Register');
  }
  async function riderRegisterHandler() {
    if (isButtonPressed) {
      setIsButtonPressed(false);
    } else {
      setIsButtonPressed(true);
    }
    navigation.navigate('Rider Register');
  }

  async function loginUserHandler() {
    setLoading(true);
    const Info: IUserLogin = {
      username: 'Admin',
      password: '123456',
    };
    await dispatch(loginUser(Info)).then((e) => {
      setLoading(false);
    });
  }

  // useEffect(() => {
  //   loginUserHandler();
  // }, []);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
      <KeyboardAvoidingView style={styles.container} behavior='position'>
        <View style={styles.loginContainer}>
          <View style={[styles.imageContainer, homeImageStyle]}>
            <Image
              style={styles.image}
              //source={require('../assets/images/logo-circle.png')}
              source={require('../assets/images/uttara_express_logo.png')}
            />
          </View>
          <Text style={styles.welcome}>UTTARA EXPRESS</Text>
          <Text style={styles.subHeading}>Fast delivery service in BD</Text>
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
          <View style={{ marginTop: 5 }}>
            <OutlineButton
              backgroundColor='#3400e8'
              direction='center'
              isButtonPressed={isButtonPressed}
              onPress={registerHandler}
            >
              MERCHANT SIGNUP
            </OutlineButton>
          </View>
          <View style={{ marginTop: 5 }}>
            <OutlineButton
              backgroundColor='#3400e8'
              direction='center'
              isButtonPressed={isButtonPressed}
              onPress={agentRegisterHandler}
            >
              AGENT REGISTRATION
            </OutlineButton>
          </View>
          <View style={{ marginTop: 5 }}>
            <OutlineButton
              backgroundColor='#3400e8'
              direction='center'
              isButtonPressed={isButtonPressed}
              onPress={riderRegisterHandler}
            >
              RIDER REGISTRATION
            </OutlineButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default MainScreen;
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
