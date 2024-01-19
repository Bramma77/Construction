import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Portal ,Dialog,Provider,Button} from 'react-native-paper';
import { responsiveWidth } from 'react-native-responsive-dimensions';


const AddProject = ({ navigation }) => {
    const [ProjectName, onChangeProjectName] = useState("");
    const [ClientName, onChangeClientName] = useState("");
    const [SiteLocation, onChangeSiteLocation] = useState("");
    const [Budget, onChangeBudget] = useState("");
    const [InitialAmount, onChangeInitialAmount] = useState("");
    const [ProjectStatus, onChangeProjectStatus] = useState("");
    const[popup,setpopup]=useState(false)


    const user=auth().currentUser.uid

    const reference = database().ref('Construction');

    const onSubmit=()=>{
        if(ProjectName!="" && SiteLocation!=""&&ClientName!=""&&Budget!=""&&InitialAmount!=""){
         reference.child('ProjectList').push({
        Projectname:ProjectName,
        SiteLocation:SiteLocation,
        Clientname:ClientName,
        Budget:Budget,
        Initialamount:InitialAmount,
        Projectstatus:ProjectStatus
    }).then((res)=>setpopup(true))
}else{
    ToastAndroid.show( `Please enter empty fields`, ToastAndroid.SHORT);
}
    }


    return (
        <Provider>
        <View style={{ flex: 1 }}>
            <View style={{height:60,backgroundColor:'#2f4f4f',alignItems:'center',flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
<AntDesign name='arrowleft' size={25} color={'white'} style={{marginLeft:20}}/>

</TouchableOpacity>
<Text style={Styles.HeaderText}>Add Project</Text>

        </View>
        <Portal>
            <Dialog visible={popup}>
                 {/* <Dialog.Title style={{fontSize:17}}>Meterial </Dialog.Title> */}
                 <Dialog.Content>
                 <View style={{height:50,width:50,borderRadius:50,borderWidth:0,alignSelf:'center',alignItems:'center',justifyContent:'center',marginTop:-50,backgroundColor:'#2f4f4f'}}>
                    <AntDesign name="check" size={35} color={'white'} style={{}}/>

                </View>
                <Text style={{alignSelf:'center',fontSize:20,color:'black',marginTop:5}}>Material</Text>
                  <Text style={{alignSelf:'center',fontSize:15,marginTop:10}}>Project Created Success </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                     
              
                <Button buttonColor='#2f4f4f' textColor='white' mode='outlined'  style={{alignSelf:'center',width:100,marginRight:responsiveWidth(25)}} onPress={()=>{setpopup(false)
                navigation.goBack();
                }}>ok</Button>
             </Dialog.Actions>
                   
                 </Dialog>
            </Portal>
            <ScrollView>
                <View style={{ margin: 20, elevation: 1, backgroundColor: 'white' }}>
                    <View style={{ margin: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Project Name</Text>

                            <TextInput
                                style={Styles.TextInput}
                                onChangeText={onChangeProjectName}
                                value={ProjectName}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>SiteLocation</Text>

                            <TextInput
                                style={Styles.TextInput}
                                onChangeText={onChangeSiteLocation}
                                value={SiteLocation}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Client Name</Text>

                            <TextInput
                                style={Styles.TextInput}
                                onChangeText={onChangeClientName}
                                value={ClientName}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Budget</Text>

                            <TextInput
                                style={Styles.TextInput}
                                onChangeText={onChangeBudget}
                                keyboardType='number-pad'
                                value={Budget}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Initial Amount</Text>

                            <TextInput
                                style={Styles.TextInput}
                                onChangeText={onChangeInitialAmount}
                                keyboardType='number-pad'
                                value={InitialAmount}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Project Status</Text>

                            <TextInput
                                style={Styles.TextInput}
                                onChangeText={onChangeProjectStatus}
                                value={ProjectStatus}
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




export default AddProject;
const Styles = StyleSheet.create({
    ItemView: {
        flexDirection: 'row', marginVertical: 10, alignItems: 'center'
    },
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

    }
})