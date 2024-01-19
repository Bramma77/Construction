import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import database from '@react-native-firebase/database';


const Equipment = ({ navigation }) => {
    const [ladder, onChangeladder] = useState("");
    const [Diggingbar, onChangeDiggingbar] = useState("");
    const [Crowbar, onChangeCrowbar] = useState("");
    const [Shovel, onChangeShovel] = useState("");
    const [Headpan, onChangeHeadpan] = useState("");
    const [Trowal, onChangeTrowel] = useState("");
    const [Hammer, onChangeHammer] = useState("")
    const[Plumbbop,onChangePlumbbop]=useState("")
    const[Drilmachine,onChangeDrillmachine]=useState("");
    const[Jackhammer,onchangeJackhammer]=useState("");
    const[Grinder,onchangeGrinder]=useState("");
    const[Marbalpolisher,onChangeMarbalpolisher]=useState("");
    const[Vibrator,onChangeVibrator]=useState("");

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date())

    const onSubmit = () => {
        reference.child(item.key).set({
            Bricks: Bricks,
            Cement: Cement,
            Msand: Msand,
            Psand: Psand,
            Tiles: Tiles,
            Steelbar: Steelbar,
            Aggregate: Aggregate,

        }).then((res) => console.log(res))
    }


    return (
        <View style={{ flex: 1 }}>

            <ScrollView>
                <TouchableOpacity onPress={() => { setOpen(true) }} style={{ borderWidth: 1, borderColor: '#cccccc', borderRadius: 5, alignSelf: 'flex-end', width: 150, height: 50, alignItems: 'center', marginRight: 20, marginTop: 20 }}>
                    <View style={{ flex: 1, borderWidth: 0, flexDirection: 'row', alignItems: 'center', }}>

                        <Text style={{ fontSize: 16, color: 'black', paddingHorizontal: 5 }}>{moment(date).format("DD/MM/YYYY")}</Text>
                        <Feather style={{ color: '#2f4f4f' }} name='calendar' size={32} />
                        <DatePicker
                            style={{}}
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
                <View style={{ margin: 20, elevation: 1, backgroundColor: 'white' }}>
                    <View style={{ margin: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Ladder:</Text>

                            <TextInput
                                style={Styles.TextInput}
                                onChangeText={onChangeladder}
                                keyboardType='number-pad'
                                textAlign="center"
                                value={ladder}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Digging Bar:</Text>

                            <TextInput
                                style={Styles.TextInput}
                                keyboardType='number-pad'
                                textAlign="center"
                                onChangeText={onChangeDiggingbar}
                                value={Diggingbar}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Crow Bar:</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={onChangeCrowbar}
                                value={Crowbar}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Shovel:</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={onChangeShovel}
                                value={Shovel}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Head Pan</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={onChangeHeadpan}
                                value={Headpan}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Trowal:</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={onChangeTrowel}
                                value={Trowal}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Hammer:</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={onChangeHammer}
                                value={Hammer}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Plumb Bob:</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={onChangePlumbbop}
                                value={Plumbbop}
                            />
                        </View>

                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Drill Machine:</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={onChangeDrillmachine}
                                value={Drilmachine}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Grinder:</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={onchangeGrinder}
                                value={Grinder}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Marbalpolisher:</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={onChangeMarbalpolisher}
                                value={Marbalpolisher}
                            />
                        </View>
                        <View style={Styles.ItemView} >
                            <Text style={Styles.Label}>Vibrator:</Text>

                            <TextInput
                                keyboardType='number-pad'
                                textAlign="center"
                                style={Styles.TextInput}
                                onChangeText={onChangeVibrator}
                                value={Vibrator}
                            />
                        </View>

                    </View>


                </View>
                <View style={{
                    backgroundColor: '#2f4f4f', alignItems: 'center', justifyContent: 'center', width: 150,
                    alignSelf: 'center'
                }}>
                    <Text style={{ fontSize: 14, padding: 10, color: 'white' }}>Submit</Text>
                </View>
            </ScrollView>
        </View>


    )
}




export default Equipment;
const Styles = StyleSheet.create({
    ItemView: {
        flexDirection: 'row', marginVertical: 10, alignItems: 'center'
    },
    TextInput: {
        borderWidth: 1, padding: 8, flex: 1, borderColor: '#2f4f4f', borderRadius: 10
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