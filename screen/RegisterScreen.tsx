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

const RegisterScreen: React.FunctionComponent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ mode: 'onChange' });

  const [registerFor, setRegisterFor] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checkPassword, setCheckPassword] = useState('');

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedContactNumber, setIsFocusedContactNumber] = useState(false);

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

  const onSubmit = () => {};

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
                placeholder='*Phonr no. for login'
                onBlur={() => {
                  onBlur();
                  handleBlurContactNumber();
                }}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocusContactNumber}
                textAlign='center'
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
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{6,12}$)/,
                message: 'Please enter a valid password',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ width: '90%' }}>
                <TextInput
                  style={[
                    styles.inputPassword,
                    isFocusedPassword && styles.focusedTextInput,
                  ]}
                  placeholder=' *Enter a Password'
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
            )}
            name='password'
          />
          {errors.password && (
            <Text style={{ color: 'red' }}>*Please enter a valid password</Text>
          )}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isFocusedFullName && styles.focusedTextInput,
                ]}
                placeholder='*Business / Page Name'
                onBlur={() => {
                  onBlur();
                  handleBlurFullName();
                }}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocusFullName}
                textAlign='center'
                inputMode='text'
              />
            )}
            name='fullName'
          />
          {errors.fullName && (
            <Text style={{ color: 'red' }}>
              *Business / Page name is required.
            </Text>
          )}

          <Controller
            control={control}
            rules={{ required: true }}
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
                textAlign='center'
                inputMode='text'
              />
            )}
            name='fullName'
          />
          {errors.fullName && <Text style={{ color: 'red' }}> </Text>}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isFocusedFullName && styles.focusedTextInput,
                ]}
                placeholder='*Contact person name'
                onBlur={() => {
                  onBlur();
                  handleBlurFullName();
                }}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocusFullName}
                textAlign='center'
                inputMode='text'
              />
            )}
            name='fullName'
          />
          {errors.fullName && (
            <Text style={{ color: 'red' }}>
              *Contact person name is required.
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
                  isFocusedContactNumber && styles.focusedTextInput,
                ]}
                placeholder='*Contact number'
                onBlur={() => {
                  onBlur();
                  handleBlurContactNumber();
                }}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocusContactNumber}
                textAlign='center'
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
            name='district'
            defaultValue=''
            control={control}
            rules={{ required: true }}
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
                  placeholder='*Select District'
                  placeholderStyle={styles.placeholderStyles}
                  onOpen={onDistrictOpen}
                  onChangeValue={onChange}
                  zIndex={3000}
                  zIndexInverse={1000}
                  labelStyle={{ textAlign: 'center' }}
                  listMode='MODAL'
                />
              </View>
            )}
          />
          {errors.gender && (
            <Text style={{ color: 'red' }}>*District is required.</Text>
          )}

          <Controller
            name='police'
            defaultValue=''
            control={control}
            rules={{ required: true }}
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
                  placeholder='*Select Police Station'
                  placeholderStyle={styles.placeholderStyles}
                  onOpen={onPoliceOpen}
                  onChangeValue={onChange}
                  zIndex={3000}
                  zIndexInverse={1000}
                  labelStyle={{ textAlign: 'center' }}
                  listMode='MODAL'
                />
              </View>
            )}
          />
          {errors.gender && (
            <Text style={{ color: 'red' }}>*Police station is required.</Text>
          )}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isFocusedFullName && styles.focusedTextInput,
                ]}
                placeholder='*Address'
                onBlur={() => {
                  onBlur();
                  handleBlurFullName();
                }}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocusFullName}
                textAlign='center'
                inputMode='text'
              />
            )}
            name='fullName'
          />
          {errors.fullName && (
            <Text style={{ color: 'red' }}>*Address is required.</Text>
          )}

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
    borderColor: '#262525',
    height: 50,
    textAlign: 'center',
    borderWidth: 1,
    backgroundColor: '#E8F0FE',
    borderRadius: 4,
  },
  placeholderStyles: {
    color: '#605f5f',
    textAlign: 'center',
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
    color: 'black',
    marginTop: 2,
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
