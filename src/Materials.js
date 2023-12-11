import React,{useState} from 'react';
import {Text,View,TextInput, Button, StyleSheet,ScrollView, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Meterials=({navigation})=>{
    const [Bricks, onChangeBricks] = useState("");
    const [Cement,onChangeCement]=useState("");
    const[Msand,onChangeMsand]=useState("");
    const[Psand,onChangePsand]=useState("");
    const[Tiles,onChangeTiles]=useState("");
    const[Steelbar,onChangeSteelbar]=useState("");
   


    return(
    <View style={{flex:1}}>
        {/* <View style={{height:60,backgroundColor:'#2f4f4f',alignItems:'center',flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()}>
<Entypo name='menu' size={30} color={'white'} style={{marginLeft:20}}/>

</TouchableOpacity>
<Text style={Styles.HeaderText}>ManPower</Text>

        </View> */}
<ScrollView>
        <View style={{margin:20,elevation:1,backgroundColor:'white'}}>
            <View style={{margin:20,alignItems:'center',justifyContent:'center'}}>
            <View style={Styles.ItemView} >
                <Text style={Styles.Label}>Bricks(Nos)</Text>

    <TextInput
    style={Styles.TextInput}
    onChangeText={onChangeBricks}
    value={Bricks}
/>
</View>
<View style={Styles.ItemView} >
                <Text style={Styles.Label}>Cement</Text>

    <TextInput
    style={Styles.TextInput}
    onChangeText={onChangeCement}
    value={Cement}
/>
</View>
<View style={Styles.ItemView} >
                <Text style={Styles.Label}>M.Sand(Unit)</Text>

    <TextInput
    style={Styles.TextInput}
    onChangeText={onChangeMsand}
    value={Msand}
/>
</View>
<View style={Styles.ItemView} >
                <Text style={Styles.Label}>P.Sand(Unit)</Text>

    <TextInput
    style={Styles.TextInput}
    onChangeText={onChangePsand}
    value={Psand}
/>
</View>
<View style={Styles.ItemView} >
                <Text style={Styles.Label}>Tiles</Text>

    <TextInput
    style={Styles.TextInput}
    onChangeText={onChangeTiles}
    value={Tiles}
/>
</View>
<View style={Styles.ItemView} >
                <Text style={Styles.Label}>Steel Bar(kg):</Text>

    <TextInput
    style={Styles.TextInput}
    onChangeText={onChangeSteelbar}
    value={Steelbar}
/>
</View>



    </View>


</View>
<View style={{backgroundColor:'#2f4f4f',alignItems:'center',justifyContent:'center',width:150,
alignSelf:'center'}}>
 <Text style={{fontSize:14,padding:10,color:'white'}}>Submit</Text>
   </View>
   </ScrollView>
   </View>

        
    )
}


  
  
export default Meterials;
const Styles=StyleSheet.create({
    ItemView:{
        flexDirection:'row',marginVertical:10,alignItems:'center'
    },
    TextInput:{
       borderWidth:1,padding:8,flex:1,borderColor:'#2f4f4f',borderRadius:10
    },
    Label:{
        marginRight:10,width:150,fontSize:12,color:'black'

    },
    HeaderText:{
        fontSize:22,
        color:'white',
        marginLeft:20

    }
})