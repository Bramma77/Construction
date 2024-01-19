import React, { useState } from 'react';
import { Text, View, TextInput,  StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import database from '@react-native-firebase/database';
import { Portal ,Dialog,Provider,Button} from 'react-native-paper';
import { responsiveWidth } from 'react-native-responsive-dimensions';


const Workreport = ({ navigation,route }) => {
    const{item}=route.params;
    const [Workreport, onChangeWorkreport] = useState("");
    const [Cement, onChangeCement] = useState("");
    const [Msand, onChangeMsand] = useState("");
    const [Psand, onChangePsand] = useState("");
    const [Tiles, onChangeTiles] = useState("");
    const [Steelbar, onChangeSteelbar] = useState("");
    const[Aggregate,onChangeAggregate]=useState("");
    const[Bricks,onChangeBricks]=useState("");
    const[open,setOpen]=useState(false);
    const[date,setDate]=useState(new Date())
    const[popup,setpopup]=useState(false)

    const onSubmit = () => {
        const reference = database().ref('Construction').child('ProjectView').child('Workreport');
        reference.child(item.key).child(`${moment(date).format('YYYY-MM-DD')}`).set({
           Workreport:Workreport
          
        }).then((res) =>{ setpopup(true)
        onChangeWorkreport("")
        })
    }


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
                <Text style={{alignSelf:'center',fontSize:20,color:'black',marginTop:5}}>Work Report</Text>
               <Text style={{alignSelf:'center',fontSize:15,marginTop:10}}>Work Report Updated Success</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                     
              
                <Button buttonColor='#2f4f4f' textColor='white' mode='outlined'  style={{alignSelf:'center',width:100,marginRight:responsiveWidth(25)}} onPress={()=>setpopup(false)}>ok</Button>
             </Dialog.Actions>
                   
                 </Dialog>
            </Portal>
           
            <ScrollView>
            <TouchableOpacity onPress={() => { setOpen(true) }} style={{borderWidth:1,borderColor:'#cccccc',borderRadius:5,alignSelf:'flex-end',width:150,height:50,alignItems:'center',marginRight:20,marginTop:20}}>
                <View style={{flex:1,borderWidth:0,flexDirection:'row',alignItems:'center',}}>

         <Text style={{fontSize:16,color:'black',paddingHorizontal:5}}>{moment(date).format("DD-MM-YYYY")}</Text>
                    <Feather style={{ color: '#2f4f4f'}} name='calendar' size={32} />
                    <DatePicker
                    style={{ }}
                        mode='date'
                        modal
                        minimumDate={new Date()}
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
                <View style={{ margin: 20, elevation: 1, backgroundColor: 'white' ,}}>
                    <View style={{ margin: 0,borderWidth:0 }}>
                       

                            <TextInput
                                style={Styles.TextInput}
                               
                                multiline={true}
                                onChangeText={onChangeWorkreport}
                                value={Workreport}
                            />
                       



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




export default Workreport;
const Styles = StyleSheet.create({
    ItemView: {
        flexDirection: 'row', marginVertical: 10, alignItems: 'center'
    },
    TextInput: {
        borderWidth: 1, padding: 8,  textAlignVertical:'top', flex: 1, borderColor: '#2f4f4f', borderRadius: 10,height:250,color:'black'
    },
    Label: {
        marginRight: 10, width: 150, fontSize: 12, color: 'black'

    },
    HeaderText: {
        fontSize: 22,
        color: 'white',
        marginLeft: 20

    }
})