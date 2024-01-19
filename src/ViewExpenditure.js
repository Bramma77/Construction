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
  
  


const ViewExpenditure = ({ navigation, route }) => {

    const { item } = route.params;
    const [Bricks, setBricks] = useState(0);
    const [Cement, setCement] = useState(0);
    const [Msand, setMsand] = useState(0);
    const [Psand, setPsand] = useState(0);
    const [Tiles, setTiles] = useState(0);
    const [Steelbar, setSteelbar] = useState(0);
    const [Aggregate, setAggregate] = useState(0)
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date())
    
    const [isOpen, setisOpen] = useState(false);
    const [list, setlist] = useState("Material")
    const [slidedown, setslidedown] = useState(false)
    const [viewSlide, setViewSlide] = useState(false);

    const [MasonMale, setMasonMale] = useState(0);
    const[MasonFemale,setMasonFemale]=useState(0);
    const [electrician, setElect] = useState(0);
    const [carpender, setCarpender] = useState(0);
    const [Plumber, setPlumber] = useState(0);
    const [painter, setPainter] = useState(0);
    const [fitter, setFitter] = useState(0);
    const [helper, setHelper] = useState(0);
    const [others, setOthers] = useState(0);
    const [MasonMalecount, setMasonMalecount] = useState(0);
    const[MasonFemalecount,setMasonFemalecount]=useState(0);
    const [electriciancount, setElectcount] = useState(0);
    const [carpendercount, setCarpendercount] = useState(0);
    const [Plumbercount, setPlumbercount] = useState(0);
    const [paintercount, setPaintercount] = useState(0);
    const [fittercount, setFittercount] = useState(0);
    const [helpercount, setHelpercount] = useState(0);
    const [otherscount, setOtherscount] = useState(0);

   

    const[Meterial,setMeterial]=useState([]);
    const[Manpower,setManpower]=useState([]);
    const[Startdate,setStartdate]=useState(new Date());
    const[Startdateopen,setStartdateopen]=useState(false);

    const [MenuAnchor, setMenuAnchor] = useState();
    const MaterialHead = ['No', 'Material', 'Cost',];
    const MaterialData = [
        ['1', "Bricks", `${Bricks}₹`],
        ['2', "Cement(Nos)",`${Cement}₹` ],
        ['3', "M.Sand(Unit)", `${Msand}₹`],
        ['4', "P.Sand(Unit)", `${Psand}₹`],
        ['5', "Tiles(Nos)", `${Tiles}₹`],
        ['6', "Steel Bar(kgs)", `${Steelbar}₹`],
        ['7', "Aggregate 20mm(Unit)", `${Aggregate}₹`],
        ['8', "Total", `${Aggregate+Steelbar+Tiles+Psand+Msand+Cement+Bricks}₹`],
    ];
    const ManPowerHead = ['No', 'Man Power', 'Count','Wages'];
    const Manpowerdata = [
        ['1', "Mason(Male)",MasonMalecount, `${MasonMale}₹`],
        ['2', "Mason(H)",MasonFemalecount, `${MasonFemale}₹`],
        ['3', "Electrician", electriciancount,`${electrician}₹`],
        ['4', "Carpender",carpendercount, `${carpender}₹`],
        ['5', "Plumber",Plumbercount, `${Plumber}₹`],
        ['6', "Painter",paintercount, `${painter}₹`],
        ['7', "Fitter", fittercount,`${fitter}₹`],
        ['8', "Helpers",helpercount, `${helper}₹`],
        ['9', "Others", otherscount,`${others}₹`],
        ['10', "Total", "",`${others+helper+fitter+Plumber+carpender+electrician+MasonFemale+MasonMale}₹`],
    ];

    const openMenu = (event) => {
        const { nativeEvent } = event;
        const anchor = {
            x: nativeEvent.pageX,
            y: nativeEvent.pageY,
        }
        setMenuAnchor(anchor);
        setisOpen(true);
    }
    // useEffect(()=>{
        
    //     const dataRef = database().ref('Construction').child('ProjectView').child('Manpower').child(item.key);
    //     console.log(dataRef)
    //     const startDate = `${moment(Startdate).format("YYYY-MM-DD")}`;
    //     const endDate = `${moment(date).format("YYYY-MM-DD")}`; 
    //     const onValueChange = dataRef.on('value', (snapshot) => {
          
    //         setManpower(snapshot.val())
    //     //  console.log(snapshot.val())
    //       console.log('manpoer',Manpower)
           
    //       });
      
    //       return () => {
    //         dataRef.off('value', onValueChange);
    //       };
    // },[date])

    useEffect(()=>{     
        const dataRef = database().ref('Construction').child('ProjectView').child('ManpowerCost').child(`${item.key}`);
        const startDate = `${moment(Startdate).format("YYYY-MM-DD")}`;
        const endDate = `${moment(date).format("YYYY-MM-DD")}`; 
        const onValueChange = dataRef.on('value', (snapshot) => {
          const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
          const formattedData = items.map(([key, value]) => ({ key, ...value }));
          console.log('formatteddata',formattedData)
         const amount= formattedData.filter((item=>{
            const itemDate = item.key;
            return itemDate >= startDate && itemDate <= endDate;
           
         
        }))
       
        console.log('totalamount',amount)
       
        const amount1= amount.reduce((sum,item)=>{
            const masonamount=item.masonMale===""?0:parseInt(item.masonMale)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
           console.log('amount1',amount1)
           setMasonMale(amount1)
   
    const amount2= amount.reduce((sum,item)=>{
        const masonamount=item.masonFemale===""?0:parseInt(item.masonFemale)
      return isNaN(masonamount)?sum:sum+masonamount;
       },0)
      
       setMasonFemale(amount2)
       const amount3= amount.reduce((sum,item)=>{
        const masonamount=item.electrician===""?0:parseInt(item.electrician)
      return isNaN(masonamount)?sum:sum+masonamount;
       },0)
     setElect(amount3)
     const amount4= amount.reduce((sum,item)=>{
        const masonamount=item.carpender===""?0:parseInt(item.carpender)
      return isNaN(masonamount)?sum:sum+masonamount;
       },0)
      
       setCarpender(amount4)
       const amount5= amount.reduce((sum,item)=>{
        const masonamount=item.plumber===""?0:parseInt(item.plumber)
      return isNaN(masonamount)?sum:sum+masonamount;
       },0)
      
       setPlumber(amount5)
       const amount6= amount.reduce((sum,item)=>{
        const masonamount=item.painter===""?0:parseInt(item.painter)
      return isNaN(masonamount)?sum:sum+masonamount;
       },0)
      
       setPainter(amount6)
       const amount7= amount.reduce((sum,item)=>{
        const masonamount=item.fitter===""?0:parseInt(item.fitter)
      return isNaN(masonamount)?sum:sum+masonamount;
       },0)
      
       setFitter(amount7)
       const amount8= amount.reduce((sum,item)=>{
        const masonamount=item.helper===""?0:parseInt(item.helper)
      return isNaN(masonamount)?sum:sum+masonamount;
       },0)
      
       setHelper(amount8)
       const amount9= amount.reduce((sum,item)=>{
        const masonamount=item.others===""?0:parseInt(item.others)
      return isNaN(masonamount)?sum:sum+masonamount;
       },0)
      
       setOthers(amount9)
       
})

         return () => {
            dataRef.off('value', onValueChange);
          };
        },[Startdate,date])
        useEffect(()=>{     
            const dataRef = database().ref('Construction').child('ProjectView').child('Manpower').child(`${item.key}`);
            const startDate = `${moment(Startdate).format("YYYY-MM-DD")}`;
            const endDate = `${moment(date).format("YYYY-MM-DD")}`; 
            const onValueChange = dataRef.on('value', (snapshot) => {
              const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
              const formattedData = items.map(([key, value]) => ({ key, ...value }));
              console.log('formatteddata',formattedData)
             const amount= formattedData.filter((item=>{
                const itemDate = item.key;
                return itemDate >= startDate && itemDate <= endDate;
               
             
            }))
           
            console.log('totalamount',amount)
           
            const amount1= amount.reduce((sum,item)=>{
                const masonamount=item.masonMale===""?0:parseInt(item.masonMale)
              return isNaN(masonamount)?sum:sum+masonamount;
               },0)
               console.log('amount1',amount1)
               setMasonMalecount(amount1)
       
        const amount2= amount.reduce((sum,item)=>{
            const masonamount=item.masonFemale===""?0:parseInt(item.masonFemale)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
          
           setMasonFemalecount(amount2)
           const amount3= amount.reduce((sum,item)=>{
            const masonamount=item.electrician===""?0:parseInt(item.electrician)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
         setElectcount(amount3)
         const amount4= amount.reduce((sum,item)=>{
            const masonamount=item.carpender===""?0:parseInt(item.carpender)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
          
           setCarpendercount(amount4)
           const amount5= amount.reduce((sum,item)=>{
            const masonamount=item.plumber===""?0:parseInt(item.plumber)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
          
           setPlumbercount(amount5)
           const amount6= amount.reduce((sum,item)=>{
            const masonamount=item.painter===""?0:parseInt(item.painter)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
          
           setPaintercount(amount6)
           const amount7= amount.reduce((sum,item)=>{
            const masonamount=item.fitter===""?0:parseInt(item.fitter)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
          
           setFittercount(amount7)
           const amount8= amount.reduce((sum,item)=>{
            const masonamount=item.helper===""?0:parseInt(item.helper)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
          
           setHelpercount(amount8)
           const amount9= amount.reduce((sum,item)=>{
            const masonamount=item.others===""?0:parseInt(item.others)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
          
           setOtherscount(amount9)
           
    })
    
             return () => {
                dataRef.off('value', onValueChange);
              };
            },[Startdate,date])
    

    useEffect(()=>{
        
        const dataRef = database().ref('Construction').child('ProjectView').child('MeterialCost').child(item.key);
        const startDate = `${moment(Startdate).format("YYYY-MM-DD")}`;
            const endDate = `${moment(date).format("YYYY-MM-DD")}`; 
            const onValueChange = dataRef.on('value', (snapshot) => {
              const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
              const formattedData = items.map(([key, value]) => ({ key, ...value }));
              console.log('formatteddata',formattedData)
             const amount= formattedData.filter((item=>{
                const itemDate = item.key;
                return itemDate >= startDate && itemDate <= endDate;
               
             
            }))
           
            console.log('totalamount',amount)
           
            const amount1= amount.reduce((sum,item)=>{
                const masonamount=item.Bricks===""?0:parseInt(item.Bricks)
              return isNaN(masonamount)?sum:sum+masonamount;
               },0)
               console.log('amount1',amount1)
               setBricks(amount1)
       
        const amount2= amount.reduce((sum,item)=>{
            const masonamount=item.Cement===""?0:parseInt(item.Cement)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
          
           setCement(amount2)
           const amount3= amount.reduce((sum,item)=>{
            const masonamount=item.Msand===""?0:parseInt(item.Msand)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
         setMsand(amount3)
         const amount4= amount.reduce((sum,item)=>{
            const masonamount=item.Psand===""?0:parseInt(item.Psand)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
          
           setPsand(amount4)
           const amount5= amount.reduce((sum,item)=>{
            const masonamount=item.Tiles===""?0:parseInt(item.Tiles)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
          
           setTiles(amount5)
           const amount6= amount.reduce((sum,item)=>{
            const masonamount=item.Steelbar===""?0:parseInt(item.Steelbar)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
          
           setSteelbar(amount6)
           const amount7= amount.reduce((sum,item)=>{
            const masonamount=item.Aggregate===""?0:parseInt(item.Aggregate)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)
          
           setAggregate(amount7)
         
           
    })
    
             return () => {
                dataRef.off('value', onValueChange);
              };
    },[date,Startdate])
    // useEffect(()=>{
        
    //     const dataRef = database().ref('Construction').child('ProjectView').child('ManpowerCost').child(item.key).child(`${moment(date).format('YYYY-MM-DD')}`);
    //     console.log(dataRef)
    //     const onValueChange = dataRef.on('value', (snapshot) => {
          
    //       //  setManpower(snapshot.val())
    //     //  console.log(snapshot.val())
    //       console.log('material',Meterial)
           
    //       });
      
    //       return () => {
    //         dataRef.off('value', onValueChange);
    //       };
    // },[date])
    const reference = database().ref('Construction').child('ProjectView').child('Manpower');

  


    return (
        <Provider>
            <View style={{ flex: 1,backgroundColor:'white' }}>
                <View style={{margin:20}}>
               
                <View style={Styles.Rowcontainer}>
              
                
                <TouchableOpacity onPress={() => { setStartdateopen(true) }} style={{ borderWidth: 1, borderColor: '#cccccc', borderRadius: 5, alignSelf: 'flex-end', alignItems: 'center', }}>
                <Text style={{fontSize:12,color:'black'}}>Start Date</Text>
                                    <View style={{  borderWidth: 0, flexDirection: 'row', alignItems: 'center',margin:5 ,justifyContent:'center'}}>

                                        <Text style={{ fontSize: 16, color: 'black', paddingHorizontal: 5 }}>{moment(Startdate).format("DD-MM-YYYY")}</Text>
                                        <Feather style={{ color: '#2f4f4f' }} name='calendar' size={30} />
                                        <DatePicker
                                            style={{}}
                                            mode='date'
                                            modal
                                          //  minimumDate={new Date()}
                                            open={Startdateopen}
                                            date={Startdate}
                                            onConfirm={value => {
                                                setStartdateopen(false)
                                                setStartdate(value)
                                            }}
                                            onCancel={() => {
                                                setStartdateopen(false)
                                            }}
                                        />

                                    </View>
                                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setOpen(true) }} style={{ borderWidth: 1, borderColor: '#cccccc', borderRadius: 5, alignSelf: 'flex-end', alignItems: 'center', }}>
                <Text style={{fontSize:12,color:'black'}}>End Date</Text>
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
               

              
                    <ScrollView>
                        <View style={{marginBottom:50}}>

   <Text style={{ fontSize:17,fontWeight:'bold',color:'black',marginTop:20 }}>View Manpower Expenditure</Text>
                    
                        <View style={{ elevation: 1, backgroundColor: 'white' ,marginTop:10}}>
                             
                               
                          
                          
                            
                    
                            <View style={{  }}>

                                <Table borderStyle={{ borderWidth: 1, borderColor: 'white', }}>
                                    <Row data={ManPowerHead} style={Styles.head} textStyle={Styles.text} />
                                    <Rows data={Manpowerdata} style={Styles.content} textStyle={Styles.text1} />
                                </Table>

                            </View>
                        </View>
                        
                
      <Text style={{ marginLeft: 0,marginTop:20,fontSize:17,color:'black',width:responsiveWidth(60),fontWeight:'bold' }}>View Material Expenditure</Text>
                           
                       
                       
                        <View style={{ marginTop: 10, elevation: 1, backgroundColor: 'white' }}>
                            
                            <View style={{ marginBottom: 30 }}>

                                <Table borderStyle={{ borderWidth: 1, borderColor: 'white' }}>
                                    <Row data={MaterialHead} style={Styles.head} textStyle={[Styles.text2]} />
                                    <Rows data={MaterialData} style={Styles.content} textStyle={Styles.text1} />
                                </Table>

                            </View>
                        </View>
                        </View>
                    </ScrollView>
              
            </View>
            </View>

        </Provider>
    )
}



export default ViewExpenditure;
const Styles = StyleSheet.create({
    head: {  backgroundColor: '#2f4f4f' },
    text: { margin: 3, textAlign: 'center', fontSize: 17, color: 'white',fontWeight:'bold' },
    text1: { margin: 6, textAlign: 'center', fontSize: 12, color: 'black' },
    text2: { margin: 5, textAlign: 'center', fontSize: 17, color: 'white',fontWeight:'bold' },
    ItemView: {
        flexDirection: 'row', marginVertical: 10, alignItems: 'center'
    },
    content:{backgroundColor:'#cccccc'},
    TextInput: {
        borderWidth: 1, padding: 8, flex: 1, borderColor: '#2f4f4f', borderRadius: 10,
    },
    Label: {
        marginRight: 10, width: 150, fontSize: 12, color: 'black'

    },
    HeaderText: {
        fontSize: 12,
        color: 'white',
        marginLeft: 20

    },
    Rowcontainer:{
        flexDirection:'row',justifyContent:'space-between',marginTop:10
    }
})