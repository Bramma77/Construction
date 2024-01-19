import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Root, Popup ,Toast} from 'popup-ui';
import { Portal ,Dialog,Provider,Button} from 'react-native-paper';
import { responsiveWidth } from 'react-native-responsive-dimensions';


const ManPower = ({ navigation, route }) => {

    const { item } = route.params;
    const [Mason, onChangeMason] = useState("");
    const [MasonF, onChangeMasonF] = useState("");
    const [electrician, onChangeElect] = useState("");
    const [carpender, onChangeCarpender] = useState("");
    const [Plumber, onChangePlumber] = useState("");
    const [painter, onChangePainter] = useState("");
    const [fitter, onChangeFitter] = useState("");
    const [helper, onChangeHelper] = useState("");
    const [others, onChangeOthers] = useState("");
    const[open,setOpen]=useState(false);
    const[date,setDate]=useState(new Date());
    const[popup,setpopup]=useState(false)

    const back=()=>{
        setOpen(false);
        onChangeMason("")
        onChangeFitter("")
        onChangeElect("")
        onChangeCarpender("")
        onChangeMasonF("")
        onChangeOthers("")
        onChangePainter("")
        onChangePlumber("")
        onChangeHelper("")
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
    const popupshow=()=>{
    
     
        Popup.show({
          type: 'Success',
          title: 'ManPower',
          button: true,
        
          textBody: 'Manpower added successfully',
          buttonText: 'Ok',
          callback: () => {Popup.hide()
           
            back();
          },
      
        })
      }

    useEffect(() => {
        console.log(item)
    }, [])
    const reference = database().ref('Construction').child('ProjectView').child('Manpower');

    const onSubmit = () => {
        if(Mason!=""||MasonF!=""||electrician!=""||carpender!=""||Plumber!=""||painter!=""||fitter!=""||helper!=""||others!=""){
        reference.child(item.key).child(`${moment(date).format('YYYY-MM-DD')}`).set({
            masonMale: Mason,
            masonFemale:MasonF,
            electrician: electrician,
            carpender: carpender,
            plumber: Plumber,
            painter: painter,
            fitter: fitter,
            helper:helper,
            others:others
        }).then((res) =>{
     
     setpopup(true)
    back()
      
    }).catch((error)=>{
        console.log(error)
    })
}else{
    ToastAndroid.show( "Please enter any one field", ToastAndroid.SHORT);
}
    }


    return (
        <Provider>
      
        <View style={{ flex: 1 ,backgroundColor:'white'}}>
           <Portal>
            <Dialog visible={popup} onDismiss={()=>setpopup(false)}>
                 {/* <Dialog.Title style={{fontSize:17}}>Meterial </Dialog.Title> */}
                 <Dialog.Content>
                 <View style={{height:50,width:50,borderRadius:50,borderWidth:0,alignSelf:'center',alignItems:'center',justifyContent:'center',marginTop:-50,backgroundColor:'#2f4f4f'}}>
                    <AntDesign name="check" size={35} color={'white'} style={{}}/>

                </View>
                <Text style={{alignSelf:'center',fontSize:20,color:'black',marginTop:5}}>ManPower</Text>
               <Text style={{alignSelf:'center',fontSize:15,marginTop:10}}>ManPower details added Success</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                     
              
                <Button buttonColor='#2f4f4f' textColor='white' mode='outlined'  style={{alignSelf:'center',width:100,marginRight:responsiveWidth(25)}} onPress={()=>setpopup(false)}>ok</Button>
             </Dialog.Actions>
                   
                 </Dialog>
            </Portal>
            <ScrollView>
            <TouchableOpacity onPress={() =>{setOpen(true)
            console.log('true')
            }} style={{borderWidth:1,borderColor:'#cccccc',borderRadius:5,alignSelf:'flex-end',width:150,height:50,alignItems:'center',marginRight:20,marginTop:20}}>
                <View style={{flex:1,borderWidth:0,flexDirection:'row',alignItems:'center',}}>

         <Text style={{fontSize:16,color:'black',paddingHorizontal:5}}>{moment(date).format("DD-MM-YYYY")}</Text>
                    <Feather style={{ color: '#2f4f4f'}} name='calendar' size={32} />
                    <DatePicker
                    style={{ }}
                        mode='date'
                        modal
                       // minimumDate={new Date()}
                        open={open}
                        date={date}
                        onConfirm={value => {
                            setDate(value)
                            setOpen(false)
                          
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
                            <Text style={Styles.Label}>Mason(Male)</Text>

                            <TextInput
                                style={Styles.TextInput}
                                onChangeText={handleInputChange}
                                keyboardType='number-pad'
                                textAlign="center"
                                value={Mason}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Mason(H)</Text>

                            <TextInput
                                style={Styles.TextInput}
                                onChangeText={handleInputChange1}
                                keyboardType='number-pad'
                                textAlign="center"
                                value={MasonF}
                            />
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

// ManPower.navigationOptions = ({navigation}) => ({
//     // Set the title or other options for the screen
//     title: 'Your Screen',
//     // Add icons to the right side of the header
//     headerRight: () => (
//       <View style={{ flexDirection: 'row', marginRight: 16 }}>
//         <TouchableOpacity onPress={() => console.log('Right icon pressed')}>
//           <Entypo name="menu" size={24} color="black" style={{ marginRight: 50 }} />
//         </TouchableOpacity>
//       </View>
//     ),
//   });



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
export default ManPower;