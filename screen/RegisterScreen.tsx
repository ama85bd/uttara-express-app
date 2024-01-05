import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableHighlight,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Colors } from '../constants/colors';
import { useCallback, useState } from 'react';
import OutlineButton from '../components/UI/OutlineButton';
import { useForm, Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import { IMerchantRegister } from '../models/user';
import { useAppDispatch } from '../store/store';
import showToast from '../utils/Toast';
import { useNavigation } from '@react-navigation/native';
import { merchantRegisterAsync } from '../slices/register/merchantRegisterSlice';

const RegisterScreen: React.FunctionComponent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({ mode: 'onChange' });
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  const [registerFor, setRegisterFor] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checkPassword, setCheckPassword] = useState('');

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedContactNumber, setIsFocusedContactNumber] = useState(false);
  const [isFocusedLoginName, setIsFocusedLoginName] = useState(false);

  const [isFocusedFullName, setIsFocusedFullName] = useState(false);
  const [isFocusedDesignation, setIsFocusedDesignation] = useState(false);
  const [isFocusedCompany, setIsFocusedCompany] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedCheckPassword, setIsFocusedCheckPassword] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const [districtOpen, setDistrictOpen] = useState(false);
  const [districtValue, setDistrictValue] = useState(null);
  const [district, setDistrict] = useState([
    { label: 'Dhaka City', value: 'dhaka' },
    { label: 'Narayangong', value: 'narayangong' },
    { label: 'Gazipur', value: 'gazipur' },
  ]);

  const [policeOpen, setPoliceOpen] = useState(false);
  const [policeValue, setPoliceValue] = useState(null);
  const [police, setPolice] = useState([
    { label: 'Uttara East', value: 'uttaraeast' },
    { label: 'Uttara West', value: 'uttarawest' },
    { label: 'Dhanmondi', value: 'dhanmondi' },
  ]);

  const onDistrictOpen = useCallback(() => {
    setPoliceOpen(false);
  }, []);

  const onPoliceOpen = useCallback(() => {
    setDistrictOpen(false);
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleUserType = (userType: any) => {
    setRegisterFor(userType);
    handleClose();
  };

  //Full Name
  const handleFocusFullName = () => {
    setIsFocusedFullName(true);
  };

  const handleBlurFullName = () => {
    setIsFocusedFullName(false);
  };

  //Designation
  const handleFocusDesignation = () => {
    setIsFocusedDesignation(true);
  };

  const handleBlurDesignation = () => {
    setIsFocusedDesignation(false);
  };

  //Admin Company Designation
  const handleFocusCompany = () => {
    setIsFocusedCompany(true);
  };

  const handleBlurCompany = () => {
    setIsFocusedCompany(false);
  };

  //Email

  const handleFocusEmail = () => {
    setIsFocusedEmail(true);
  };

  const handleBlurEmail = () => {
    setIsFocusedEmail(false);
  };

  //Contact Number
  const handleFocusContactNumber = () => {
    setIsFocusedContactNumber(true);
  };

  const handleBlurContactNumber = () => {
    setIsFocusedContactNumber(false);
  };

  //Login Name
  const handleBlurLoginName = () => {
    setIsFocusedLoginName(false);
  };

  const handleFocusLoginName = () => {
    setIsFocusedLoginName(true);
  };

  //Password
  const handleFocusPassword = () => {
    setIsFocusedPassword(true);
  };

  const handleBlurPassword = () => {
    setIsFocusedPassword(false);
  };
  const handleFocusCheckPassword = () => {
    setIsFocusedCheckPassword(true);
  };

  const handleBlurCheckPassword = () => {
    setIsFocusedCheckPassword(false);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    const Info: IMerchantRegister = {
      name: data.name,
      contactperson: data.contactPerson,
      contact: data.contactNumber,
      loginname: data.loginName,
      facebookpagelink: data.pageLink,
      district: data.district,
      policestationthana: data.police,
      address: data.address,
      password: data.password,
    };
    console.log(Info);

    dispatch(merchantRegisterAsync({ user: Info })).then((e) => {
      if (e.payload) {
        console.log(e.payload);
        showToast('success', 'Register Success!');
        reset();
        navigation.navigate('Login');
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps='handled'
      style={styles.container}
    >
      <KeyboardAvoidingView style={styles.container} enabled behavior='padding'>
        <View style={styles.loginContainer}>
          <View>
            <Text style={styles.registration}>
              Merchant Registration Form
              <Text style={{ color: 'red' }}>*{registerFor}</Text>
            </Text>
          </View>

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isFocusedFullName && styles.focusedTextInput,
                ]}
                placeholder='*Merchand or Company Name'
                onBlur={() => {
                  onBlur();
                  handleBlurFullName();
                }}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocusFullName}
                textAlign='left'
                inputMode='text'
              />
            )}
            name='name'
          />
          {errors.name && (
            <Text style={{ color: 'red' }}>*Merchand or Company Name.</Text>
          )}

          <Controller
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isFocusedFullName && styles.focusedTextInput,
                ]}
                placeholder='Contact Person'
                onBlur={() => {
                  onBlur();
                  handleBlurFullName();
                }}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocusFullName}
                textAlign='left'
                inputMode='text'
              />
            )}
            name='contactPerson'
          />

          <Controller
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^([+]\d{2})?\d{11}$/,

                // /^[+-]?\d{1,18}(\.\d{1,2})?$/,
                // /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/,
                message: 'Please enter a valid contact number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isFocusedContactNumber && styles.focusedTextInput,
                ]}
                placeholder='*Contact No.'
                onBlur={() => {
                  onBlur();
                  handleBlurContactNumber();
                }}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocusContactNumber}
                textAlign='left'
                inputMode='decimal'
              />
            )}
            name='contactNumber'
          />
          {errors.contactNumber && (
            <Text style={{ color: 'red' }}>
              *Please enter a valid contact number
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^([+]\d{2})?\d{11}$/,

                // /^[+-]?\d{1,18}(\.\d{1,2})?$/,
                // /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/,
                message: 'Please enter a valid contact number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isFocusedLoginName && styles.focusedTextInput,
                ]}
                placeholder='*Phone no. as a login name'
                onBlur={() => {
                  onBlur();
                  handleBlurLoginName();
                }}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocusLoginName}
                textAlign='left'
                inputMode='decimal'
              />
            )}
            name='loginName'
          />
          {errors.loginName && (
            <Text style={{ color: 'red' }}>
              *Please enter a valid contact number
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ width: '90%' }}>
                <TextInput
                  style={[
                    styles.inputPassword,
                    isFocusedPassword && styles.focusedTextInput,
                  ]}
                  placeholder=' *Password'
                  autoCorrect={false}
                  secureTextEntry={!showPassword} // Toggle secure text entry based on the state
                  value={value}
                  onBlur={() => {
                    onBlur();
                    handleBlurPassword();
                  }}
                  onChangeText={(text) => {
                    onChange(text);
                    setPassword(text);
                  }}
                  onFocus={handleFocusPassword}
                  textContentType='password'
                  textAlign='left'
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
            )}
            name='password'
          />
          {errors.password && (
            <Text style={{ color: 'red' }}>*Please enter a valid password</Text>
          )}

          <Controller
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isFocusedFullName && styles.focusedTextInput,
                ]}
                placeholder='Page Link'
                onBlur={() => {
                  onBlur();
                  handleBlurFullName();
                }}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocusFullName}
                textAlign='left'
                inputMode='text'
              />
            )}
            name='pageLink'
          />

          <Controller
            name='district'
            defaultValue=''
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange } }) => (
              <View style={styles.dropdownGender}>
                <DropDownPicker
                  searchable={true}
                  style={styles.dropdown}
                  open={districtOpen}
                  value={districtValue} //genderValue
                  items={district}
                  setOpen={setDistrictOpen}
                  setValue={setDistrictValue}
                  setItems={setDistrict}
                  placeholder='Select District'
                  placeholderStyle={styles.placeholderStyles}
                  onOpen={onDistrictOpen}
                  onChangeValue={onChange}
                  zIndex={3000}
                  zIndexInverse={1000}
                  labelStyle={{ textAlign: 'left' }}
                  listMode='MODAL'
                />
              </View>
            )}
          />

          <Controller
            name='police'
            defaultValue=''
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange } }) => (
              <View style={styles.dropdownGender}>
                <DropDownPicker
                  searchable={true}
                  style={styles.dropdown}
                  open={policeOpen}
                  value={policeValue} //genderValue
                  items={police}
                  setOpen={setPoliceOpen}
                  setValue={setPoliceValue}
                  setItems={setPolice}
                  placeholder='Select Police Station'
                  placeholderStyle={styles.placeholderStyles}
                  onOpen={onPoliceOpen}
                  onChangeValue={onChange}
                  zIndex={3000}
                  zIndexInverse={1000}
                  labelStyle={{ textAlign: 'left' }}
                  listMode='MODAL'
                />
              </View>
            )}
          />

          <Controller
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isFocusedFullName && styles.focusedTextInput,
                ]}
                placeholder='Address'
                onBlur={() => {
                  onBlur();
                  handleBlurFullName();
                }}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocusFullName}
                textAlign='left'
                inputMode='text'
              />
            )}
            name='address'
          />

          <View style={{ marginTop: 20 }}>
            <OutlineButton
              backgroundColor='#3400e8'
              direction='left'
              isButtonPressed={isButtonPressed}
              icon='save-sharp'
              onPress={handleSubmit(onSubmit)}
            >
              SUBMIT
            </OutlineButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  modalSubHeader: {
    fontSize: 16,
  },
  loginContainer: {
    flex: 1,
    margin: 0,
    padding: 24,
    paddingTop: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: Colors.primary800,
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
  registration: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
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
    backgroundColor: '#f1f2f4',
    borderRadius: 4,
    width: '90%',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#9f9e9e',
  },
  inputPassword: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    backgroundColor: '#f1f2f4',
    borderRadius: 4,
    width: '100%',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#9f9e9e',
  },
  focusedTextInput: {
    borderColor: '#007aff', // Focused border color
  },
  bottomContainer: {
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: 8,
    justifyContent: 'flex-end',
  },
  dropdownGender: {
    marginHorizontal: 10,
    width: '90%',
    marginVertical: 5,
  },
  dropdown: {
    borderColor: '#9f9e9e',
    height: 50,
    textAlign: 'center',
    borderWidth: 1,
    backgroundColor: '#f1f2f4',
    borderRadius: 4,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  placeholderStyles: {
    color: '#605f5f',
    textAlign: 'left',
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
    color: 'black',
    marginTop: -4,
    fontSize: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  imagePreview: {
    width: 180,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
    borderColor: '#078da8',
    overflow: 'hidden',
  },
});
