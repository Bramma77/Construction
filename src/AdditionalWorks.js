// import React,{useState} from "react";
// import {View,Text,ImageBackground,TextInput,TouchableOpacity,ScrollView,StyleSheet, ToastAndroid} from 'react-native';
// import { responsiveWidth } from "react-native-responsive-dimensions";
// import database from '@react-native-firebase/database';
// import { Portal ,Dialog,Provider,Button} from 'react-native-paper';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const AdditionalWork=({route})=>{
//     const{item}=route.params;

// const[UnderGroundSumpQuantity,setundergroundsumpquantity]=useState("");
// const[UnderGroundSumpRate,setUnderGroundSumpRate]=useState("");
// const[OverHeadTankQuantity,setOverHeadTankQuantity]=useState("");
// const[OverHeadTankRate,setOverHeadTankRate]=useState("");
// const[SepticTankQuantity,setSepticTankQuantity]=useState("");
// const[SepticTankRate,setSepticTankRate]=useState("");
// const[SoakpitQuantity,setSoakpitQuantity]=useState("");
// const[SoakpitRate,setSoakpitRate]=useState("");
// const[highCompountWall,sethighCompountWall]=useState("");
// const[Maingate,setMainGate]=useState("");
// const[Pile,setPile]=useState("");
// const[backfilling,setbackfilling]=useState("");
// const[Extrabasement,setExtrabasement]=useState("");
// const[popup,setpopup]=useState(false)

// const reference = database().ref('Construction').child('ProjectView').child('AdditionalWork').child(`${item.key}`);

// const handleInputChange= (text) => {
//     const numericInput = text.replace(/[^0-9]/g, '');
//      setundergroundsumpquantity(numericInput);
//    };
//    const handleInputChange1= (text) => {
//     const numericInput = text.replace(/[^0-9]/g, '');
//      setUnderGroundSumpRate(numericInput);
//    };
//    const handleInputChange2= (text) => {
//     const numericInput = text.replace(/[^0-9]/g, '');
//      setOverHeadTankQuantity(numericInput);
//    };
//    const handleInputChange3= (text) => {
//     const numericInput = text.replace(/[^0-9]/g, '');
//      setOverHeadTankRate(numericInput);
//    };
//    const handleInputChange4= (text) => {
//     const numericInput = text.replace(/[^0-9]/g, '');
//      setSepticTankQuantity(numericInput);
//    };
//    const handleInputChange5= (text) => {
//     const numericInput = text.replace(/[^0-9]/g, '');
//      setSepticTankRate(numericInput);
//    };


// const onSubmit=()=>{
//     if(UnderGroundSumpQuantity!=""||OverHeadTankQuantity!=""||SepticTankQuantity!=""){
//     reference.set({
//         UnderGroundSumpQuantity:UnderGroundSumpQuantity,
//         UnderGroundSumpRateP:UnderGroundSumpRate,
//         UnderGroundSumpAmount:UnderGroundSumpQuantity*UnderGroundSumpRate,
//         OverHeadTankQuantity:OverHeadTankQuantity,
//         OverHeadTankRate:OverHeadTankRate,
//         OverHeadTankAmount:OverHeadTankQuantity*OverHeadTankRate,
//         SepticTankQuantity:SepticTankQuantity,
//         SepticTankRate:SepticTankRate,
//         SepticTankAmount:SepticTankQuantity*SepticTankRate


//     }).then((res) =>{
//         setpopup(true) 
//     setUnderGroundSumpRate("")
//     setundergroundsumpquantity("")
//     setOverHeadTankQuantity("");
//     setOverHeadTankRate("");
//     setSepticTankQuantity("");
//     setSepticTankRate("");
//     })
// }
// else{
//     ToastAndroid.show( "Please enter any one field", ToastAndroid.SHORT);
// }

// }

//     return(
//         <Provider>
//         <View style={{flex:1}}>
//               <Portal>
//             <Dialog visible={popup}>
//                  {/* <Dialog.Title style={{fontSize:17}}>Meterial </Dialog.Title> */}
//                  <Dialog.Content>
//                  <View style={{height:50,width:50,borderRadius:50,borderWidth:0,alignSelf:'center',alignItems:'center',justifyContent:'center',marginTop:-50,backgroundColor:'#2f4f4f'}}>
//                     <AntDesign name="check" size={35} color={'white'} style={{}}/>

//                 </View>
//                 <Text style={{alignSelf:'center',fontSize:20,color:'black',marginTop:5}}>Additional Work</Text>
//                   <Text style={{alignSelf:'center',fontSize:15,marginTop:10}}>Added Success</Text>
//                     </Dialog.Content>
//                     <Dialog.Actions>
                     
              
//                 <Button buttonColor='#2f4f4f' textColor='white' mode='outlined'  style={{alignSelf:'center',width:100,marginRight:responsiveWidth(25)}} onPress={()=>setpopup(false)}>ok</Button>
//              </Dialog.Actions>
                   
