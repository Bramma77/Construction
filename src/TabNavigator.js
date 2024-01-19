import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ManPower from './manPower';
import Materials from './Materials';
import Workreport from './Workreport';
const Tab = createMaterialTopTabNavigator();

const TabNavigator=({route,navigation})=>{
  const{item}=route.params;
    return(
        <Tab.Navigator
        
        screenOptions={{
            tabBarLabelStyle: { fontSize: 12 ,elevation:0},
          // tabBarItemStyle: { width: 100, },
          tabBarScrollEnabled:true,
            tabBarInactiveTintColor:'white',
            tabBarContentContainerStyle:{elevation:0},
            
            headerShown: true, 
            tabBarActiveTintColor:'#ff9900',
            
            tabBarIndicatorStyle: {
              borderBottomWidth:2 ,
              borderBottomColor:'#ff9900',
              backgroundColor: '#ff9900', // Set the background color of the active tab indicator
            },
            
            tabBarStyle: { backgroundColor: '#2f4f4f',}
          }}
        >
            <Tab.Screen
            name='ManPower'
            initialParams={{item}}
           
      
            component={ManPower}
            />
              <Tab.Screen
            name='Meterials'
            initialParams={{item}}
            component={Materials}
            />
                <Tab.Screen
                 initialParams={{item}}
            name='Work Completion Report'
            component={Workreport}
            />
        </Tab.Navigator>

    )
}
export default TabNavigator;