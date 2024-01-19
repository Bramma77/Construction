import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { DefaultTheme, Menu, Divider, Provider, Appbar, Toolbar, ToolbarBackAction, ToolbarContent, Colors } from 'react-native-paper'
import { Table, Row, Rows } from 'react-native-table-component';
import {
    useDimensionsChange,
    useResponsiveHeight,
    useResponsiveWidth,
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
  
  


const Viewsitedata = ({ navigation, route }) => {

    const { item } = route.params;
    const [Bricks, onChangeBricks] = useState("");
    const [Cement, onChangeCement] = useState("");
    const [Msand, onChangeMsand] = useState("");
    const [Psand, onChangePsand] = useState("");
    const [Tiles, onChangeTiles] = useState("");
    const [Steelbar, onChangeSteelbar] = useState("");
    const [Aggregate, onChangeAggregate] = useState("")
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date())
    
    const [isOpen, setisOpen] = useState(false);
    const [list, setlist] = useState("Material")
    const [slidedown, setslidedown] = useState(false)
    const [viewSlide, setViewSlide] = useState(false);

    const [Mason, onChangeMason] = useState("");
    const [electrician, onChangeElect] = useState("");
    const [carpender, onChangeCarpender] = useState("");
    const [Plumber, onChangePlumber] = useState("");
    const [painter, onChangePainter] = useState("");
    const [fitter, onChangeFitter] = useState("");
    const [helper, onChangeHelper] = useState("");
    const [others, onChangeOthers] = useState("");
    const [Manpower,setManpower]=useState([]);
    const[Meterial,setMeterial]=useState([]);
   const[Workreport,setWorkreport]=useState([]);
    const [MenuAnchor, setMenuAnchor] = useState();
    const MaterialHead = ['No', 'Material', 'Quantity'];
    const MaterialData = [
        ['1', "Bricks", `${Meterial?Meterial.Bricks:'0'}`],
        ['2', "Cement(Nos)",`${Meterial?Meterial.Cement:'0'}` ],
        ['3', "M.Sand(Unit)", `${Meterial?Meterial.Msand:'0'}`],
        ['4', "P.Sand(Unit)", `${Meterial?Meterial.Psand:'0'}`],
        ['5', "Tiles(Nos)", `${Meterial?Meterial.Tiles:'0'}`],
        ['6', "Steel Bar(kgs)", `${Meterial?Meterial.Steelbar:'0'}`],
        ['7', "Aggregate 20mm(Unit)", `${Meterial?Meterial.Aggregate:'0'}`],
    ];
    const ManPowerHead = ['No', 'Man Power', 'Quantities'];
    const Manpowerdata = [
        ['1', "Mason(Male)", `${Manpower?Manpower.masonMale:'0'}`],
        ['2', "Mason(Female)", `${Manpower?Manpower.masonFemale:'0'}`],
        ['3', "Electrician", `${Manpower?Manpower.electrician:'0'}`],
        ['4', "Carpender", `${Manpower?Manpower.carpender:'0'}`],
        ['5', "Plumber", `${Manpower?Manpower.plumber:'0'}`],
        ['6', "Painter", `${Manpower?Manpower.painter:'0'}`],
        ['7', "Fitter", `${Manpower?Manpower.fitter:'0'}`],
        ['8', "Helpers", `${Manpower?Manpower.helper:'0'}`],
        ['9', "Others", `${Manpower?Manpower.others:'0'}`],
    ];


   
    
 
    useEffect(()=>{
        
        const dataRef = database().ref('Construction').child('ProjectView').child('Manpower').child(item.key).child(`${moment(date).format('YYYY-MM-DD')}`);
        console.log(dataRef)
        const onValueChange = dataRef.on('value', (snapshot) => {
          
            setManpower(snapshot.val())
        //  console.log(snapshot.val())
          console.log('manpoer',Manpower)
           
          });
      
          return () => {
            dataRef.off('value', onValueChange);
          };
    },[date])
    useEffect(()=>{
        
        const dataRef = database().ref('Construction').child('ProjectView').child('Meterial').child(item.key).child(`${moment(date).format('YYYY-MM-DD')}`);
        console.log(dataRef)
        const onValueChange = dataRef.on('value', (snapshot) => {
          
            setMeterial(snapshot.val())
        //  console.log(snapshot.val())
          console.log('material',Meterial)
           
          });
      
          return () => {
            dataRef.off('value', onValueChange);
          };
    },[date])
    useEffect(()=>{
        
        const dataRef = database().ref('Construction').child('ProjectView').child('Workreport').child(item.key).child(`${moment(date).format('YYYY-MM-DD')}`);
        console.log(dataRef)
        const onValueChange = dataRef.on('value', (snapshot) => {
          
            setWorkreport(snapshot.val())
         console.log(snapshot.val())
         
           
          });
      
          return () => {
            dataRef.off('value', onValueChange);
          };
    },[date])

    const openMenu = (event) => {
        const { nativeEvent } = event;
        const anchor = {
            x: nativeEvent.pageX,
            y: nativeEvent.pageY,
        }
        setMenuAnchor(anchor);
        setisOpen(true);
    }

    useEffect(() => {
        console.log(item)
    }, [])
    const reference = database().ref('Construction').child('ProjectView').child('Manpower');

    

    return (
        <Provider>
            <View style={{ flex: 1 }}>
              <View style={{margin:20}}>
                <View style={Styles.Rowcontainer}>
                <TouchableOpacity onPress={openMenu}>
                    <View style={{ borderRadius:10, backgroundColor: '#cccccc', flexDirection: 'row', alignItems: 'center',justifyContent:'space-evenly' ,borderWidth:0 }}>
                       
                            <Text style={{ padding:10, fontSize: 16, color: 'black' }}>{list}</Text>

                            <AntDesign name='down' size={16} color={'black'} style={{padding:10 }} />

                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setOpen(true) }} style={{ borderWidth: 1, borderColor: '#cccccc', borderRadius: 5, alignSelf: 'flex-end', alignItems: 'center' }}>
                                    <View style={{  borderWidth: 0, flexDirection: 'row', alignItems: 'center',margin:5 ,justifyContent:'center'}}>

                                        <Text style={{ fontSize: 16, color: 'black', paddingHorizontal: 5 }}>{moment(date).format("DD-MM-YYYY")}</Text>
                                        <Feather style={{ color: '#2f4f4f' }} name='calendar' size={30} />
                                        <DatePicker
                                            style={{}}
                                            mode='date'
                                            modal
                                          //  minimumDate={new Date()}
                                            open={open}
                                            date={date}
                                            onConfirm={value => {
                                                setOpen(false)
                                                console.log(moment(value).format("YYYY-MM-DD"))
                                                setDate(value)
                                              
                                            }}
                                            onCancel={() => {
                                                setOpen(false)
                                            }}
                                        />

                                    </View>
                                </TouchableOpacity>
                </View>
                <Menu
                    visible={isOpen}
                    onDismiss={() => setisOpen(false)}
                    anchor={
                        MenuAnchor
                    }
                >
                    <Menu.Item onPress={() => {
                        setlist("Material")
                        setisOpen(false)
                    }} title="Material" />
                    <Menu.Item onPress={() => {
                        setlist('ManPower')
                        setisOpen(false)
                    }} title="ManPower" />
                </Menu>
               

                {list === 'ManPower' && (
                    <ScrollView>

                       
<Text style={{ marginTop:20,marginBottom:20,fontSize:15,color:'black' ,fontWeight:'bold'}}>Manpower Data</Text>
                        <View style={{  elevation: 1, backgroundColor: 'white' }}>
                             
                              
                          

                                <Table borderStyle={{ borderWidth: 1, borderColor: 'white' }}>
                                    <Row data={ManPowerHead} style={Styles.head} textStyle={Styles.text} />
                                    <Rows data={Manpowerdata}style={Styles.content} textStyle={Styles.text1} />
                                </Table>

                         
                        </View>
                        
                    </ScrollView>
                )}

