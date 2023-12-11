import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/Login';
import ManPower from './src/manPower';
import CustomDrawer from './src/CustomDrawer';
import { createDrawerNavigator } from "@react-navigation/drawer";
import 'react-native-gesture-handler';
import {View,TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabNavigator from './src/TabNavigator';
import IonIcons from 'react-native-vector-icons/Ionicons';
import ViewSiteData from './src/ViewSitedata';


function LogoTitle(){
  const navigation = useNavigation();
  return(
  <View style={{ flexDirection: 'row', marginRight: 16 }}>
  <TouchableOpacity onPress={() => navigation.openDrawer()}>
    <Entypo name="menu" size={24} color="black" style={{ marginRight: 0 }} />
  </TouchableOpacity>
</View>
  )

}


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Stacknavigator=()=>{
  return(
  <Stack.Navigator
  initialRouteName='TabNavigator'
  

  screenOptions={{ headerShown: true ,
    headerTintColor: '#fff',
    headerShadowVisible:false,
    headerStyle: {
      backgroundColor: '#2f4f4f',
      
      
    },
  }}

  >
    <Stack.Screen
    name='Login'
    component={LoginScreen}
    options={{headerShown:false}}
   />
      <Stack.Screen
    name='TabNavigator'
    component={TabNavigator}
   options={{
    title:"Home",
    contentStyle:{marginLeft:0},
    
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerLeft:(props) => <LogoTitle {...props} />
   }}
    />

  </Stack.Navigator>
)};

const App=()=>{
  return(
    <SafeAreaProvider>
    <NavigationContainer>
       <Drawer.Navigator 
         drawerContent={props=><CustomDrawer {...props}/>
   
        } 
         screenOptions={{headerShown: false, 
       
         }}>  
         <Drawer.Screen name='Home' component={Stacknavigator}options ={{drawerIcon:()=> <IonIcons name= 'home-outline'color={"#e6c402"} size={22}/>,
          drawerLabelStyle:{marginLeft:-20}}}
         />
          <Drawer.Screen name='ViewSiteData' component={ViewSiteData}options ={{drawerIcon:()=> <IonIcons name= 'home-outline'color={"#e6c402"} size={22}/>,
          drawerLabelStyle:{marginLeft:-20}}}
         />
    
      </Drawer.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
    
  )
}


export default App;