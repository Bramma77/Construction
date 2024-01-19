
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,ToastAndroid } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import { CommonActions, StackActions } from '@react-navigation/native';


const SignUp = ({navigation}) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordInputFocused, setPasswordInputFocused] = useState(false);
  const [errortext, setErrortext] = useState("");

  const onSubmit = (data) => {
    // Perform login logic with the form data
    console.log(data);
  };
  const handleSubmitButton = (data) => {
    // setErrortext("");
   // if (!userName) return alert("Please fill Name");
    if (!data.email) return alert("Please fill Email");
    if (!data.password) return alert("Please fill Address");

    auth()
      .createUserWithEmailAndPassword(
        data.email,
        data.password
      )
      .then((user) => {

        console.log(
          "Registration Successful. Please Login to proceed"
        );
        console.log(user.user);
        if (user) {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
             
              routes: [
                { name: 'projectList' 
               },

               
              ],
            })
          
          );
        
         //    navigation.dispatch(StackActions.popToTop("projectList"));
           
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
         
            ToastAndroid.show( "That email address is already in use!", ToastAndroid.SHORT);
           
          
        } else {
          setErrortext(error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../Construction.jpg')} style={styles.logo}/>
      <Text style={{textAlign:'center',fontSize:36,color:'white',fontWeight:'bold',marginTop:0}}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9b9b9b"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
          defaultValue=""
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
        <View style={styles.passwordContainer}>
        <Controller
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#9b9b9b"
              secureTextEntry={!isPasswordVisible}
              onFocus={() => setPasswordInputFocused(true)}
              onBlur={() => setPasswordInputFocused(false)}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
          defaultValue=""
        />
        {isPasswordInputFocused &&
         <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setPasswordVisible(!isPasswordVisible)}
          >
            <Feather
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#9b9b9b"
            />
          </TouchableOpacity>
           }
        </View>

        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(handleSubmitButton)}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>
      <View style={{flexDirection:'row',marginTop:80}}>
        <Text style={{fontSize:15,color:'white'}}>Already have account?</Text>
        <TouchableOpacity style={{marginLeft:10}} onPress={()=>navigation.goBack()}>
        <Text style={{fontSize:15,color:'white'}}>Login</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f4f4f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 200,
    alignSelf:'center',
    marginTop:0,
    marginBottom:60
  },
  inputContainer: {
    width: '80%',
    marginTop:50,
    marginBottom:50
  },
  input: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    color: '#fff',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eyeButton: {
    padding: 10,
    marginLeft:-44
  },
  loginButton: {
    height: 50,
    borderRadius: 10,
    marginTop:20,
    backgroundColor: '#ff9900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default SignUp;