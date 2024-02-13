import React,{useState} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { responsiveWidth } from "react-native-responsive-dimensions";
import LinearGradient from "react-native-linear-gradient";
import {  Menu,Portal,Dialog,Button, Divider, Provider, } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo'
import { CommonActions } from "@react-navigation/native";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({ navigation }) => {
    const [MenuAnchor, setMenuAnchor] = useState();
    const [isOpen, setisOpen] = useState(false);

    const signout = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'Login'
                            },],
                    }));
                })
    }

    const openMenu = (event) => {
        const { nativeEvent } = event;
        const anchor = {
            x: nativeEvent.pageX,
            y: nativeEvent.pageY,
        }
        setMenuAnchor(anchor);
        setisOpen(true);
    }
    return (
        <Provider>
        <View style={{ flex: 1, backgroundColor: '#ECF0F1' }}>
        <View style={{ height: 60, backgroundColor: '#2f4f4f', alignItems: 'center', flexDirection: 'row', width: "100%" }}>
                    
                    <Entypo name='home' size={30} color={'white'} style={{ marginLeft: 20 }} />
                    
                    <Text style={styles.HeaderText}>Home Screen</Text>
                    <View style={{ borderWidth: 0, width: 60, position: 'absolute', width: "100%" }}>
                        <TouchableOpacity onPress={openMenu} style={{alignSelf: 'flex-end'}}>
                            <Entypo name='dots-three-vertical' size={20} color={'white'} style={{ marginLeft: 0, marginRight: 30 }} />

                        </TouchableOpacity>
                    </View>
                </View>
              <Menu
                    visible={isOpen}
                    onDismiss={() => setisOpen(false)}
                    anchor={
                        MenuAnchor
                    }
                >

                <Menu.Item onPress={signout} title="Logout" />
                </Menu>

            {/* <ImageBackground source={require('./const1.jpg')} resizeMode="cover" style={{ flex: 1 }}  > */}

                <ScrollView>
                   
{/* //'#2f4f4f','#ff9900' */}
                    <View style={{ borderWidth: 0, margin: 20 }}>
                        <View >
                            <LinearGradient colors={['white','white']}
                             start={{ x: 0, y: 0.5 }} // Left side of the component
                             end={{ x: 1, y: 0.5 }} 
                             style={{backgroundColor:'#1b1b1b',borderRadius:10,padding:10,borderWidth:10,borderColor:'#2f4f4f'}}
                            >
                        <Image source={require('./Assets/const12.png')} style={{ height: 80, width: 100, borderWidth: 1, alignSelf: 'center' }} />
                        </LinearGradient>
                        </View>
                        <View style={{ flexDirection: 'row', overflow: 'hidden', justifyContent: 'space-between', marginTop: 20 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('projectList')}>
                                <View style={styles.card}>


                                    <Image source={require('./Assets/const9.png')} style={{ height: 75, width: 75, borderWidth: 1 }} />

                                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black', width:responsiveWidth(35), textAlign: 'center' }}>Projects</Text>


                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('QuoteView')}>

                                <View style={styles.card}>

                                    <Image source={require('./Assets/const10.png')} style={{ height: 65, width: 85, borderWidth: 1 }} />

                                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black', width: responsiveWidth(35), textAlign: 'center' }}>Material Rates</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', overflow: 'hidden', justifyContent: 'space-between', marginVertical: 20 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Quotegenerator')}>
                                <View style={styles.card}>
                                    <Image source={require('./Assets/const11.png')} style={{ height: 80, width: 80, borderWidth: 1 }} />
                                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black', width: responsiveWidth(35), textAlign: 'center' }}>Quotation</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Invoicegenerator')}>
                                <View style={styles.card}>
                                   

                                        <Image source={require('./Assets/invoice.png')} style={{ borderWidth: 1, height: 80, width: 80 }} />
                                 

                                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black', width: responsiveWidth(35), textAlign: 'center', }}>Invoice</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                      </View>
                  </ScrollView>
            {/* </ImageBackground> */}

        </View>
        </Provider>
    )
}
export default HomeScreen;
const styles = StyleSheet.create({
    HeaderText: {
        fontSize: 22,
        color: 'white',
        marginLeft: 20

    },
    card: {
        height: 200,
        backgroundColor: 'white',
        borderWidth: 0,
        elevation:2,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 25,
        borderTopColor: '#ff9900',
        borderRadius: 10
    }
})