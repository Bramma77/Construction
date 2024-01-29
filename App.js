import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/Login';
import ManPower from './src/manPower';
import CustomDrawer from './src/CustomDrawer';
import { createDrawerNavigator } from "@react-navigation/drawer";
import 'react-native-gesture-handler';
import {View,TouchableOpacity,Text} from 'react-native';
import React,{useState,useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabNavigator from './src/TabNavigator';
import IonIcons from 'react-native-vector-icons/Ionicons';
import ViewSiteData from './src/ViewSitedata';
import NewArrivedMaterial from './src/NewArrivedMaterial';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProjectList from './src/Dashboard';
import SignUp from './src/SignUp';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { LogBox } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();


function LogoTitle(){
  const navigation = useNavigation();
  return(
  <View style={{ flexDirection: 'row', marginRight: 16 }}>
  <TouchableOpacity onPress={() => navigation.openDrawer()}>
    <Entypo name="menu" size={24} color="#fff" style={{ marginLeft: 20 }} />
  </TouchableOpacity>
</View>
  )

}
function Logoback(){
  const navigation = useNavigation();
  return(
  <View style={{ flexDirection: 'row', marginRight: 16 }}>
  <TouchableOpacity onPress={() =>   navigation.dispatch(
            CommonActions.reset({
              index: 1,
             
              routes: [
                { name: 'HomeScreen' 
               },

               ],
            })
          
          )}>
    <Entypo name="home" size={24} color="#fff" style={{ marginRight: 10 }} />
  </TouchableOpacity>
</View>
  )

}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Stacknavigator=({navigation,route})=>{
  const{item}=route.params;
  return(
  <Stack.Navigator
 
  initialRouteName='TabNavigator'


  screenOptions={{ headerShown: false ,
    headerTintColor: '#fff',
    headerShadowVisible:false,
    headerStyle: {
      backgroundColor: '#2f4f4f',
      
      
    },
  }}

  >
  
      <Stack.Screen
    name='TabNavigator'
    initialParams={{item}}
    component={TabNavigator}
   options={{
    title:"Add Site Data",
    contentStyle:{marginLeft:0},
    
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerLeft:(props) => <LogoTitle {...props}/>,
    headerRight:(props)=> <Logoback {...props}/>
   }}
    />

  </Stack.Navigator>
)};
const CustomHeader = ({ route }) => (
  <View>
    <Text>{route.params ? route.params.drawerLabel : 'Home'}</Text>
  </View>
);

const DrawerNavigator=({navigation,route})=>{
  const{item}=route.params;
  return(
    <Drawer.Navigator 
    drawerContent={props=><CustomDrawer {...props}/>

   } 
    screenOptions={{headerShown: true, 
      headerTintColor: '#fff',
    headerShadowVisible:false,
    headerStyle: {
      backgroundColor: '#2f4f4f',
      
      
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:22
    },
  
    }}>  
    <Drawer.Screen name='Home'initialParams={{item}} component={Stacknavigator}options ={{
      title:"Add Site Data",
     headerLeft:(props) => <LogoTitle {...props}/>,
       headerRight:(props) => <Logoback {...props}/>,
      
      drawerIcon:()=> <IonIcons name= 'home-outline'color={"#ff9900"} size={22}/>,
    
      drawerLabelStyle:{marginLeft:-20}}}
    />
   
     <Drawer.Screen name='View Site Data'initialParams={{item}} component={ViewSiteData}options ={({route})=>({
        headerLeft:(props) => <LogoTitle {...props}/>,
       headerRight:(props)=> <Logoback {...props}/>,
      drawerIcon:()=> <FontAwesome5 name= 'building'color={"#ff9900"} size={22}/>,
    
    drawerLabelStyle:{marginLeft:-20}})}
    />
      {/* <Drawer.Screen name='NewArrivedMaterial' initialParams={{item}} component={NewArrivedMaterial}options ={{drawerIcon:()=> <IonIcons name= 'home-outline'color={"#e6c402"} size={22}/>,
     drawerLabelStyle:{marginLeft:-20}}}
    /> */}
      <Drawer.Screen name='Expenditure' initialParams={{item}} component={Expenditure}options ={{drawerIcon:()=> <FontAwesome name= 'money' color={"#ff9900"} size={22}/>,
     headerLeft:(props) => <LogoTitle {...props}/>,
     headerRight:(props)=> <Logoback {...props}/>,
    drawerLabelStyle:{marginLeft:-20}}}
    />
      <Drawer.Screen name='View Expenditure' initialParams={{item}} component={ViewExpenditure}options ={{drawerIcon:()=> <FontAwesome5 name= 'list-alt'color={"#ff9900"} size={22}/>,
     headerLeft:(props) => <LogoTitle {...props}/>,
     headerRight:(props)=> <Logoback {...props}/>,
    drawerLabelStyle:{marginLeft:-20}}}
    />
   
     <Drawer.Screen name='Total Expenditure' initialParams={{item}} component={TotalAmount}options ={{drawerIcon:()=> <FontAwesome name= 'money'color={"#ff9900"} size={22}/>,
     headerLeft:(props) => <LogoTitle {...props}/>,
     headerRight:(props)=> <Logoback {...props}/>,
    drawerLabelStyle:{marginLeft:-20}}}
    />
      {/* <Drawer.Screen name='Add Material' initialParams={{item}} component={Quoat}options ={{drawerIcon:()=> <MaterialCommunityIcons name= 'soccer-field'color={"#ff9900"} size={26}/>,
     headerLeft:(props) => <LogoTitle {...props}/>,
     headerRight:(props)=> <Logoback {...props}/>,
    drawerLabelStyle:{marginLeft:-20}}}
    />
      <Drawer.Screen name='Add Floor' initialParams={{item}} component={FloorAmount}options ={{drawerIcon:()=> <MaterialCommunityIcons name= 'soccer-field'color={"#ff9900"} size={26}/>,
     headerLeft:(props) => <LogoTitle {...props}/>,
     headerRight:(props)=> <Logoback {...props}/>,
    drawerLabelStyle:{marginLeft:-20}}}
    />
      <Drawer.Screen name='Additional Work' initialParams={{item}} component={AdditionalWork}options ={{drawerIcon:()=> <MaterialCommunityIcons name= 'soccer-field'color={"#ff9900"} size={26}/>,
     headerLeft:(props) => <LogoTitle {...props}/>,
     headerRight:(props)=> <Logoback {...props}/>,
    drawerLabelStyle:{marginLeft:-20}}}
    />
      <Drawer.Screen name='Quote Share' initialParams={{item}} component={Pdfs}options ={{drawerIcon:()=> <FontAwesome6 name= 'trowel-bricks'color={"#ff9900"} size={22}/>,
     headerLeft:(props) => <LogoTitle {...props}/>,
     headerRight:(props)=> <Logoback {...props}/>,
    drawerLabelStyle:{marginLeft:-20}}}
    />
      <Drawer.Screen name='Invoice Item' initialParams={{item}} component={InvoiceItem}options ={{drawerIcon:()=> <FontAwesome6 name= 'trowel-bricks'color={"#ff9900"} size={22}/>,
     headerLeft:(props) => <LogoTitle {...props}/>,
     headerRight:(props)=> <Logoback {...props}/>,
    drawerLabelStyle:{marginLeft:-20}}}
    />
     <Drawer.Screen name='Invoice Share' initialParams={{item}} component={Invoiceshare}options ={{drawerIcon:()=> <FontAwesome6 name= 'trowel-bricks'color={"#ff9900"} size={22}/>,
     headerLeft:(props) => <LogoTitle {...props}/>,
     headerRight:(props)=> <Logoback {...props}/>,
    drawerLabelStyle:{marginLeft:-20}}}
    /> */}
    
     {/* <Drawer.Screen name='Dashboard' component={ProjectList}options ={{drawerIcon:()=> <IonIcons name= 'home-outline'color={"#e6c402"} size={22}/>,
     drawerLabelStyle:{marginLeft:-20}}}
    /> */}

 </Drawer.Navigator>

  )
};


import auth from '@react-native-firebase/auth';
import AddProject from './src/AddProject';
import Expenditure from './src/Expenditure';
import ViewExpenditure from './src/ViewExpenditure';
import Invoice from './src/Pdf';
import Pdf from './src/Pdf';
import TotalAmount from './src/TotalAmount';
import Pdfs from './src/Pdf';
import Quoat from './src/AddMaterial';
import Invoiceshare from './src/Invoiceshare';
import FloorAmount from './src/FloorAmount';
import AdditionalWork from './src/AdditionalWorks';
import InvoiceItem from './src/InvoiceItem';
import HomeScreen from './src/HomeScreen';
import QuoteView from './src/Quoteflow/QuoteView';

import Quotegenerator from './src/Quoteflow/Pdfgenerater';
import InvoiceGenerator from './src/Quoteflow/Invoicegenerator';
import InvoiceEntry from './src/Quoteflow/InvoiceEntry';
import InvoiceView from './src/Quoteflow/InvoiceView';

const App=()=>{
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(authUser => {
      setUser(authUser);
      console.log
      if (initializing) {
        setInitializing(false);
      }
    });
  

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [initializing]);

  if (initializing) {
    return null; // Render loading spinner or splash screen while initializing
  }
  const route=user?'HomeScreen':'Login'
  return(
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator
       initialRouteName= {route}
      >
      <Stack.Screen
        name='projectList'
        component={ProjectList}
        options={{headerShown:false}}
        />
         <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{headerShown:false}}
        />
         <Stack.Screen
        name='Quotegenerator'
        component={Quotegenerator}
        options={{headerShown:true,
        
          headerTintColor:'white',
          title:'Quote Share',
          headerStyle:{
            backgroundColor:'#2f4f4f'
            
            
          }
     
        }}
        />
        <Stack.Screen
        name='InvoiceEntry'
        component={InvoiceEntry}
        options={{headerShown:true,
        
          headerTintColor:'white',
          title:'Invoice Item',
          headerStyle:{
            backgroundColor:'#2f4f4f'
            
            
          }
     
        }}
        />
         <Stack.Screen
        name='Invoicegenerator'
        component={InvoiceGenerator}
        options={{headerShown:true,
        
          headerTintColor:'white',
          title:'Invoice',
          headerStyle:{
            backgroundColor:'#2f4f4f'
            
            
          }
     
        }}
      
        />
        
        
          <Stack.Screen
        name='QuoteView'
        component={QuoteView}
        options={{headerShown:true,
        
          headerTintColor:'white',
          headerStyle:{
            backgroundColor:'#2f4f4f'
            
            
          }
     
        }}
        />
        
        <Stack.Screen
        name='InvoiceView'
        component={InvoiceView}
        options={{headerShown:true,
        
          headerTintColor:'white',
          headerStyle:{
            backgroundColor:'#2f4f4f'
            
            
          }
     
        }}
        />
   
      <Stack.Screen
      name='Login'
      component={LoginScreen}
      options={{headerShown:false}}
   />
  
     <Stack.Screen
      name='SignUp'
      component={SignUp}
      options={{headerShown:false}}
   />
    <Stack.Screen
      name='AddProject'
      component={AddProject}
      options={{headerShown:false}}
   />
        <Stack.Screen
        name='Drawer'
        options={{headerShown:false}}
        component={DrawerNavigator}
        />
      </Stack.Navigator>
     
    </NavigationContainer>
    </SafeAreaProvider>
    
  )
}


export default App;