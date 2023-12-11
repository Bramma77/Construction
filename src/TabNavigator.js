import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ManPower from './manPower';
import Materials from './Materials';
const Tab = createMaterialTopTabNavigator();

const TabNavigator=()=>{
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarLabelStyle: { fontSize: 12 ,color:'white',elevation:0},
          //  tabBarItemStyle: { width: 100 },
            tabBarInactiveTintColor:'white',
            tabBarContentContainerStyle:{elevation:0},
           
            tabBarActiveTintColor:'white',
            tabBarStyle: { backgroundColor: '#2f4f4f', },
          }}
        >
            <Tab.Screen
            name='ManPower'
            component={ManPower}
            />
              <Tab.Screen
            name='Materials'
            component={Materials}
            />
        </Tab.Navigator>

    )
}
export default TabNavigator;