import React, { useState } from 'react';
import { Text, View, TextInput,  StyleSheet, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import database from '@react-native-firebase/database';
import { Portal ,Dialog,Provider,Button} from 'react-native-paper';
import { responsiveWidth } from 'react-native-responsive-dimensions';


const Meterials = ({ navigation ,route}) => {
    const { item } = route.params;
    const [Bricks, onChangeBricks] = useState("");
    const [Cement, onChangeCement] = useState("");
    const [Msand, onChangeMsand] = useState("");
    const [Psand, onChangePsand] = useState("");
    const [Tiles, onChangeTiles] = useState("");
    const [Steelbar, onChangeSteelbar] = useState("");
    const [Aggregate, onChangeAggregate] = useState("")
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const[popup,setpopup]=useState(false)

    const onSubmit = () => {
        const reference = database().ref('Construction').child('ProjectView').child('Meterial');
        if(Bricks!=""||Cement!=""||Msand!=""||Psand!=""||Tiles!=""||Steelbar!=""||Aggregate!=""){
        reference.child(item.key).child(`${moment(date).format('YYYY-MM-DD')}`).set({
            Bricks: Bricks,
            Cement: Cement,
            Msand: Msand,
            Psand: Psand,
            Tiles: Tiles,
            Steelbar: Steelbar,
            Aggregate: Aggregate,

        }).then((res) =>{ setpopup(true)
        onChangeBricks("")
        onChangeCement("")
        onChangeAggregate("")
        onChangeMsand("")
        onChangePsand("")
        onChangeSteelbar("")
        onChangeTiles("")
        
        })
    }else{
        ToastAndroid.show( "Please enter any one field", ToastAndroid.SHORT);
    }
    }
    const handleInputChange= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeBricks(numericInput);
       };
       const handleInputChange1= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeCement(numericInput);
       };
       const handleInputChange2= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeMsand(numericInput);
       };
       const handleInputChange3= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangePsand(numericInput);
       };
       const handleInputChange4= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeTiles(numericInput);
       };
       const handleInputChange5= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeSteelbar(numericInput);
       };
       const handleInputChange6= (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
         onChangeAggregate(numericInput);
       };


    return (
        <Provider>
        <View style={{ flex: 1 ,backgroundColor:'white'}}>
            <Portal>
            <Dialog visible={popup}>
                 {/* <Dialog.Title style={{fontSize:17}}>Meterial </Dialog.Title> */}
                 <Dialog.Content>
                 <View style={{height:50,width:50,borderRadius:50,borderWidth:0,alignSelf:'center',alignItems:'center',justifyContent:'center',marginTop:-50,backgroundColor:'#2f4f4f'}}>
                    <AntDesign name="check" size={35} color={'white'} style={{}}/>

                </View>
                <Text style={{alignSelf:'center',fontSize:20,color:'black',marginTop:5}}>Material</Text>
                  <Text style={{alignSelf:'center',fontSize:15,marginTop:10}}>Material Details Updated Success</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                     
              
                <Button buttonColor='#2f4f4f' textColor='white' mode='outlined'  style={{alignSelf:'center',width:100,marginRight:responsiveWidth(25)}} onPress={()=>setpopup(false)}>ok</Button>
             </Dialog.Actions>
                   
                 </Dialog>
            </Portal>

            <ScrollView>
                <TouchableOpacity onPress={() => { 
                    if(open===false){
                    setOpen(true) 
                }else[
                    setOpen(false)
                ]
                }} style={{ borderWidth: 1, borderColor: '#cccccc', borderRadius: 5, alignSelf: 'flex-end', width: 150, height: 50, alignItems: 'center', marginRight: 20, marginTop: 20 }}>
                    <View style={{ flex: 1, borderWidth: 0, flexDirection: 'row', alignItems: 'center', }}>

                        <Text style={{ fontSize: 16, color: 'black', paddingHorizontal: 5 }}>{moment(date).format("DD-MM-YYYY")}</Text>
                        <Feather style={{ color: '#2f4f4f' }} name='calendar' size={32} />
                        <DatePicker
                            style={{}}
                            mode='date'
                            modal
                           // minimumDate={new Date()}
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
                <View style={{ marginTop: 10,marginLeft:30,marginRight:20,marginBottom:30, elevation: 0, backgroundColor: 'white' }}>
                    <View style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Bricks(Nos):</Text>

                            <TextInput
                                style={Styles.TextInput}
                                onChangeText={handleInputChange}
                                keyboardType='number-pad'
                                textAlign="center"
                                value={Bricks}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Cement(Nos):</Text>

                            <TextInput
                                style={Styles.TextInput}
                                keyboardType='number-pad'
                                textAlign="center"
                                onChangeText={handleInputChange1}
                                value={Cement}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>M.Sand(Unit):</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={handleInputChange2}
                                value={Msand}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>P.Sand(Unit):</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={handleInputChange3}
                                value={Psand}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Tiles(Nos)</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={handleInputChange4}
                                value={Tiles}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Steel Bar(kg):</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={handleInputChange5}
                                value={Steelbar}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Aggregate 20mm(Unit):</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={handleInputChange6}
                                value={Aggregate}
                            />
                        </View>



                    </View>


                </View>
                <View style={{marginBottom:30}}>
                    <TouchableOpacity onPress={onSubmit} style={{ backgroundColor: '#ff9900', alignItems: 'center', justifyContent: 'center', width: 150,
                                 alignSelf: 'center',borderRadius:10}}>
                                <Text style={{ fontSize: 14, padding: 10, color: 'white' }}>Submit</Text>
                                  </TouchableOpacity>
                                </View>
            </ScrollView>
        </View>
        </Provider>

    )
}




export default Meterials;
const Styles = StyleSheet.create({
    ItemView: {
        flexDirection: 'row', marginVertical: 10, alignItems: 'center'
    },
    TextInput: {
        borderWidth: 1, padding: 8, flex: 1, borderColor: '#2f4f4f', borderRadius: 10,color:'black'
    },
    Label: {
        marginRight: 10, width: responsiveWidth(40), fontSize: 14, color: 'black'

    },
    HeaderText: {
        fontSize: 22,
        color: 'white',
        marginLeft: 20

    }
})