//                  </Dialog>
//             </Portal>
//            <ScrollView>
//     <View style={{ margin: 10,justifyContent: 'center', }}>
 
   
//     <View style={Styles.card}>
//         <ImageBackground source={require('./const5.jpg')} resizeMode="cover" style={{padding:20}}  >
//          <View style={[Styles.ItemView]}>
//             <Text style={Styles.Label}>Under Ground Sump(lit):</Text>
//             <TextInput
//                 style={Styles.TextInput}
//                 onChangeText={handleInputChange}
//                 textAlign="center"
//                 keyboardType='number-pad'
//                 value={UnderGroundSumpQuantity}
//             />
//             </View>
//            <View style={Styles.ItemView} >
//             <Text style={Styles.Label}>Rate:</Text>

//             <TextInput
//                 style={Styles.TextInput}
//                 keyboardType='number-pad'
//                 textAlign="center"
//                 onChangeText={handleInputChange1}
//                 value={UnderGroundSumpRate}
//             />
//         </View>
//         </ImageBackground>
//         </View>
//         <View style={Styles.card}>
//         <ImageBackground source={require('./const5.jpg')} resizeMode="cover" style={{padding:20}}  >
//          <View style={[Styles.ItemView]}>
//             <Text style={Styles.Label}>Overhead Tank Sintex(lit):</Text>
//             <TextInput
//                 style={Styles.TextInput}
//                 onChangeText={handleInputChange2}
//                 textAlign="center"
//                 keyboardType='number-pad'
//                 value={OverHeadTankQuantity}
//             />
//             </View>
//            <View style={Styles.ItemView} >
//             <Text style={Styles.Label}>Rate:</Text>

//             <TextInput
//                 style={Styles.TextInput}
//                 keyboardType='number-pad'
//                 textAlign="center"
//                 onChangeText={handleInputChange3}
//                 value={OverHeadTankRate}
//             />
//         </View>
//         </ImageBackground>
//         </View>
//         <View style={Styles.card}>
//         <ImageBackground source={require('./const5.jpg')} resizeMode="cover" style={{padding:20}}  >
//          <View style={[Styles.ItemView]}>
//             <Text style={Styles.Label}>Septic Tank(lit):</Text>
//             <TextInput
//                 style={Styles.TextInput}
//                 onChangeText={handleInputChange4}
//                 textAlign="center"
//                 keyboardType='number-pad'
//                 value={SepticTankQuantity}
//             />
//             </View>
//            <View style={Styles.ItemView}>
//             <Text style={Styles.Label}>Rate:</Text>

//             <TextInput
//                 style={Styles.TextInput}
//                 keyboardType='number-pad'
//                 textAlign="center"
//                 onChangeText={handleInputChange5}
//                 value={SepticTankRate}
//             />
//         </View>
//         </ImageBackground>
//         </View>
//         {/* <View style={Styles.card}>
//         <ImageBackground source={require('./const5.jpg')} resizeMode="cover" style={{padding:20}}  >
//          <View style={[Styles.ItemView]}>
//             <Text style={Styles.Label}>Soak Pit(cement ring)lit:</Text>
//             <TextInput
//                 style={Styles.TextInput}
//                 onChangeText={setSoakpitQuantity}
//                 textAlign="center"
//                 value={SoakpitQuantity}
//             />
//             </View>
//            <View style={Styles.ItemView}>
//             <Text style={Styles.Label}>Rate:</Text>

//             <TextInput
//                 style={Styles.TextInput}
//                 keyboardType='number-pad'
//                 textAlign="center"
//                 onChangeText={setSoakpitRate}
//                 value={SoakpitRate}
//             />
//         </View>
//         </ImageBackground>
//         </View> */}

// <TouchableOpacity onPress={onSubmit} style={{
//                     backgroundColor: '#ff9900', alignItems: 'center', justifyContent: 'center', width: 150,
//                     alignSelf: 'center',borderRadius:10}}>
               
//                     <Text style={{ fontSize: 14, padding: 10, color: 'white' }}>Submit</Text>
//                     </TouchableOpacity>
//         </View>
//         </ScrollView>
//         </View>
//         </Provider>
//     )
// }
// export default AdditionalWork
// const Styles = StyleSheet.create({
//     ItemView: {
//       flexDirection: 'row', marginVertical: 10, alignItems: 'center'
//   },
//   TextInput: {
//       borderWidth: 1, padding: 8,fontSize: 14,color:'black', flex: 1, borderColor: '#2f4f4f', borderRadius: 10,backgroundColor:'white'
//   },
//   Label: {
//       marginRight: 10,fontWeight:'bold', fontSize: 14, color: 'white',width:responsiveWidth(40)
  
//   },
//     container: {
//       padding: 20,
//     },
//     card:{
//       backgroundColor:'white',elevation:2,padding:5,borderRadius:10,marginVertical:10
//     },
//     header: {
//       marginBottom: 20,
//     },
//     headerText: {
//       fontSize: 20,
//       fontWeight: 'bold',
//     },
// })