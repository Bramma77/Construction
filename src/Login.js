
 import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Feather from 'react-native-vector-icons/Feather';

const LoginScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordInputFocused, setPasswordInputFocused] = useState(false);

  const onSubmit = (data) => {
    // Perform login logic with the form data
    console.log(data);
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('./Images/truss.png')} style={styles.logo}/> */}
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
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
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
    width: 100,
    height: 100,
    alignSelf:'center',
  },
  inputContainer: {
    width: '80%',
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

export default LoginScreen;