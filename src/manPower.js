import React,{useState} from 'react';
import {Text,View,TextInput, Button, StyleSheet,ScrollView, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ManPower=({navigation})=>{
    const [text, onChangeText] = useState("");
    const [electrician,onChangeElect]=useState("");
    const[carpender,onChangeCarpender]=useState("");
    const[Plumber,onChangePlumber]=useState("");
    const[painter,onChangePainter]=useState("");
    const[fitter,onChangeFitter]=useState("");
    const[helper,onChangeHelper]=useState("");
    const[others,onChangeOthers]=useState("");


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
                <Text style={Styles.Label}>Mason</Text>

    <TextInput
    style={Styles.TextInput}
    onChangeText={onChangeText}
    value={text}
/>
</View>
<View style={Styles.ItemView} >
                <Text style={Styles.Label}>Electrician</Text>

    <TextInput
    style={Styles.TextInput}
    onChangeText={onChangeElect}
    value={electrician}
/>
</View>
<View style={Styles.ItemView} >
                <Text style={Styles.Label}>Carpender</Text>

    <TextInput
    style={Styles.TextInput}
    onChangeText={onChangeElect}
    value={electrician}
/>
</View>
<View style={Styles.ItemView} >
                <Text style={Styles.Label}>Plumber</Text>

    <TextInput
    style={Styles.TextInput}
    onChangeText={onChangePlumber}
    value={Plumber}
/>
</View>
<View style={Styles.ItemView} >
                <Text style={Styles.Label}>Painter</Text>

    <TextInput
    style={Styles.TextInput}
    onChangeText={onChangePainter}
    value={painter}
/>
</View>
<View style={Styles.ItemView} >
                <Text style={Styles.Label}>Fitter</Text>

    <TextInput
    style={Styles.TextInput}
    onChangeText={onChangeFitter}
    value={fitter}
/>
</View>
<View style={Styles.ItemView} >
                <Text style={Styles.Label}>Helpers</Text>

    <TextInput
    style={Styles.TextInput}
    onChangeText={onChangeHelper}
    value={helper}
/>
</View>
<View style={Styles.ItemView} >
                <Text style={Styles.Label}>others</Text>

    <TextInput
    style={Styles.TextInput}
    onChangeText={onChangeOthers}
    value={others}
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

ManPower.navigationOptions = ({navigation}) => ({
    // Set the title or other options for the screen
    title: 'Your Screen',
    // Add icons to the right side of the header
    headerRight: () => (
      <View style={{ flexDirection: 'row', marginRight: 16 }}>
        <TouchableOpacity onPress={() => console.log('Right icon pressed')}>
          <Entypo name="menu" size={24} color="black" style={{ marginRight: 50 }} />
        </TouchableOpacity>
      </View>
    ),
  });
  
  
export default ManPower;
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