import React,{useEffect,useState} from "react";
import{View,Text,FlatList,StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Table, Row, Rows } from 'react-native-table-component';
import { Provider } from "react-native-paper";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { ScrollView } from "react-native-gesture-handler";

const TotalAmount=({navigation,route})=>{
    const{item}=route.params;
  
    const[AmountData,setAmountData]=useState(false);
    const [MasonMale, setMasonMale] = useState(0);
    const [masonFemale, setMasonFemale] = useState(0);
    const [electrician, setElect] = useState(0);
    const [carpender, setCarpender] = useState(0);
    const [Plumber, setPlumber] = useState(0);
    const [painter, setPainter] = useState(0);
    const [fitter, setFitter] = useState(0);
    const [helper, setHelper] = useState(0);
    const [others, setOthers] = useState(0);
    const [Bricks, setBricks] = useState(0);
    const [Cement, setCement] = useState(0);
    const [Msand, setMsand] = useState(0);
    const [Psand, setPsand] = useState(0);
    const [Tiles, setTiles] = useState(0);
    const [Steelbar, setSteelbar] = useState(0);
    const [Aggregate, setAggregate] = useState(0)
   
   
    useEffect(() => {
      
      const dataRef = database().ref('Construction').child('ProjectView').child('MeterialCost').child(`${item.key}`);
  
      // Set up a listener for real-time updates
      const onValueChange = dataRef.on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
       
      console.log(formattedData)
      
       const amount1= formattedData.reduce((sum,item)=>
       {const brickamount=item.Bricks===""?0:parseInt(item.Bricks)
       return isNaN(brickamount) ? sum : sum + brickamount;
      },0)
       const amount2= formattedData.reduce((sum,item)=>{
        const cementamount=item.Cement===""?0:parseInt(item.Cement)
        return isNaN(cementamount)?sum:sum+cementamount;
        },0)
       const amount3= formattedData.reduce((sum,item)=>{
       const msandamount=item.Msand===""?0:parseInt(item.Msand)
       return isNaN(msandamount)?sum:sum+msandamount;
       },0)
       
       const amount4= formattedData.reduce((sum,item)=>
       {
        const psandamount=item.Psand===""?0:parseInt(item.Psand)
        return isNaN(psandamount)?sum:sum+psandamount;
        },0)
      
       const amount5= formattedData.reduce((sum,item)=>
       {
        const tilesamount=item.Tiles===""?0:parseInt(item.Tiles)
        return isNaN(tilesamount)?sum:sum+tilesamount;
       },0)
      
       const amount6= formattedData.reduce((sum,item)=>
       {
        const steelbaramount=item.Steelbar===""?0:parseInt(item.Steelbar)
        return isNaN(steelbaramount)?sum:sum+steelbaramount;
       },0)
       
     
       const amount7= formattedData.reduce((sum,item)=>
       {
        const Aggregateamount=item.Aggregate===""?0:parseInt(item.Aggregate)
        return isNaN(Aggregateamount)?sum:sum+Aggregateamount;
       },0)
       
      
       console.log(amount1)
      

       setBricks(amount1)
       setCement(amount2)
       setMsand(amount3)
       setPsand(amount4)
       setTiles(amount5)
       setSteelbar(amount6)
       setAggregate(amount7)
      
      
      });

   return () => {
        dataRef.off('value', onValueChange);
      };
    }, []);


    useEffect(() => {
      
        const dataRef = database().ref('Construction').child('ProjectView').child('ManpowerCost').child(`${item.key}`);
    
       
        const onValueChange = dataRef.on('value', (snapshot) => {
          const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
          const formattedData = items.map(([key, value]) => ({ key, ...value }));
          console.log(formattedData)
        // const amount= formattedData.reduce((sum,item)=>sum+parseInt(item.masonMale),0)
         const amount= formattedData.reduce((sum,item)=>{
          const masonamount=item.masonMale===""?0:parseInt(item.masonMale)
        return isNaN(masonamount)?sum:sum+masonamount;
         },0)

         console.log(amount)
         setMasonMale(amount);
         const amount1= formattedData.reduce((sum,item)=>{
          const masonamount=item.masonFemale===""?0:parseInt(item.masonFemale)
        return isNaN(masonamount)?sum:sum+masonamount;
         },0)
         const amount2= formattedData.reduce((sum,item)=>{
          const masonamount=item.carpender===""?0:parseInt(item.carpender)
          return isNaN(masonamount)?sum:sum+masonamount;
         },0)
        
         const amount3= formattedData.reduce((sum,item)=>{
          const electamount=item.masonamount===""?0:parseInt(item.electrician)
          return isNaN(electamount)?sum:sum+electamount;
         },0)
         
         const amount4= formattedData.reduce((sum,item)=>{
          const fitteramount=item.fitter===""?0:parseInt(item.fitter)
          return isNaN(fitteramount)?sum:sum+fitteramount;
         },0)
          
         const amount5= formattedData.reduce((sum,item)=>{
          const helperamount=item.helper===""?0:parseInt(item.helper)
          return isNaN(helperamount)?sum:sum+helperamount;
         },0)
          
         const amount6= formattedData.reduce((sum,item)=>{
          const plumberamount=item.plumber===""?0:parseInt(item.plumber)
          return isNaN(plumberamount)?sum:sum+plumberamount;
         },0)
         const amount7= formattedData.reduce((sum,item)=>{
          const painteramount=item.others===""?0:parseInt(item.painter)
          return isNaN(painteramount)?sum:sum+painteramount;
         },0)
      
         const amount8= formattedData.reduce((sum,item)=>{
          const otheramount=item.others===""?0:parseInt(item.others)
          return isNaN(otheramount)?sum:sum+otheramount;
          
         },0)
       

         setMasonFemale(amount1)
         setMasonMale(amount)
         setCarpender(amount2)
         setElect(amount3)
         setFitter(amount4)
         setHelper(amount5)
         setPlumber(amount6)
         setPainter(amount7)
         setOthers(amount8)
          // formattedData.map(item=>{
          //   console.log(item.carpender)
          //   const newdata=0;
          //   const new1=`${newdata+item.carpender}`
          //   console.log(new1)
          // })
        //  setData(formattedData.reverse());
        });

     
    
        return () => {
          dataRef.off('value', onValueChange);
        };
      }, []);

      const MaterialHead = ['No', 'Material', 'Cost'];
      const MaterialData = [
          ['1', "Bricks", `${Bricks?Bricks:'0'}₹`],
          ['2', "Cement(Nos)",`${Cement?Cement:'0'}₹` ],
          ['3', "M.Sand(Unit)", `${Msand?Msand:'0'}₹`],
          ['4', "P.Sand(Unit)", `${Psand?Psand:'0'}₹`],
          ['5', "Tiles(Nos)", `${Tiles?Tiles:'0'}₹`],
          ['6', "Steel Bar(kgs)", `${Steelbar?Steelbar:'0'}₹`],
          ['7', "Aggregate 20mm(Unit)", `${Aggregate?Aggregate:'0'}₹`],
          ['8', "Total Material Cost", `${Bricks+Cement+Msand+Psand+Tiles+Steelbar+Aggregate}₹`],
      ];
    const ManPowerHead = ['No', 'Man Power', 'Wages'];
    const Manpowerdata = [
        ['1', "Mason(Male)", `${MasonMale?MasonMale:'0'}₹`],
        ['2', "Mason(H)", `${masonFemale?masonFemale:'0'}₹`],
        ['3', "Electrician", `${electrician?electrician:'0'}₹`],
        ['4', "Carpender", `${carpender?carpender:'0'}₹`],
        ['5', "Plumber", `${Plumber?Plumber:'0'}₹`],
        ['6', "Painter", `${painter?painter:'0'}₹`],
        ['7', "Fitter", `${fitter?fitter:'0'}₹`],
        ['8', "Helpers", `${helper?helper:'0'}₹`],
        ['9', "Others", `${others?others:'0'}₹`],
        ['10',"Total Manpower",`${MasonMale+masonFemale+electrician+carpender+Plumber+painter+fitter+helper+others}₹`]
    ];
   
    return(
      <Provider>
        <View style={{flex:1}}>
          <ScrollView>
            <View style={{padding:10}}>
        <Text style={{ marginLeft: 0,marginTop:10,fontSize:17,color:'black',width:responsiveWidth(60),fontWeight:'bold' }}>Total Manpower Expenditure</Text>
                           

       

       
                            
                            <View style={{ marginTop: 10, }}>

                                <Table borderStyle={{ borderWidth: 1, borderColor: 'white' }}>
                                    <Row data={ManPowerHead} style={Styles.head} textStyle={Styles.text} />
                                    <Rows data={Manpowerdata} style={Styles.content} textStyle={Styles.text1} />
                                </Table>

                          
                        </View>
                        <Text style={{ marginLeft: 0,marginTop:20,fontSize:17,color:'black',width:responsiveWidth(60),fontWeight:'bold' }}>Total Material Expenditure</Text>
                           

       

       
                            
                           <View style={{ marginTop: 10, }}>

                               <Table borderStyle={{ borderWidth: 1, borderColor: 'white' }}>
                                   <Row data={MaterialHead} style={Styles.head} textStyle={Styles.text} />
                                   <Rows data={MaterialData} style={Styles.content} textStyle={Styles.text1} />
                               </Table>

                         
                       </View>
                       </View>
                        </ScrollView>
        </View>
        </Provider>
    )
};
export default TotalAmount;
const Styles = StyleSheet.create({
  head: { height: 45, backgroundColor: '#2f4f4f' },
    text: { margin: 6, textAlign: 'center', fontSize: 17, color: 'white',fontWeight:'bold' },
    text1: { margin: 6, textAlign: 'center', fontSize: 12, color: 'black' },
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
        fontSize: 22,
        color: 'white',
        marginLeft: 20

    },
    Rowcontainer:{
        flexDirection:'row',justifyContent:'space-between',marginTop:10
    }
})