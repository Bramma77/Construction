import React ,{useState,useEffect} from 'react';
import {View,Text,TextInput,ImageBackground,TouchableOpacity, StyleSheet,FlatList, ScrollView} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {  Menu,Portal,Dialog,Button, Divider, Provider, } from 'react-native-paper'
import database from '@react-native-firebase/database';

const InvoiceGenerator=({navigation})=>{
   // const{item}=route.params;
    const[Sno,setSno]=useState("");
    const[Item,setItem]=useState("");
    const[Quantity,setQuantity]=useState("");
    const[Rate,setRate]=useState("");
    const[Length, setLength] = useState(false);
    const[Breath,setBreath]=useState([]);
    const[Show,setShow]=useState(false);
    const[Data,setData]=useState([]);
    const[InvoiceTo,onChangeInvoiceTo]=useState("");
const[phoneno,onChangephoneno]=useState("");
const[AccountDetail,setAccountDetail]=useState("");
const[Terms,setTerms]=useState("");
const[InitialAmount,setInitialAmount]=useState("");

    
    const reference = database().ref('Construction').child('ProjectView').child('InvoiceList');
    
    const onSubmit=()=>{
       
         reference.push({
        SNo:Sno,
        Description:Item,
        Length:Length,
        Breadth:Breath,
        Quantity:Length*Breath,
        Rate:Rate,
        Amount:(Length*Breath)*Rate
       
    }).then((res)=>{setShow(false)
    setRate("")
    setLength("")
    setBreath("")
    setItem("")
    setSno("")
    })
}
const handleInputChangePh= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     onChangephoneno(numericInput);
   };

const handleInputChange= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     setSno(numericInput);
   };
   const handleInputChange1= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     setLength(numericInput);
   };
   const handleInputChange3= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     setBreath(numericInput);
   };
   const handleInputChange2= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     setRate(numericInput);
   };

