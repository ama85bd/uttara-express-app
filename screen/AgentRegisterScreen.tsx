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

const AgentRegisterScreen: React.FunctionComponent = () => {
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

  const [genderOpen, setGenderOpen] = useState(false);
  const [officeOpen, setOfficeOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [officeValue, setOfficeValue] = useState(null);
  const [gender, setGender] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ]);
  const [companyList, setCompanyList] = useState([
    { companyName: 'Office1', id: 'Office1' },
    { companyName: 'Office2', id: 'Office2' },
    { companyName: 'Office3', id: 'Office3' },
  ]);
  const onGenderOpen = useCallback(() => {
    setOfficeOpen(false);
  }, []);
  const onOfficeOpen = useCallback(() => {
    setGenderOpen(false);
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
              Registration Form {' '}
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
                placeholder='*Agent or business name'
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
            <Text style={{ color: 'red' }}>*Agent or business name is required.</Text>
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
                placeholder='*Contact person'
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
            <Text style={{ color: 'red' }}>*Contact person name is required.</Text>
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
                placeholder='*Contact Number'
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
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isFocusedDesignation && styles.focusedTextInput,
                ]}
                placeholder='*Office address'
                onBlur={() => {
                  onBlur();
                  handleBlurDesignation();
                }}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocusDesignation}
                textAlign='center'
                inputMode='text'
              />
            )}
            name='designation'
          />
          {errors.designation && (
            <Text style={{ color: 'red' }}>*Office address is required.</Text>
          )}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isFocusedDesignation && styles.focusedTextInput,
                ]}
                placeholder='*Store address'
                onBlur={() => {
                  onBlur();
                  handleBlurDesignation();
                }}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocusDesignation}
                textAlign='center'
                inputMode='text'
              />
            )}
            name='storageaddress'
          />


          <Controller
            name='gender'
            defaultValue=''
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <View style={styles.dropdownGender}>
                <DropDownPicker
                  style={styles.dropdown}
                  open={genderOpen}
                  value={genderValue} //genderValue
                  items={gender}
                  setOpen={setGenderOpen}
                  setValue={setGenderValue}
                  setItems={setGender}
                  placeholder='*Select District'
                  placeholderStyle={styles.placeholderStyles}
                  onOpen={onGenderOpen}
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
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isFocusedDesignation && styles.focusedTextInput,
                ]}
                placeholder='Side Note'
                onBlur={() => {
                  onBlur();
                  handleBlurDesignation();
                }}
                onChangeText={onChange}
                value={value}
                onFocus={handleFocusDesignation}
                textAlign='center'
                inputMode='text'
              />
            )}
            name='designation'
          />
          {errors.designation && (
            <Text style={{ color: 'red' }}> </Text>
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

//export default RegisterScreen;
export default AgentRegisterScreen;

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
