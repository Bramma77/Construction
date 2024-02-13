import React,{ useState, useEffect, useContext} from "react";
import {View,Text, StyleSheet,TouchableOpacity,Image,Alert, ScrollView, ImageBackground} from 'react-native';
import { DrawerContentScrollView, DrawerItemList , DrawerItem } from '@react-navigation/drawer';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Animated from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const CustomDrawer=(props)=>{
    return(
        <View style={{flex:1}}>
         
   
        <View style={{ backgroundColor: '#2f4f4f', height: 100, }}>
        <ImageBackground source={require('./Assets/const3.jpg')} resizeMode="cover" style={{flex:1}}  >
       

        

        </ImageBackground>   
        </View>
       
    <DrawerContentScrollView {...props}  contentContainerStyle={{ padding:20}}>            
            <View style={{ backgroundColor: '#fff', paddingTop: 10, paddingBottom: 20, overflow: 'scroll' }}>
          <DrawerItemList {...props}
                   /> 


              
        </View>
        </DrawerContentScrollView>
        {/* <View style={{borderBottomWidth:1,borderColor:'#808080'}}></View>
        <TouchableOpacity style={{marginBottom:10}}>
        <DrawerItem  label="Logout" onPress={''}
                  labelStyle={{marginLeft:-20,fontSize:15,color:'#333333'}}
                  
                  icon={({

                   })=>(
                    <Entypo name='log-out' color='#e6c402'size={21}/>
                   )}
                   />
               </TouchableOpacity>   
               <TouchableOpacity style={{marginBottom:40}}>
        <DrawerItem  label="Remove Account" onPress={''}
                  labelStyle={{marginLeft:-20,fontSize:15,color:'#333333'}}
                  
                  icon={({

                   })=>(
                   
                    <IonIcons name= 'person-outline'color={"#e6c402"} size={22}/>
                   )}
                   />
               </TouchableOpacity>    */}
       
        </View>
       
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    navigationContainer: {
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      padding: 16,
      fontSize: 15,
      textAlign: 'center',
    },
    header: {
      marginTop: 10,
      fontWeight: 'bold',
      fontSize: 18,
    },
  });

export default CustomDrawer;
 