const deleteData = async (key) => {
      

    try {
      await reference.child(key).remove();
      console.log('Data deleted successfully!');
     
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

useEffect(() => {
      
 

   
    const onValueChange = reference.on('value', (snapshot) => {
      const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
      const formattedData = items.map(([key, value]) => ({ key, ...value }));
      console.log(formattedData)
      setData(formattedData.reverse());
    });

    return () => {
      reference.off('value', onValueChange);
    };
  }, []);


const ProjectItem = ({ item,onEdit, onDelete, onHandle}) => (

  
    
    <View style={styles.projectItem}>
      
        <TouchableOpacity >
            <View style={styles.contentContainer}>
            <Text style={[styles.projectName]}>{`Item:`}</Text>
            <Text style={styles.projectName}>{`${item.SNo}`}</Text>
            </View>
           
            <View style={styles.contentContainer}>
            <Text style={styles.InnerText}>{`Description`}</Text>
            <Text style={styles.InnerText2}>{`${item.Description}`}</Text>
            </View>
            <View style={styles.contentContainer}>
            <Text style={styles.InnerText}>{`Length:`}</Text>
            <Text style={styles.InnerText2}>{`${item.Length}`}</Text>
           </View>
           <View style={styles.contentContainer}>
            <Text style={styles.InnerText}>{`Breadth:`}</Text>
            <Text style={styles.InnerText2}>{`${item.Breadth}`}</Text>
           </View>
            <View style={styles.contentContainer}>
            <Text style={styles.InnerText}>{`Quantity:`}</Text>
            <Text style={styles.InnerText2}>{`${item.Quantity}`}</Text>
           </View>
           <View style={styles.contentContainer}>
            <Text style={styles.InnerText}>{`Rate:`}</Text>
            <Text style={styles.InnerText2}>{`${item.Rate}`}</Text>
           </View>
           <View style={styles.contentContainer}>
            <Text style={styles.InnerText}>{`Amount:`}</Text>
            <Text style={styles.InnerText2}>{`${item.Amount}`}</Text>
           </View>
           
            <View style={styles.iconContainer}>
                {/* <TouchableOpacity>
                    <Ionicons name="create-outline" size={24} color="#3498db" style={styles.icon} />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={()=>deleteData(item.key)}>
                    <Ionicons name="trash-outline" size={24} color="#e74c3c" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
       
    </View>


);

    return(
        <Provider>
        <View style={{flex:1,backgroundColor: '#ECF0F1'}}>
       <Portal>
                <Dialog visible={Show} onDismiss={()=>setShow(false)} >
                <Dialog.Title style={{fontSize:17}}></Dialog.Title>
                <Dialog.Content>
                <View style={styles.ItemView} >
   <Text style={styles.Label}>SNo:</Text>

   <TextInput
       style={styles.TextInput}
      
       textAlign="center"
       onChangeText={handleInputChange}
       value={Sno}
   />
</View>
   <View style={styles.ItemView} >
   <Text style={styles.Label}>Description :</Text>
  
   <TextInput
       style={styles.TextInput}
       onChangeText={setItem}
       value={Item}
    
       textAlign="center"
      />
   
  
</View>
<View style={styles.ItemView} >
   <Text style={styles.Label}>Length:</Text>

   <TextInput
       style={styles.TextInput}
       keyboardType='number-pad'
       textAlign="center"
      
       onChangeText={handleInputChange1}
       value={Length}
   />
</View>
<View style={styles.ItemView} >
   <Text style={styles.Label}>Breadth:</Text>

   <TextInput
       style={styles.TextInput}
       keyboardType='number-pad'
       textAlign="center"
      
       onChangeText={handleInputChange3}
       value={Breath}
   />
</View>
<View style={styles.ItemView} >
   <Text style={styles.Label}>Rate(Rs):</Text>

   <TextInput
       style={styles.TextInput}
       keyboardType='number-pad'
       textAlign="center"
       onChangeText={handleInputChange2}
       value={Rate}
   />
</View>

<TouchableOpacity onPress={onSubmit}>
                <View style={{padding:10,marginLeft:responsiveWidth(10),marginTop:20,marginRight:responsiveWidth(10),
                    borderWidth:0,borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:'#ff9900'}}>
                    <Text style={{fontSize:15,color:'white'}}>Submit</Text>
                </View>
                </TouchableOpacity>

                </Dialog.Content>
                 </Dialog>
                 </Portal>

           


<ScrollView>
<View style={{padding:20}}>
<Text style={styles.Text}>Invoice To</Text>
        <TextInput
        style={styles.TextInput}
        onChangeText={onChangeInvoiceTo}
        value={InvoiceTo}
        
        
        />
        <Text style={styles.Text}>Contact No</Text>
        <TextInput
        style={styles.TextInput}
        keyboardType='number-pad'
        onChangeText={handleInputChangePh}
        value={phoneno}
      />
              <Text style={styles.Text}>Terms & Condition</Text>
        <TextInput
        style={styles.TextInput}
      
        onChangeText={setTerms}
        value={Terms}
      />
              <Text style={styles.Text}>Account Detail</Text>
        <TextInput
        style={styles.TextInput}
       
        onChangeText={setAccountDetail}
        value={AccountDetail}
      />
      
      <Text style={styles.Text}>Initial Amount</Text>
        <TextInput
        style={styles.TextInput}
        keyboardType='number-pad'
        onChangeText={setInitialAmount}
        value={InitialAmount}
      />
<View style={[styles.ItemView,{justifyContent:'flex-end'}]}>



<TouchableOpacity onPress={()=>{setShow(true)
 

}}>
<View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>

<Text style={{color:'white',fontSize:14,padding:10}}>Add Item</Text>
</View>
</TouchableOpacity>








</View>
<View style={{marginBottom:100}} >
                    <FlatList
                        data={Data}
                        scrollEnabled={false}
                        keyExtractor={(item) => item.key}
                        renderItem={({ item }) => (
                            <ProjectItem
                                item={item}
                                onEdit={item }
                                onDelete={item}
                                onHandle={item}
                              
                               
                            />
                        )}
                    />
                      </View>
                      </View>
                      </ScrollView>
        </View>
        
        <View style={{height:80,borderWidth:1,alignItems:'center',justifyContent:'center',borderColor:'white'}}>
           <TouchableOpacity onPress={()=>navigation.navigate('InvoiceView',{InvoiceTo,phoneno,Terms,AccountDetail,InitialAmount})} 
           style={{ backgroundColor: '#ff9900', alignItems: 'center', justifyContent: 'center', width: 150,
                                 alignSelf: 'center',borderRadius:10}}>
                                <Text style={{ fontSize: 14, padding: 10, color: 'white' }}>Submit</Text>
                                  </TouchableOpacity>

        </View>
        
        </Provider>
    )
}

const styles=StyleSheet.create({
    ItemView: {
        flexDirection: 'row', marginVertical: 10, alignItems: 'center'
    },
    TextInput: {
        borderWidth: 0.5, padding: 8,fontSize: 14,color:'black', flex: 1, borderColor: '#2f4f4f', borderRadius: 10,backgroundColor:'white'
    },
    Label: {
        marginRight: 10,fontWeight:'bold', fontSize: 14, color: 'black',width:responsiveWidth(30)
    
    },
      container: {
        padding: 20,
      },
      card:{
        backgroundColor:'white',elevation:2,padding:5,borderRadius:10,marginVertical:10
      },
      header: {
        marginBottom: 20,
      },
      headerText: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      contentContainer:{
        flexDirection:'row',marginVertical:4
    },
    InnerText:{
        color: 'black' ,width:responsiveWidth(50),fontSize:14,fontWeight:'bold'

    },
    InnerText2:{
        color: 'black' ,fontSize:14

    },
    projectItem: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
        borderWidth:0
    },
    projectName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    icon: {
        marginLeft: 15,
    },
    Text:{
        fontSize:14,
        color:'black',
        fontWeight:'bold',
        marginTop:10
      },
     
})
export default InvoiceGenerator;