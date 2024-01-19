import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
  import { Portal ,Dialog,Button} from 'react-native-paper';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  


const Expenditure = ({ navigation, route }) => {

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
    const [MasonF, onChangeMasonF] = useState("");
    const [electrician, onChangeElect] = useState("");
    const [carpender, onChangeCarpender] = useState("");
    const [Plumber, onChangePlumber] = useState("");
    const [painter, onChangePainter] = useState("");
    const [fitter, onChangeFitter] = useState("");
    const [helper, onChangeHelper] = useState("");
    const [others, onChangeOthers] = useState("");
    const[popup,setpopup]=useState(false)


    const [MenuAnchor, setMenuAnchor] = useState();

    const MaterialHead = ['No', 'Material', 'Cost'];
    const MaterialData = [
        ['1', "Bricks", 10],
        ['2', "Cement(Nos)", 15],
        ['3', "M.Sand(Unit)", 20],
        ['4', "P.Sand(Unit)", 20],
        ['5', "Tiles(Nos)", 20000],
        ['6', "Steel Bar(kgs)", 20],
        ['7', "Aggregate 20mm(Unit)", 2],
    ];
    const ManPowerHead = ['No', 'Man Power', 'Wages'];
    const Manpowerdata = [
        ['1', "Mason(Male)", `${10}₹`],
        ['2', "Mason(Female)", `${15}₹`],
        ['3', "Electrician", `${20}₹`],
        ['4', "Carpender", `${20}₹`],
        ['5', "Plumber", `${20}₹`],
        ['6', "Painter", `${2}₹`],
        ['7', "Fitter", `${2}₹`],
        ['8', "Helpers", `${2}₹`],
        ['9', "Others", `${2}₹`],
    ];

    const openMenu = (event) => {
        const { nativeEvent } = event;
        const anchor = {
            x: nativeEvent.pageX,
            y: nativeEvent.pageY-20,
        }
        setMenuAnchor(anchor);
        setisOpen(true);
    }

    useEffect(() => {
        console.log(item)
    }, [])
    const reference = database().ref('Construction').child('ProjectView').child('ManpowerCost');
   
    const dataupdate=()=>{
        setpopup(true)
        onChangeCement("")
        onChangeElect("")
        onChangeAggregate("")
        onChangeBricks("")
        onChangeCarpender("")
        onChangeFitter("")
        onChangeHelper("")
        onChangeMason("")
        onChangeMasonF("")
        onChangePlumber("")
        onChangePainter("")
        onChangeOthers("")
        onChangePsand("")
        onChangeTiles("")
        onChangeSteelbar("")
        onChangeMsand("")

    }

    const onSubmit = () => {
        reference.child(item.key).child(`${moment(date).format('YYYY-MM-DD')}`).set({
            masonMale: Mason,
            masonFemale:MasonF,
            electrician: electrician,
            carpender: carpender,
            plumber: Plumber,
            painter: painter,
            fitter: fitter,
            helper: helper,
            others: others
        }).then((res) =>dataupdate() )
    }
    const onSubmitMeterial = () => {
        const reference = database().ref('Construction').child('ProjectView').child('MeterialCost');
        reference.child(item.key).child(`${moment(date).format('YYYY-MM-DD')}`).set({
            Bricks: Bricks,
            Cement: Cement,
            Msand: Msand,
            Psand: Psand,
            Tiles: Tiles,
            Steelbar: Steelbar,
            Aggregate: Aggregate,

        }).then((res) => dataupdate())
    }

    const handleInputChange= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeMason(numericInput);
       };
       const handleInputChange1= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeMasonF(numericInput);
       };
       const handleInputChange2= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeElect(numericInput);
       };
       const handleInputChange3= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeCarpender(numericInput);
       };
       const handleInputChange4= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangePlumber(numericInput);
       };
       const handleInputChange5= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangePainter(numericInput);
       };
       const handleInputChange6= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeFitter(numericInput);
       };
       const handleInputChange7= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeHelper(numericInput);
       };
       const handleInputChange8= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeOthers(numericInput);
       };
    
    
       const handleInputChange9= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeBricks(numericInput);
       };
       const handleInputChange10= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeCement(numericInput);
       };
       const handleInputChange11= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeMsand(numericInput);
       };
       const handleInputChange12= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangePsand(numericInput);
       };
       const handleInputChange13= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeTiles(numericInput);
       };
       const handleInputChange14= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeSteelbar(numericInput);
       };
       const handleInputChange15= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeAggregate(numericInput);
       };



    return (
        <Provider>
            <View style={{ flex: 1,backgroundColor:'white' }}>
                {/* <View style={{ height: 60, backgroundColor: '#2f4f4f', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Entypo name='menu' size={30} color={'white'} style={{ marginLeft: 20 }} />

                    </TouchableOpacity>
                    <Text style={Styles.HeaderText}>Expenditure</Text>

                </View> */}
                  <Portal>
            <Dialog visible={popup}>
                 {/* <Dialog.Title style={{fontSize:17}}>Meterial </Dialog.Title> */}
                 <Dialog.Content>
                <View style={{height:50,width:50,borderRadius:50,borderWidth:0,alignSelf:'center',alignItems:'center',justifyContent:'center',marginTop:-50,backgroundColor:'#2f4f4f'}}>
                    <AntDesign name="check" size={35} color={'white'} style={{}}/>

                </View>
                 <Text style={{alignSelf:'center',fontSize:22,color:'black'}}>Success</Text>
               <Text style={{alignSelf:'center',fontSize:15,marginTop:5}}>Data added Success</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                     
              
                <Button buttonColor='#2f4f4f' textColor='white' mode='outlined'  style={{alignSelf:'center',width:100,marginRight:responsiveWidth(25)}} onPress={()=>setpopup(false)}>ok</Button>
             </Dialog.Actions>
                   
                 </Dialog>
            </Portal>
                <View style={Styles.Rowcontainer}>
                <TouchableOpacity onPress={openMenu}>
                    <View style={{ borderRadius:10, marginLeft: 20, backgroundColor: '#cccccc', flexDirection: 'row', alignItems: 'center',justifyContent:'space-evenly' ,borderWidth:0,width:responsiveWidth(40) }}>
                       
                            <Text style={{ padding:10, fontSize: 16, color: 'black' }}>{list}</Text>

                            <AntDesign name='down' size={16} color={'black'} style={{padding:10 }} />

                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setOpen(true) }} style={{ borderWidth: 1, borderColor: '#cccccc', borderRadius: 5, alignSelf: 'flex-end', alignItems: 'center', marginRight: 20 }}>
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

                      
                      
                            <View>
                               
                                <View style={{ flexDirection: 'row', margin: 0,marginTop:20, alignItems: 'center', borderWidth: 0 }}>
                            {/* <AntDesign name='codepen-circle' size={16} color={'black'} style={{ marginLeft: 30 }} /> */}
                            <Text style={{ marginLeft: 30,fontSize:17,color:'black',fontWeight:'bold',width:responsiveWidth(60) }}>Enter Man Power Wages</Text>
                           
                        </View>
                                <View style={{ marginTop: 10,marginLeft:30,marginRight:30,marginBottom:20, elevation: 0, backgroundColor: 'white' }}>
                                    <View style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}>

                                        <View style={Styles.ItemView} >
                                            <Text style={Styles.Label}>Mason(Male)</Text>

                                            <TextInput
                                                style={Styles.TextInput}
                                                onChangeText={handleInputChange}
                                                keyboardType='number-pad'
                                                textAlign="center"
                                                value={Mason}
                                            />
                                            <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                                        </View>
                                        <View style={Styles.ItemView} >
                                            <Text style={Styles.Label}>Mason(Female)</Text>

                                            <TextInput
                                                style={Styles.TextInput}
                                                onChangeText={handleInputChange1}
                                                keyboardType='number-pad'
                                                textAlign="center"
                                                value={MasonF}
                                            />
                                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                                        </View>
                                        <View style={Styles.ItemView} >
                                            <Text style={Styles.Label}>Electrician</Text>

                                            <TextInput
                                                style={Styles.TextInput}
                                                onChangeText={handleInputChange2}
                                                keyboardType='number-pad'
                                                textAlign="center"
                                                value={electrician}
                                            />
                                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                                        </View>
                                        <View style={Styles.ItemView} >
                                            <Text style={Styles.Label}>Carpender</Text>

                                            <TextInput
                                                style={Styles.TextInput}
                                                onChangeText={handleInputChange3}
                                                keyboardType='number-pad'
                                                textAlign="center"
                                                value={carpender}
                                            />
                                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                                        </View>
                                        <View style={Styles.ItemView} >
                                            <Text style={Styles.Label}>Plumber</Text>

                                            <TextInput
                                                style={Styles.TextInput}
                                                onChangeText={handleInputChange4}
                                                keyboardType='number-pad'
                                                textAlign="center"
                                                value={Plumber}
                                            />
                                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                                        </View>
                                        <View style={Styles.ItemView} >
                                            <Text style={Styles.Label}>Painter</Text>

                                            <TextInput
                                                style={Styles.TextInput}
                                                onChangeText={handleInputChange5}
                                                keyboardType='number-pad'
                                                textAlign="center"
                                                value={painter}
                                            />
                                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                                        </View>
                                        <View style={Styles.ItemView} >
                                            <Text style={Styles.Label}>Fitter</Text>

                                            <TextInput
                                                style={Styles.TextInput}
                                                onChangeText={handleInputChange6}
                                                textAlign="center"
                                                keyboardType='number-pad'
                                                value={fitter}
                                            />
                                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                                        </View>
                                        <View style={Styles.ItemView} >
                                            <Text style={Styles.Label}>Helpers</Text>

                                            <TextInput
                                                style={Styles.TextInput}
                                                onChangeText={handleInputChange7}
                                                textAlign="center"
                                                keyboardType='number-pad'
                                                value={helper}
                                            />
                                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                                        </View>
                                        <View style={Styles.ItemView} >
                                            <Text style={Styles.Label}>others</Text>

                                            <TextInput
                                                style={Styles.TextInput}
                                                textAlign="center"
                                                onChangeText={handleInputChange8}
                                                keyboardType='number-pad'
                                                value={others}
                                            />
                                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                                        </View>


                                    </View>




                                </View>
                                <View style={{
                                      marginBottom:30
                                    }}>
                                <TouchableOpacity onPress={onSubmit} style={{ backgroundColor: '#ff9900', alignItems: 'center', justifyContent: 'center', width: 150,
                                 alignSelf: 'center',borderRadius:10}}>
                                   
                                        <Text style={{ fontSize: 14, padding: 10, color: 'white' }}>Submit</Text>
                                  
                                </TouchableOpacity>
                                </View>
                            </View>
                        
                       
                    </ScrollView>
                )}

        {list === 'Material' && (
                    <ScrollView>

                      <View>
                           <View style={{ flexDirection: 'row', margin: 10,marginTop:20, alignItems: 'center', borderWidth: 0 }}>
                            {/* <AntDesign name='codepen-circle' size={16} color={'black'} style={{ marginLeft: 30 }} /> */}
                            <Text style={{ marginLeft: 20,fontSize:17,fontWeight:'bold',color:'black',width:responsiveWidth(60) }}>Enter Meterial Cost</Text>
                          
                        </View>
                                <View style={{ marginLeft: 30,marginRight:30,marginBottom:30,marginTop: 0, elevation: 0, backgroundColor: 'white' }}>
                                    <View style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}>

                                    <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Bricks:</Text>

                            <TextInput
                                style={Styles.TextInput}
                                onChangeText={handleInputChange9}
                                keyboardType='number-pad'
                                textAlign="center"
                                value={Bricks}
                            />
                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Cement:</Text>

                            <TextInput
                                style={Styles.TextInput}
                                keyboardType='number-pad'
                                textAlign="center"
                                onChangeText={handleInputChange10}
                                value={Cement}
                            />
                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>M.Sand:</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={handleInputChange11}
                                value={Msand}
                            />
                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>P.Sand:</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={handleInputChange12}
                                value={Psand}
                            />
                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Tiles</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={handleInputChange13}
                                value={Tiles}
                            />
                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Steel Bar:</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={handleInputChange14}
                                value={Steelbar}
                            />
                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Aggregate:</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={handleInputChange15}
                                value={Aggregate}
                            />
                              <FontAwesome name='rupee' size={25} color={'gray'} style={{marginLeft:-20}}/>
                        </View>

                                    </View>




                                </View>
                                <View style={{
                                      marginBottom:30
                                    }}>
                                <TouchableOpacity onPress={onSubmitMeterial} style={{ backgroundColor: '#ff9900', alignItems: 'center', justifyContent: 'center', width: 150,
                                 alignSelf: 'center',borderRadius:10}}>
                                   
                                        <Text style={{ fontSize: 14, padding: 10, color: 'white' }}>Submit</Text>
                                  
                                </TouchableOpacity>
                                </View>
                            </View>
                        
                      
                    </ScrollView>
                )}
            </View>

        </Provider>
    )
}



export default Expenditure;
const Styles = StyleSheet.create({
    head: { height: 45, backgroundColor: '#2f4f4f' },
    text: { margin: 6, textAlign: 'center', fontSize: 17, color: 'white',fontWeight:'bold' },
    text1: { margin: 6, textAlign: 'center', fontSize: 12, color: 'black' },
    ItemView: {
        flexDirection: 'row', marginVertical: 10, alignItems: 'center'
    },
    content:{backgroundColor:'#cccccc'},
    TextInput: {
        borderWidth: 1, padding: 8, flex: 1, borderColor: '#2f4f4f', borderRadius: 10,color:'black'
    },
    Label: {
        marginRight: 10, width: 150, fontSize: 14, color: 'black'

    },
    HeaderText: {
        fontSize: 22,
        color: 'white',
        marginLeft: 20

    },
    Rowcontainer:{
        flexDirection:'row',justifyContent:'space-between',marginTop:10
    }
})