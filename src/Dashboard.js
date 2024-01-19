import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,ImageBackground, TextInput, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import {  Menu,Portal,Dialog,Button, Divider, Provider, } from 'react-native-paper'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';

import {
    
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";


  

const initialProjects = [
    {
        id: '1',
        name: 'Project 1',
        plan: 'Plan A',
        location: 'Chennai',
        handler: 'Raj',
        status: 'On Progress',
    },
    {
        id: '2',
        name: 'Project 2',
        plan: 'Plan B',
        location: 'Madurai',
        handler: 'Sam',
        status: 'Completed',
    },
    {
        id: '3',
        name: 'Project 3',
        plan: 'Plan C',
        location: 'Madurai',
        handler: 'Sam',
        status: 'Completed',
    },
    {
        id: '4',
        name: 'Project 4',
        plan: 'Plan D',
        location: 'Madurai',
        handler: 'Sam',
        status: 'Completed',
    },
    {
        id: '5',
        name: 'Project 5',
        plan: 'Plan E',
        location: 'Madurai',
        handler: 'Sam',
        status: 'Completed',
    },
    {
        id: '6',
        name: 'Project 6',
        plan: 'Plan F',
        location: 'Madurai',
        handler: 'Sam',
        status: 'Completed',
    },
    {
        id: '7',
        name: 'Project 7',
        plan: 'Plan G',
        location: 'Madurai',
        handler: 'Sam',
        status: 'Completed',
    },


    // Add more projects as needed
];
//const userRef = database.ref(`Appmain/user`);

const ProjectList = ({ navigation }) => {
    const[Data,setData]=useState([]);
    const [Show, setShow] = useState(false);
   let [animateModal, setanimateModal] = useState(false);
  const [text,setText]=useState("")
  const [ProjectName, setProjectName] = useState("");
  const [ClientName, setClientName] = useState("");
  const [SiteLocation, setSiteLocation] = useState("");
  const [Budget, setBudget] = useState("");
  const [InitialAmount, setInitialAmount] = useState("");
  const [ProjectStatus, setProjectStatus] = useState("");
  const[key,setkey]=useState('');
  const[remove,setRemove]=useState(false);

  
    useEffect(() => {
      
        const dataRef = database().ref('Construction').child('ProjectList');
    
        // Set up a listener for real-time updates
        const onValueChange = dataRef.on('value', (snapshot) => {
          const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
          const formattedData = items.map(([key, value]) => ({ key, ...value }));
          console.log(formattedData)
          setData(formattedData.reverse());
        });
    
        return () => {
          dataRef.off('value', onValueChange);
        };
      }, []);
   
      const updateData = async () => {
        const newData={
        Projectname:ProjectName,
        SiteLocation:SiteLocation,
        Clientname:ClientName,
        Budget:Budget,
        Initialamount:InitialAmount,
        Projectstatus:ProjectStatus
        }
        try {
          await database().ref(`Construction`).child('ProjectList').child(key).update(newData);
         setShow(false);
          console.log('Data updated successfully!');
        } catch (error) {
          console.error('Error updating data:', error);
        }
      };

      const deleteData = async () => {
      

        try {
          await database().ref(`Construction`).child('ProjectList').child(key).remove();
          console.log('Data deleted successfully!');
          setRemove(false)
        } catch (error) {
          console.error('Error deleting data:', error);
        }
      };


    const [projectList, setProjectList] = useState(initialProjects);
    const [MenuAnchor, setMenuAnchor] = useState();

    const openMenu = (event) => {
        const { nativeEvent } = event;
        const anchor = {
            x: nativeEvent.pageX,
            y: nativeEvent.pageY,
        }
        setMenuAnchor(anchor);
        setisOpen(true);
    }
    const handleEdit = (item) => {
        setShow(true)
       // openDialog(item)
        setProjectName(item.Projectname)
        setClientName(item.Clientname)
        setSiteLocation(item.SiteLocation)
        setInitialAmount(item.Initialamount)
        setBudget(item.Budget)
        setProjectStatus(item.Projectstatus)
        setkey(item.key)
        // setProjectList((prevList) =>
        //     prevList.map((item) => (item.id === projectId ? { ...item, ...updatedDetails } : item))
        // );
    };

    const Update=()=>{

    }

    const handleDelete = (item) => {
        setRemove(true)
        setkey(item.key)
       // setProjectList((prevList) => prevList.filter((item) => item.id !== projectId));
    };

    const handleProject1Click = (item) => {
        navigation.navigate('Drawer', { item});
    };
    const [isOpen, setisOpen] = useState(false);

    const signout = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'Login'
                            },],
                    }));
                })
    }
    const [selectedItem, setSelectedItem] = useState(null);
    
    const openDialog = (item) => {
        setSelectedItem(item);

      };

      

    const ProjectItem = ({ item, onEdit, onDelete, onHandle }) => (
    
        <View style={styles.projectItem}>
          
            <TouchableOpacity onPress={onHandle}>
                <View style={styles.contentContainer}>
                <Text style={styles.projectName}>{`Project Name:`}</Text>
                <Text style={styles.projectName}>{`${item.Projectname}`}</Text>
                </View>
               
                <View style={styles.contentContainer}>
                <Text style={styles.InnerText}>{`Site Location:`}</Text>
                <Text style={styles.InnerText2}>{`${item.SiteLocation}`}</Text>
                </View>
                <View style={styles.contentContainer}>
                <Text style={styles.InnerText}>{`Client Name:`}</Text>
                <Text style={styles.InnerText2}>{`${item.Clientname}`}</Text>
               </View>
                <View style={styles.contentContainer}>
                <Text style={styles.InnerText}>{`Project Status:`}</Text>
                <Text style={styles.InnerText2}>{`${item.Projectstatus}`}</Text>
                </View>
                <View style={styles.contentContainer}>
                <Text style={styles.InnerText}>{`Project Budget:`}</Text>
                <Text style={styles.InnerText2}>{`${item.Budget}`}</Text>
                </View>
                <View style={styles.contentContainer}>
                <Text style={styles.InnerText}>{`Initial Amount:`}</Text>
                <Text style={styles.InnerText2}>{`${item.Initialamount}`}</Text>
                </View>
                <View style={styles.contentContainer}>
                <Text style={styles.InnerText}>{`Remaining:`}</Text>
                <Text style={styles.InnerText2}>{`${item.Budget-item.Initialamount}`}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={onEdit}>
                        <Ionicons name="create-outline" size={24} color="#3498db" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDelete}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
           
        </View>
    
    
    );
    
    

    return (
        <Provider>
            
             <Portal>
                 <Dialog visible={Show} onDismiss={()=>setShow(false)} >
                 <Dialog.Title style={{fontSize:17}}>Modify Project Details</Dialog.Title>
                 <Dialog.Content>
                <TextInput
                  placeholder="Type something..."
                 value={ProjectName}
                 onChangeText={(value)=>setProjectName(value)}
                  style={{ borderWidth: 1, borderColor: '#ccc', padding: 8,marginTop:20 }}
                />
                  <TextInput
                  placeholder="Site Location"
                 value={SiteLocation}
                 onChangeText={(value)=>setSiteLocation(value)}
                  style={{ borderWidth: 1, borderColor: '#ccc', padding: 8 ,marginTop:20}}
                />
                  <TextInput
                  placeholder="Client name"
                 value={ClientName}
                 onChangeText={(value)=>setClientName(value)}
                  style={{ borderWidth: 1, borderColor: '#ccc', padding: 8 ,marginTop:20}}
                />
                 <TextInput
                  placeholder="Project status"
                 value={ProjectStatus}
                 onChangeText={(value)=>setProjectStatus(value)}
                  style={{ borderWidth: 1, borderColor: '#ccc', padding: 8 ,marginTop:20}}
                />
                 <TextInput
                  placeholder="Budget"
                 value={Budget}
                 keyboardType='number-pad'
                 onChangeText={(value)=>setBudget(value)}
                  style={{ borderWidth: 1, borderColor: '#ccc', padding: 8 ,marginTop:20}}
                />
                 <TextInput
                  placeholder="Initial amount"
                 value={InitialAmount}
                 keyboardType='number-pad'
                 onChangeText={(value)=>setInitialAmount(value)}
                  style={{ borderWidth: 1, borderColor: '#ccc', padding: 8 ,marginTop:20}}
                />
    <TouchableOpacity onPress={updateData}>
                <View style={{padding:10,marginLeft:responsiveWidth(10),marginTop:20,marginRight:responsiveWidth(10),
                    borderWidth:0,borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:'#ff9900'}}>
                    <Text style={{fontSize:15,color:'white'}}>Submit</Text>
                </View>
                </TouchableOpacity>
              </Dialog.Content>
                 </Dialog>
                 <Dialog visible={remove}>
                 <Dialog.Title style={{fontSize:17}}>Are you remove your project?</Dialog.Title>
                 <Dialog.Content>
               
                    </Dialog.Content>
                    <Dialog.Actions>
                     
                <Button onPress={deleteData}>Yes</Button>
                <Button onPress={()=>setRemove(false)}>No</Button>
             </Dialog.Actions>
                   
                 </Dialog>
                 </Portal>

           
            <View style={{ flex:1 }}>
          
          

                <View style={{ height: 60, backgroundColor: '#2f4f4f', alignItems: 'center', flexDirection: 'row', width: "100%" }}>
                    <TouchableOpacity>
                        <Entypo name='home' size={30} color={'white'} style={{ marginLeft: 20 }} />
                    </TouchableOpacity>
                    <Text style={styles.HeaderText}>Project List</Text>
                    <View style={{ borderWidth: 0, width: 60, position: 'absolute', width: "100%" }}>
                        <TouchableOpacity onPress={openMenu} style={{alignSelf: 'flex-end'}}>
                            <Entypo name='dots-three-vertical' size={20} color={'white'} style={{ marginLeft: 0, marginRight: 30 }} />

                        </TouchableOpacity>
                    </View>
                </View>
                <Menu
                    visible={isOpen}
                    onDismiss={() => setisOpen(false)}
                    anchor={
                        MenuAnchor
                    }
                >


                    <Menu.Item onPress={()=>{navigation.navigate('AddProject')
                    setisOpen(false)
                    }
                
                } title="Add Project" />
                    <Menu.Item onPress={signout} title="Logout" />





                </Menu>

             
              
                <View style={styles.container} >
                    <FlatList
                        data={Data}
                        keyExtractor={(item) => item.key}
                        renderItem={({ item }) => (
                            <ProjectItem
                                item={item}
                                onEdit={() => handleEdit(item) }
                                onDelete={() => handleDelete(item)}
                                onHandle={() => handleProject1Click(item)}
                            />
                        )}
                    />
                      </View>
                    
              
              
            </View>
          
        </Provider>

    );
};



const styles = StyleSheet.create({
    containerContent: {flex: 1, marginTop: 40,alignItems:'center',},
  containerHeader: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#F1F1F1',
  },
  headerContent:{
    marginTop: 0,
  },
  Modal: {
    backgroundColor: 'white',
   // maxHeight:200
    marginTop: 150,
    borderRadius:50
  
  },
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: '#ecf0f1',
    },
    contentContainer:{
        flexDirection:'row',marginVertical:4
    },
    HeaderText: {
        fontSize: 22,
        color: 'white',
        marginLeft: 20

    },
    InnerText:{
        color: 'black' ,width:responsiveWidth(50),fontSize:14

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
});
export default ProjectList;