{list === 'Material' && (
                    <ScrollView>
                          <Text style={{marginTop:20,fontSize:15,color:'black',fontWeight:'bold',marginBottom:20 }}>Meterial Data</Text>


                       
                       
                        <View style={{  elevation: 1, backgroundColor: 'white' }}>
                            
                          

                                <Table borderStyle={{ borderWidth: 2, borderColor: 'white' }}>
                                    <Row data={MaterialHead} style={Styles.head} textStyle={Styles.text} />
                                    <Rows data={MaterialData} style={Styles.content} textStyle={Styles.text1} />
                                </Table>

                          
                        </View>
                        
                    </ScrollView>
                )}
                 <Text style={{marginTop:20,fontSize:15,color:'black',fontWeight:'bold',marginBottom:20 }}>Work Report</Text>
                 <Text style={{fontSize:14,color:'black',marginTop:10}}>{Workreport?.Workreport}</Text>
            </View>
            </View>
        </Provider>
    )
}



export default Viewsitedata;
const Styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#2f4f4f' },
    text: { margin: 6, textAlign: 'center', fontSize: 17, color: 'white',fontWeight:'bold' },
    text1: { margin: 6, textAlign: 'center', fontSize: 12, color: 'black' },
    ItemView: {
        flexDirection: 'row', marginVertical: 10, alignItems: 'center'
    },
    TextInput: {
        borderWidth: 1, padding: 8, flex: 1, borderColor: '#2f4f4f', borderRadius: 10,
    },
    Label: {
        marginRight: 10, width: 150, fontSize: 12, color: 'black'

    },
    content:{backgroundColor:'#cccccc'},
    HeaderText: {
        fontSize: 22,
        color: 'white',
        marginLeft: 20

    },
    Rowcontainer:{
        flexDirection:'row',justifyContent:'space-between',marginTop:0
    }
})