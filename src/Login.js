
 import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,ToastAndroid,Animated, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {  Menu,Portal,Dialog,Button, Divider, Provider, } from 'react-native-paper'
import { responsiveWidth } from 'react-native-responsive-dimensions';


const LoginScreen = ({navigation}) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordInputFocused, setPasswordInputFocused] = useState(false);
  const[Forgotpassword,setForgotpassword]=useState("");
  const[Show,setShow]=useState(false);


  const handleResetPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(Forgotpassword);
    //  Alert.alert('Password Reset Email Sent', 'Check your email to reset your password.');
    ToastAndroid.show( 'Password Reset Email Sent Check your email to reset your password.', ToastAndroid.SHORT);
    setShow(false)

    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      ToastAndroid.show( 'Error Failed to send password reset email. Please try again.', ToastAndroid.SHORT);
     // Alert.alert('Error', 'Failed to send password reset email. Please try again.');
    }
  };

  const handleSubmitButton = (data) => {
    // setErrortext("");
   // if (!userName) return alert("Please fill Name");
    if (!data.email) return alert("Please fill Email");
    if (!data.password) return alert("Please fill Address");

    auth()
      .signInWithEmailAndPassword(
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
                { name: 'HomeScreen' 
               },

               
              ],
            })
          
          );
          // navigation.dispatch({ type:'RESET',payload:{
          //   index: 1,
          //   routes: [{ name: 'projectList' }]
          // }
          // })
          // navigation.dispatch(
          //   CommonActions.reset({
          //       index: 1,
          //       routes: [{ name: 'projectList' }],
          //   })
          // )
         
        
         //    navigation.dispatch(StackActions.popToTop("projectList"));
           
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
         
            ToastAndroid.show( "That email address is already in use!", ToastAndroid.SHORT);
           
          
        } else {
          ToastAndroid.show( `${error.message}`, ToastAndroid.SHORT);
        //  setErrortext(error.message);
        }
      });
  };
  const animatedValue = new Animated.Value(0)
  const[SlideInLeft,setSlideInLeft]=useState(new Animated.Value(0))

  const animatedValueInterpolateScale = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.95]
  })
  useEffect(()=>{
    Animated.timing(SlideInLeft, {
        toValue: 1,
        duration: 1100,
        useNativeDriver: true
      }).start();
},[]);

  return (
    <Provider>
            
    <Portal>
    <Dialog visible={Show} onDismiss={()=>setShow(false)} >
                 <Dialog.Title style={{fontSize:17,color:'black'}}>Reset Password!</Dialog.Title>
                 <Dialog.Content>
                <TextInput
                  placeholder="Type email..."
                 value={Forgotpassword}
                 onChangeText={(value)=>setForgotpassword(value)}
                  style={{ borderWidth: 1, borderColor: '#ccc', padding: 8,marginTop:10,marginBottom:10 }}
                />

<TouchableOpacity onPress={handleResetPassword}>
                <View style={{padding:10,marginLeft:responsiveWidth(10),marginTop:20,marginRight:responsiveWidth(10),
                    borderWidth:0,borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:'#ff9900'}}>
                    <Text style={{fontSize:15,color:'white'}}>Submit</Text>
                </View>
                </TouchableOpacity>

                </Dialog.Content>
             </Dialog>
             </Portal>
    <View style={styles.container}>
      <Image source={require('./const12.png')} style={styles.logo}/>
      <Text style={{textAlign:'center',fontSize:36,color:'white',fontWeight:'bold',marginTop:40}}>Login</Text>
     
      <Animated.View style={{flex:1,backgroundColor:'white',alignItems:'center',marginTop:50,borderRadius:20,elevation:20,
    transform: [
      {
        translateY: SlideInLeft.interpolate({
          inputRange: [0, 1],
          outputRange: [600, 0]
        })
      }
    ],
    }}>
      <View style={styles.inputContainer}>
      
      <View style={styles.passwordContainer}>
        <TouchableOpacity
          style={styles.EmailIcon}
         
        >
          <Entypo
            name={'mail'}
            size={20}

            color="#2f4f4f"
          />
        </TouchableOpacity>
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
              style={styles.passwordInput}
              placeholder="Email"
              placeholderTextColor="#9b9b9b"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
          defaultValue=""
        />
         </View>
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
       
        <View style={styles.passwordContainer}>
        <TouchableOpacity
          style={styles.EmailIcon}
         
        >
          <Entypo
            name={'lock'}
            size={20}

            color="#2f4f4f"
          />
        </TouchableOpacity>
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
        <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={()=>setShow(true)}>
        <Text style={{fontSize:15,color:'black',alignSelf:'flex-end'}}>Forgot Password?</Text>
        </TouchableOpacity>
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(handleSubmitButton)}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      <View style={{flexDirection:'row',marginTop:80}}>
        <Text style={{fontSize:14,color:'black'}}>Don't have account?</Text>
        <TouchableOpacity style={{marginLeft:10}} onPress={()=>navigation.navigate('SignUp')}>
        <Text style={{fontSize:15,color:'black'}}>SignUp</Text>
        </TouchableOpacity>
        </View>
      </View>
      </Animated.View>
    </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f4f4f',
     justifyContent: 'center',
    // alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 200,
    alignSelf:'center',
    marginTop:30,
    marginBottom:0
  },
  inputContainer: {
    width: '80%',
    marginTop:50,
    marginBottom:0,
    borderWidth:0,
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
    paddingHorizontal: 45,
    fontSize: 16,
    color: 'black',
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
    color:'black',
    padding: 10,
    marginLeft:-44
  },
  EmailIcon: {
    color:'black',
    padding: 10,
  marginRight:-44
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

export default LoginScreen;