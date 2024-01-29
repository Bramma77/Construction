import React,{useState,useEffect,useRef} from 'react';
import { Text, View, TextInput,FlatList,  StyleSheet, ScrollView, TouchableOpacity, ImageBackground, ToastAndroid } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import database from '@react-native-firebase/database';
import MultiSelect from 'react-native-element-dropdown';
import Octicons from 'react-native-vector-icons/Octicons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Pdf from 'react-native-pdf';


import { Portal ,Dialog,Provider,Button} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';


const QuoteView = ({navigation,route}) => {
  const { item } = [];
  const pdfRef = useRef();
  const [refreshKey, setRefreshKey] = useState(0);
  const[spinner,setspinner]=useState(false);
 
  const[Floortilebrand,onChangeFloortilebrand]=useState("");
  const[Floortilerate,onChangeFloortilerate]=useState("");
  const[Kitchentilebrand,onChangekitchentilebrand]=useState("");
  const[Kitchentilerate,onChangekitchentilerate]=useState("");
  const[Bathroomtilebrand,onChangebathroomtilebrand]=useState("");
  const[Bathroomtilerate,onChangebathroomtilerate]=useState("");
  const[Granitetilebrand,onChangegranitetilebrand]=useState("");
  const[Granitetilerate,onChangegranitetilerate]=useState("");
  const[handrailsbrand,onChangehandrailsbrand]=useState("");
  const[handrailsrate,onChangehandrailsrate]=useState("");
  const[Switchesbrand,onChangeSwitchesbrand]=useState("");
  const[Switchesrate,onChangeSwithesrate]=useState("");
  const[paintbrand,onChangepaintbrand]=useState("");
  const[paintrate,onChangepaintrate]=useState("");
  const[cementbrand,onChangecementbrand]=useState("");
  const[cementrate,onChangecementrate]=useState("");
  const[steelbrand,onChangesteelbrand]=useState("");
  const[steelrate,onChangesteelrate]=useState("");
  const[EWCbrand,onChangeEWCbrand]=useState("");
  const[EWCrate,onChangeEWCrate]=useState("");
  const[Indianglasssetbrand,onChangeIndianglasssetbrand]=useState("");
  const[Indianglasssetrate,onChangeIndianglasssetrate]=useState("");
  const[pipefittingbrand,onChangepipefittingbrand]=useState("");
  const[pipefittingrate,onChangepipefittingrate]=useState("");
  const[wirebrand,onChangewirebrand]=useState("");
  const[wirerate,onChangewirerate]=useState("");
  const[watertankbrand,onChangewatertankbrand]=useState("");
  const[watertankrate,onChangewatertankrate]=useState("");
  const[septictankbrand,onChangeseptictankbrand]=useState("");
  const[septictankrate,onChangeseptictankrate]=useState("");
  const[popup,setpopup]=useState(false)
  const[braddata,setbranddata]=useState([]);
  const[isSelectedbrand,setisSelectedbrand]=useState([]);
  const[AddNewBrand,onChangeAddNewBrand]=useState("");
  const[BrandDialog,setBrandDialog]=useState(false);
  const[isSwitchesbrand,setisSwitchesbrand]=useState(false);
  const[isCementbrand,setisCementbrand]=useState(false);
  const[isSteelbrand,setisSteelbrand]=useState(false);
  const[isPaintbrand,setisPaintbrand]=useState(false);
  const[isEwcbrand,setisEwcbrand]=useState(false);
  const[isGlassbrand,setisGlassbrand]=useState(false);
  const[isPipebrand,setisPipebrand]=useState(false);
  const[isWirebrand,setisWirebrand]=useState(false);
  const[isFloorbrand,setisFloorbrand]=useState(false);
  const[isKitchenbrand,setiskitchenbrand]=useState(false);
  const[isGranitebrand,setisgranitebrand]=useState(false);
  const[isBathtilebrand,setisbathtilebrand]=useState(false);
  const[ishandrailbrand,setishandrailbrand]=useState(false);
  const[isWaterbrand,setisWaterbrand]=useState(false);
  const[isSepticbrand,setisSepticbrand]=useState(false);
  const[isWhiteCementbrand,setisWhiteCementbrand]=useState(false);

  const[CementBrandList,setCementBrandList]=useState([]);
  const[SwitchBrandList,setSwitchBrandList]=useState([]);
  const[PaintBrandList,setPaintBrandList]=useState([]);
  const[SteelBrandList,setSteelBrandList]=useState([]);
  const[PipeBrandList,setPipeBrandList]=useState([]);
  const[WireBrandList,setWireBrandList]=useState([]);
  const[FloorTileBrandList,setFloorTileBrandList]=useState([]);
  const[KitchenTileBrandList,setKitchenTileBrandList]=useState([]);
const[BathTileBrandList,setBathTileBrandList]=useState([]);
const[HandRailBrandList,setHandRailBrandList]=useState([]);
const[WaterTankBrandList,setWaterBrandList]=useState([]);
const[SepticTankBrandList,setSepticTankBrandList]=useState([])
const[EWCBrandList,setEWCBrandList]=useState([]);
const[GlassBrandList,setGlassBrandList]=useState([]);
const[GraniteBrandList,setGraniteBrandList]=useState([]);
const[WhiteCementbrand,setWhiteCementbrand]=useState("");
const[WhiteCementbrandList,setWhiteCementbrandList]=useState([]);
const[WhiteCementrate,setWhiteCementrate]=useState("");

const[SelectedSwitchbrand,setSelectedSwitchbrand]=useState([]);
const[SelectedCementbrand,setSelectedCementbrand]=useState([]);
const[SelectedPaintbrand,setSelectedPaintbrand]=useState([]);
const[SelectedSteelbrand,setSelectedSteelbrand]=useState([]);
const[SelectedPipebrand,setSelectedPipebrand]=useState([]);
const[SelectedWirebrand,setSelectedWirebrand]=useState([]);
const[SelectedFloorTilebrand,setSelectedFloorTilebrand]=useState([]);
const[SelectedKitchenTilebrand,setSelectedKitchenTilebrand]=useState([]);
const[SelectedBathTilebrand,setSelectedBathTilebrand]=useState([]);
const[SelectedGranitebrand,setSelectedGranitebrand]=useState([]);
const[SelectedHandrailbrand,setSelectedHandRailbrand]=useState([]);
const[SelectedWaterTankbrand,setSelectedWaterTankbrand]=useState([]);
const[SelectedEWCbrand,setSelectedEWCbrand]=useState([]);
const[SelectedGlassbrand,setSelectedGlassbrand]=useState([]);
const[SelectedSeptictankbrand,setSelectedSeptictankbrand]=useState([]);
const[SelectedWhiteCementbrand,setSelectedWhiteCementbrand]=useState([]);
const[Length,setLength]=useState("");
const[Breath,setBreath]=useState("");
const[Rate,setRate]=useState("");
const[FloorName,setFloorName]=useState("");
const[UnderGroundSumpQuantity,setundergroundsumpquantity]=useState("");
const[UnderGroundSumpRate,setUnderGroundSumpRate]=useState("");
const[OverHeadTankQuantity,setOverHeadTankQuantity]=useState("");
const[OverHeadTankRate,setOverHeadTankRate]=useState("");
const[SepticTankQuantity,setSepticTankQuantity]=useState("");
const[SepticTankRate,setSepticTankRate]=useState("");

const[Data1,setData1]=useState([]);
const[Data,setData]=useState([]);
const[path,setpath]=useState(false);
const [zoomLevel, setZoomLevel] = useState(1);
const[tAmount,settAmount]=useState("");
const[AdditionalWork,setAdditionalWork]=useState([])


const [Show, setShow] = useState(false);
const[FloorData,setFloorData]=useState([]);

const[TabsRate,setTabsRate]=useState("")
const[MaindoorRate,setMaindoorRate]=useState("")
const[OtherdoorRate,setOtherdoorRate]=useState("")
const[ToiletdoorRate,setToiletdoorRate]=useState("")
const[WindowRate,setWindowRate]=useState("")
const[indianWatercloset,setIndianWatercloset]=useState("")
const[EuropeanWatercloset,setEuropeanWatercloset]=useState("")
const[WashBasin,setWashBasin]=useState("")

const handleonChangetext=(text,valueFor)=>{
  const numericInput = text.replace(/[^0-9]/g, "");
  if(valueFor==="Tabs") setTabsRate(numericInput);
  if(valueFor==="Maindoor") setMaindoorRate(numericInput);
  if(valueFor==="Otherdoor") setOtherdoorRate(numericInput);
  if(valueFor==="Toiletdoor") setToiletdoorRate(numericInput);
  if(valueFor==="IndianWatercloset") setIndianWatercloset(numericInput);
  if(valueFor==="EuropeanWatercloset") setEuropeanWatercloset(numericInput);
  if(valueFor==="Washbasin") setWashBasin(numericInput);
  if(valueFor==="Windows") setWindowRate(numericInput)
}

// setInterval(() => {
//   setspinner(false);
// }, 3000);

 const reference = database().ref('Construction').child('ProjectView').child('Quotation');
 const reference1 = database().ref('Construction').child('ProjectView').child('AdditionalforQuotation');
  const brandref = database().ref('Construction').child('ProjectView').child('Brand');

  const zoomIn = () => {
    setZoomLevel(zoomLevel * 1.5);
  };
  
  const zoomOut = () => {
    setZoomLevel(zoomLevel * 0.5);
  };

 

  useEffect(() => {
      
 const onValueChange = brandref.child('Switchesbrand').on('value', (snapshot) => {
      const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
      const formattedData = items.map(([key, value]) => ({ key, ...value }));
      console.log(formattedData)
     // setbranddata(formattedData.reverse());
      setSwitchBrandList(formattedData.reverse());
    });
   
    
    
   

    const onValueChange1 = brandref.child('Cementbrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setCementBrandList(formattedData.reverse());
      });
      const onValueChange2 = brandref.child('Paintbrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setPaintBrandList(formattedData.reverse());
      });
       const onValueChange3 = brandref.child('Steelbrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setSteelBrandList(formattedData.reverse());
      });
       const onValueChange4 = brandref.child('EWCbrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setEWCBrandList(formattedData.reverse());
      });
      const onValueChange5 = brandref.child('Glassbrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setGlassBrandList(formattedData.reverse());
      });
      const onValueChange6 = brandref.child('Pipebrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setPipeBrandList(formattedData.reverse());
      });
      const onValueChange7 = brandref.child('Wirebrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setWireBrandList(formattedData.reverse());
      });
      const onValueChange8 = brandref.child('FloorTilebrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setFloorTileBrandList(formattedData.reverse());
      });
      const onValueChange9 = brandref.child('KitchenTilebrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setKitchenTileBrandList(formattedData.reverse());
      });
      const onValueChange10 = brandref.child('BathroomTilebrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setBathTileBrandList(formattedData.reverse());
      });
      const onValueChange11 = brandref.child('Granitebrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setGraniteBrandList(formattedData.reverse());
      });
      const onValueChange12 = brandref.child('HandRailsbrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setHandRailBrandList(formattedData.reverse());
      });
      const onValueChange13 = brandref.child('WaterTankbrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setWaterBrandList(formattedData.reverse());
      });
      const onValueChange14 = brandref.child('SepticTankbrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setSepticTankBrandList(formattedData.reverse());
      });
      const onValueChange15 = brandref.child('WhiteCementbrand').on('value', (snapshot) => {
        const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
        const formattedData = items.map(([key, value]) => ({ key, ...value }));
        console.log(formattedData)
        setWhiteCementbrandList(formattedData.reverse());
      });
      return () => {
        brandref.off('value', onValueChange);
        brandref.off('value', onValueChange1);
        brandref.off('value', onValueChange2);
        brandref.off('value', onValueChange3);
        brandref.off('value', onValueChange4);
        brandref.off('value', onValueChange5);
        brandref.off('value', onValueChange6);
        brandref.off('value', onValueChange7);
        brandref.off('value', onValueChange8);
        brandref.off('value', onValueChange9);
        brandref.off('value', onValueChange10);
        brandref.off('value', onValueChange11);
        brandref.off('value', onValueChange12);
        brandref.off('value', onValueChange13);
        brandref.off('value', onValueChange14);
        brandref.off('value', onValueChange15);
      
      };
 
  },[]);
  const deleteData = async (item) => {
      
if(isSwitchesbrand){
    try {
      await brandref.child('Switchesbrand').child(item.key).remove();
      console.log('Data deleted successfully!');
    //   setRemove(false)
    } catch (error) {
      console.error('Error deleting data:', error);
    }
}
else if(isCementbrand){
    try {
        await brandref.child('Cementbrand').child(item.key).remove();
        console.log('Data deleted successfully!');
     
      } catch (error) {
        console.error('Error deleting data:', error);
      }
  }
  else if(isPaintbrand){
  try {
    await brandref.child('Paintbrand').child(item.key).remove();
    console.log('Data deleted successfully!');

  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
else if(isSteelbrand){
    try {
        await brandref.child('Steelbrand').child(item.key).remove();
        console.log('Data deleted successfully!');
    
      } catch (error) {
        console.error('Error deleting data:', error);
      }
}
else if(isEwcbrand){
    try {
        await brandref.child('EWCbrand').child(item.key).remove();
        console.log('Data deleted successfully!');
    
      } catch (error) {
        console.error('Error deleting data:', error);
      }
}
else if(isGlassbrand){
try {
    await brandref.child('Glassbrand').child(item.key).remove();
    console.log('Data deleted successfully!');

  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
  
  else if(isPipebrand){
  try {
    await brandref.child('Pipebrand').child(item.key).remove();
    console.log('Data deleted successfully!');

  } catch (error) {
    console.error('Error deleting data:', error);
  }
  }
  else if(isWirebrand){
    try {
      await brandref.child('Wirebrand').child(item.key).remove();
      console.log('Data deleted successfully!');
  
    } catch (error) {
      console.error('Error deleting data:', error);
    }
    }
    else if(isFloorbrand){
        try {
          await brandref.child('FloorTilebrand').child(item.key).remove();
          console.log('Data deleted successfully!');
      
        } catch (error) {
          console.error('Error deleting data:', error);
        }
        }
        else if(isKitchenbrand){
            try {
              await brandref.child('Kitchenbrand').child(item.key).remove();
              console.log('Data deleted successfully!');
          
            } catch (error) {
              console.error('Error deleting data:', error);
            }
            }
            else if(isBathtilebrand){
                try {
                  await brandref.child('BathroomTilebrand').child(item.key).remove();
                  console.log('Data deleted successfully!');
              
                } catch (error) {
                  console.error('Error deleting data:', error);
                }
                }
                else if(isGranitebrand){
                    try {
                      await brandref.child('Granitebrand').child(item.key).remove();
                      console.log('Data deleted successfully!');
                  
                    } catch (error) {
                      console.error('Error deleting data:', error);
                    }
                    }

                    else if(ishandrailbrand){
                        try {
                          await brandref.child('HandRailsbrand').child(item.key).remove();
                          console.log('Data deleted successfully!');
                      
                        } catch (error) {
                          console.error('Error deleting data:', error);
                        }
                        }  
                        else if(isWaterbrand){
                            try {
                              await brandref.child('WaterTankbrand').child(item.key).remove();
                              console.log('Data deleted successfully!');
                          
                            } catch (error) {
                              console.error('Error deleting data:', error);
                            }
                            } 
                            else if(isSepticbrand){
                                try {
                                  await brandref.child('SepticTankbrand').child(item.key).remove();
                                  console.log('Data deleted successfully!');
                              
                                } catch (error) {
                                  console.error('Error deleting data:', error);
                                }
                                } 
                                else if(isWhiteCementbrand){
                                  try {
                                    await brandref.child('WhiteCementbrand').child(item.key).remove();
                                    console.log('Data deleted successfully!');
                                
                                  } catch (error) {
                                    console.error('Error deleting data:', error);
                                  }
                                  } 
                                else{
                                    console.log('error')
                                }           
}
const brandSubmit=()=>{
  if(AddNewBrand!=null&&AddNewBrand!=""){
    if(isSwitchesbrand){
    brandref.child("Switchesbrand").push({
        Brand:AddNewBrand
    }).then((res)=>{
        slectbrandfalse()
      setBrandDialog(false)
      onChangeAddNewBrand("")
    })
    }
    if(isCementbrand){
        brandref.child("Cementbrand").push({
            Brand:AddNewBrand
        }).then((res)=>{
            slectbrandfalse()
            setBrandDialog(false)
            onChangeAddNewBrand("")
        })
        }
        if(isSteelbrand){
            brandref.child("Steelbrand").push({
                Brand:AddNewBrand
            }).then((res)=>{
                slectbrandfalse()
                setBrandDialog(false)
                onChangeAddNewBrand("")
            })
            }
            if(isPaintbrand){
                brandref.child("Paintbrand").push({
                    Brand:AddNewBrand
                }).then((res)=>{
                    slectbrandfalse()
                    setBrandDialog(false)
                    onChangeAddNewBrand("")
                })
                }
             if(isEwcbrand){
                brandref.child("EWCbrand").push({
                    Brand:AddNewBrand
                }).then((res)=>{
                    slectbrandfalse()
                    setBrandDialog(false)
                    onChangeAddNewBrand("")
                })
                }
             
             if(isGlassbrand){
                brandref.child("Glassbrand").push({
                    Brand:AddNewBrand
                }).then((res)=>{
                    slectbrandfalse()
                    setBrandDialog(false)
                    onChangeAddNewBrand("")
                })
                }
                if(isPipebrand){
                    brandref.child("Pipebrand").push({
                        Brand:AddNewBrand
                    }).then((res)=>{
                        slectbrandfalse()
                        setBrandDialog(false)
                        onChangeAddNewBrand("")
                    })
                    }
                    if(isWirebrand){
                        brandref.child("Wirebrand").push({
                            Brand:AddNewBrand
                        }).then((res)=>{
                            slectbrandfalse()
                            setBrandDialog(false)
                            onChangeAddNewBrand("")
                        })
                        }
                        if(isFloorbrand){
                            brandref.child("FloorTilebrand").push({
                                Brand:AddNewBrand
                            }).then((res)=>{
                                slectbrandfalse()
                                setBrandDialog(false)
                                onChangeAddNewBrand("")
                            })
                            }
                            if(isBathtilebrand){
                                brandref.child("BathroomTilebrand").push({
                                    Brand:AddNewBrand
                                }).then((res)=>{
                                    slectbrandfalse()
                                    setBrandDialog(false)
                                    onChangeAddNewBrand("")
                                })
                                }
                                if(isKitchenbrand){
                                    brandref.child("KitchenTilebrand").push({
                                        Brand:AddNewBrand
                                    }).then((res)=>{
                                        slectbrandfalse()
                                        setBrandDialog(false)
                                        onChangeAddNewBrand("")
                                    })
                                    }
                                    if(isGranitebrand){
                                    
                                       
                                            brandref.child("Granitebrand").push({
                                                Brand:AddNewBrand
                                            }).then((res)=>{
                                                slectbrandfalse()
                                                setBrandDialog(false)
                                                onChangeAddNewBrand("")
                                            })
                                            }
                                            if(isGlassbrand){
                                              brandref.child("Glassbrand").push({
                                                Brand:AddNewBrand
                                            }).then((res)=>{
                                                slectbrandfalse()
                                                setBrandDialog(false)
                                                onChangeAddNewBrand("")
                                            })


                                            }
                                    
                                    if(ishandrailbrand){
                                        brandref.child("HandRailsbrand").push({
                                            Brand:AddNewBrand
                                        }).then((res)=>{
                                            slectbrandfalse()
                                            setBrandDialog(false)
                                            onChangeAddNewBrand("")
                                        })
                                        }
                                        if(isWaterbrand){
                                            brandref.child("WaterTankbrand").push({
                                                Brand:AddNewBrand
                                            }).then((res)=>{
                                                slectbrandfalse()
                                                setBrandDialog(false)
                                                onChangeAddNewBrand("")
                                            })
                                            }
                                            if(isWhiteCementbrand){
                                              brandref.child("WhiteCementbrand").push({
                                                  Brand:AddNewBrand
                                              }).then((res)=>{
                                                  slectbrandfalse()
                                                  setBrandDialog(false)
                                                  onChangeAddNewBrand("")
                                              })
                                              }
                                            if(isSepticbrand){
                                                brandref.child("SepticTankbrand").push({
                                                    Brand:AddNewBrand
                                                }).then((res)=>
                                                {
                                                    slectbrandfalse()
                                                    setBrandDialog(false)
                                                    onChangeAddNewBrand("")
                                                })
                                                }
                                                else{
                                                    console.log('error')
                                                }
                                              }
                                                else{
                                                  slectbrandfalse()
                                                  setBrandDialog(false)
                                                }

            }

        
const slectbrandfalse=()=>{
  setisWhiteCementbrand(false)
    setisCementbrand(false)
    setisEwcbrand(false)
    setisSwitchesbrand(false)
    setishandrailbrand(false)
    setisFloorbrand(false)
    setisSepticbrand(false)
    setisWaterbrand(false)
    setisFloorbrand(false)
    setiskitchenbrand(false)
    setisbathtilebrand(false)
    setisPaintbrand(false)
    setisSteelbrand(false)
    setisPipebrand(false)
    setisGlassbrand(false)
    setisWirebrand(false)
    setisgranitebrand(false)
    
}
  const onEditData=async()=>{
    setspinner(true)
    const onValueChange =await reference.on('value', (snapshot) => {
    const data=snapshot.val()?snapshot.val():[];
   
  
    onChangeSwitchesbrand(data.Switchesbrand)
    onChangeSwithesrate(data.Switchesrate)
    onChangeEWCbrand(data.EWCbrand)
    onChangeEWCrate(data.EWCrate)
    onChangeFloortilebrand(data.Floortilebrand)
     onChangeFloortilerate(data.Floortilerate)
     onChangeIndianglasssetbrand(data.Indianglasssetbrand)
     onChangeIndianglasssetrate(data.Indianglasssetrate)
     onChangebathroomtilebrand(data.Bathroomtilebrand)
     onChangebathroomtilerate(data.Bathroomtilerate)
     onChangecementbrand(data.Cementbrand)
     onChangecementrate(data.Cementrate)
     onChangegranitetilebrand(data.Granitebrand)
     onChangegranitetilerate(data.Graniterate)       //gr
     onChangehandrailsbrand(data.Handrailsbrand)
     onChangehandrailsrate(data.Handrailsrate)
     onChangekitchentilebrand(data.Kitchentilebrand)
     onChangekitchentilerate(data.Kitchentilerate)
     onChangepaintbrand(data.Paintbrand)
     onChangepaintrate(data.Paintrate)
     onChangepipefittingbrand(data.Pipebrand)
     onChangepipefittingrate(data.Piperate)
     onChangesteelbrand(data.Steelbrand)
     onChangesteelrate(data.Steelrate)
     onChangewirebrand(data.Wirebrand)
     onChangewirerate(data.Wirerate)

     setTabsRate(data.TabsRate)
     setMaindoorRate(data.MaindoorRate)
     setToiletdoorRate(data.ToiletdoorRate)
     setWindowRate(data.WindowRate)
     setOtherdoorRate(data.OtherdoorRate)
     setIndianWatercloset(data.IndianWaterclosetRate)
     setEuropeanWatercloset(data.EuropeanWaterclosetRate)
     setWashBasin(data.WashBasinRate)

     setUnderGroundSumpRate(data.UnderGroundSumpRate)
     setundergroundsumpquantity(data.UnderGroundSumpQuantity)
     setOverHeadTankQuantity(data.OverHeadTankQuantity)
     setOverHeadTankRate(data.OverHeadTankRate)
     setSepticTankQuantity(data.SepticTankQuantity)
     setSepticTankRate(data.SepticTankRate)
     setspinner(false)


})
return () => {
          reference.off('value', onValueChange);
        };

  }  

  const onSubmit1=()=>{
    if(UnderGroundSumpQuantity!=""||OverHeadTankQuantity!=""||SepticTankQuantity!=""){
    reference1.set({
        UnderGroundSumpQuantity:UnderGroundSumpQuantity,
        UnderGroundSumpRateP:UnderGroundSumpRate,
        UnderGroundSumpAmount:UnderGroundSumpQuantity*UnderGroundSumpRate,
        OverHeadTankQuantity:OverHeadTankQuantity,
        OverHeadTankRate:OverHeadTankRate,
        OverHeadTankAmount:OverHeadTankQuantity*OverHeadTankRate,
        SepticTankQuantity:SepticTankQuantity,
        SepticTankRate:SepticTankRate,
        SepticTankAmount:SepticTankQuantity*SepticTankRate


    }).then((res) =>{
       // setpopup(true) 
    setUnderGroundSumpRate("")
    setundergroundsumpquantity("")
    setOverHeadTankQuantity("");
    setOverHeadTankRate("");
    setSepticTankQuantity("");
    setSepticTankRate("");
    })
}
else{
    ToastAndroid.show( "Please enter any one field", ToastAndroid.SHORT);
}

}
useEffect(() => {
      
   
    const Floor = database().ref('Construction').child('ProjectView').child('FloorQuotation');
      
       const onValueChange = Floor.on('value', (snapshot) => {
         const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
         const formattedData = items.map(([key, value]) => ({ key, ...value }));
         console.log(formattedData)
         setFloorData(formattedData.reverse());
       });
   
       return () => {
         reference.off('value', onValueChange);
       };
     }, []);

const onSubmitFloor=()=>{
    const Floor = database().ref('Construction').child('ProjectView').child('FloorQuotation');
    Floor.push({
        FloorName:FloorName,
        Length:Length,
        Breath:Breath,
        Quantity:Length*Breath,
        Rate:Rate,
        Amount:(Length*Breath)*Rate
       
    }).then((res)=>{
        
        setShow(false)
        setLength("")
        setBreath("")
        setRate("")
        setFloorName("")
    
    })

}
  const onSubmit =async () => {
    if(Switchesbrand!=""||cementbrand!=""||pipefittingbrand!=""||paintbrand!=""||wirebrand!=""||steelbrand!=""||EWCbrand!=""||Indianglasssetbrand!=""||Floortilebrand!=""||Kitchentilebrand!=""||Bathroomtilebrand!=""||handrailsbrand!=""){
  setspinner(true)
    await reference.set({
        Switchesbrand: Switchesbrand,
        Switchesrate:Switchesrate,
        Cementbrand: cementbrand,
        
        Cementrate: cementrate,
        WhiteCementbrand:WhiteCementbrand,
        WhiteCementrate:WhiteCementrate,
        Pipebrand:pipefittingbrand,
        Piperate: pipefittingrate,
        Paintbrand:paintbrand,
        Paintrate:paintrate,
        Wirebrand: wirebrand,
        Wirerate: wirerate,
        Steelbrand: steelbrand,
        Steelrate:steelrate,
        EWCbrand:EWCbrand,
        EWCrate:EWCrate,
        Indianglasssetbrand:Indianglasssetbrand,
        Indianglasssetrate:Indianglasssetrate,
        Floortilebrand:Floortilebrand,
        Floortilerate:Floortilerate,
        Kitchentilebrand:Kitchentilebrand,
        Kitchentilerate:Kitchentilerate,
        Bathroomtilebrand:Bathroomtilebrand,
        Bathroomtilerate:Bathroomtilerate,
        Granitebrand:Granitetilebrand,
        Graniterate:Granitetilerate,
        Handrailsbrand:handrailsbrand,
        Handrailsrate:handrailsrate,
        TabsRate:TabsRate,
        MaindoorRate:MaindoorRate,
        OtherdoorRate:OtherdoorRate,
        ToiletdoorRate:ToiletdoorRate,
        WindowRate:WindowRate,
        WashBasinRate:WashBasin,
        IndianWaterclosetRate:indianWatercloset,
        EuropeanWaterclosetRate:EuropeanWatercloset,
        UnderGroundSumpQuantity:UnderGroundSumpQuantity,
        UnderGroundSumpRate:UnderGroundSumpRate,
        UnderGroundSumpAmount:UnderGroundSumpQuantity*UnderGroundSumpRate,
        OverHeadTankQuantity:OverHeadTankQuantity,
        OverHeadTankRate:OverHeadTankRate,
        OverHeadTankAmount:OverHeadTankQuantity*OverHeadTankRate,
        SepticTankQuantity:SepticTankQuantity,
        SepticTankRate:SepticTankRate,
        SepticTankAmount:SepticTankQuantity*SepticTankRate
        
      


    }).then((res) =>{
     
      setpopup(true) 
    
      onChangeEWCbrand("")
      onChangeEWCrate("")
      onChangeFloortilebrand("")
      onChangeFloortilerate("")
      onChangeIndianglasssetbrand("")
      onChangeIndianglasssetrate("")
      onChangeSwitchesbrand("")
      onChangeSwithesrate("")
      onChangebathroomtilebrand("")
      onChangebathroomtilerate("")
      onChangecementbrand("")
      onChangecementrate("")
      onChangegranitetilebrand("")
      onChangegranitetilerate("")
     
      onChangehandrailsbrand("")
      onChangehandrailsrate("")
      onChangekitchentilebrand("")
      onChangekitchentilerate("")
      onChangepaintbrand("")
      onChangepaintrate("")
      onChangepipefittingbrand("")
      onChangepipefittingrate("")
      onChangesteelbrand("")
      onChangewirebrand("")
      onChangewirerate("")
      setIndianWatercloset("")
      setEuropeanWatercloset("")
      setWashBasin("")
      setTabsRate("")
      setMaindoorRate("")
      setOtherdoorRate("")
      setWindowRate("")
      setToiletdoorRate("")

      setUnderGroundSumpRate("")
    setundergroundsumpquantity("")
    setOverHeadTankQuantity("");
    setOverHeadTankRate("");
    setSepticTankQuantity("");
    setSepticTankRate("");
    setWhiteCementbrand("")
    setWhiteCementrate("")
    setspinner(false)
      
    })
  }
  else{
    ToastAndroid.show( "Please enter any one field", ToastAndroid.SHORT);
  }
}

const[selectbrand,setselectbrand]=useState(false);

// Join the labels with a comma and space

const handleInputChange = (text) => {
  // Allow only numeric input
  const numericInput = text.replace(/[^0-9]/g, '');
  onChangeSwithesrate(numericInput);
};
const handleInputChange1 = (text) => {
  // Allow only numeric input
  const numericInput = text.replace(/[^0-9]/g, '');
  onChangecementrate(numericInput);
};
const handleInputChange2 = (text) => {
 
  const numericInput = text.replace(/[^0-9]/g, '');
  onChangepaintrate(numericInput);
};
const handleInputChange3 = (text) => {
 const numericInput = text.replace(/[^0-9]/g, '');
  onChangesteelrate(numericInput);
};

const handleInputChange4 = (text) => {
  const numericInput = text.replace(/[^0-9]/g, '');
   onChangeEWCrate(numericInput);
 };

 const handleInputChange5 = (text) => {
  const numericInput = text.replace(/[^0-9]/g, '');
   onChangeIndianglasssetrate(numericInput);
 };
 const handleInputChange6 = (text) => {
  const numericInput = text.replace(/[^0-9]/g, '');
   onChangepipefittingrate(numericInput);
 };
 const handleInputChange7 = (text) => {
  const numericInput = text.replace(/[^0-9]/g, '');
   onChangewirerate(numericInput);
 };
 const handleInputChange8 = (text) => {
  const numericInput = text.replace(/[^0-9]/g, '');
   onChangeFloortilerate(numericInput);
 };
 const handleInputChange9 = (text) => {
  const numericInput = text.replace(/[^0-9]/g, '');
   onChangekitchentilerate(numericInput);
 };
 const handleInputChange10= (text) => {
  const numericInput = text.replace(/[^0-9]/g, '');
   onChangebathroomtilerate(numericInput);
 };
 const handleInputChange11 = (text) => {
  const numericInput = text.replace(/[^0-9]/g, '');
   onChangegranitetilerate(numericInput);
 };
 const handleInputChange12= (text) => {
  const numericInput = text.replace(/[^0-9]/g, '');
   onChangehandrailsrate(numericInput);
 };
 const handleInputChange13= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     setundergroundsumpquantity(numericInput);
   };
   const handleInputChange14= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     setUnderGroundSumpRate(numericInput);
   };
   const handleInputChange15= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     setOverHeadTankQuantity(numericInput);
   };
   const handleInputChange16= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     setOverHeadTankRate(numericInput);
   };
   const handleInputChange17= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     setSepticTankQuantity(numericInput);
   };
   const handleInputChange18= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     setSepticTankRate(numericInput);
   };
   const handleInputChange19= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     setWhiteCementrate(numericInput);
   };
 

   const FloorLength= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     setLength(numericInput);
   };
   const FloorWidth= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     setBreath(numericInput);
   };
   const FloorRate= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     setRate(numericInput);
   };

 const handleInputBrand = (text) => {
  // Allow only letters, numbers, and selected special characters
  const Text = text.replace(/[^\w\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g, '');
  onChangeAddNewBrand(Text)
};

const renderItem=({item,index})=>{
  
   
    const isSelected = SelectedSwitchbrand?.filter((i) => i === item.Brand ).length > 0;
    
    return(
    <View style={{marginVertical:10}}>
   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>{
  
  
        
  if(isSelected){
      setSelectedSwitchbrand((prev)=>prev.filter((i)=>i!==item.Brand))
  }
  else{
      setSelectedSwitchbrand((prev)=>[...prev,item.Brand])
  }
}

}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
      </TouchableOpacity>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item.Brand}</Text>
      
        
       
        
                    </View>
                    <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>
</View>
        </View>
    

  
    )
}

const ProjectItem = ({ item,onEdit, onDelete, onHandle}) => (

  
    
    <View style={Styles.projectItem}>
      
        <TouchableOpacity >
            <View style={Styles.contentContainer}>
            <Text style={Styles.projectName}>{`Floor Name:`}</Text>
            <Text style={Styles.projectName}>{`${item.FloorName}`}</Text>
            </View>
            <View style={Styles.contentContainer}>
            <Text style={Styles.InnerText}>{`Length`}</Text>
            <Text style={Styles.InnerText2}>{`${item.Length} feet`}</Text>
            </View>
            <View style={Styles.contentContainer}>
            <Text style={Styles.InnerText}>{`Breadth`}</Text>
            <Text style={Styles.InnerText2}>{`${item.Breath} feet`}</Text>
            </View>
            <View style={Styles.contentContainer}>
            <Text style={Styles.InnerText}>{`Quantity`}</Text>
            <Text style={Styles.InnerText2}>{`${item.Quantity} Sq feet`}</Text>
            </View>
            <View style={Styles.contentContainer}>
            <Text style={Styles.InnerText}>{`Rate:`}</Text>
            <Text style={Styles.InnerText2}>{`${item.Rate} Rs`}</Text>
           </View>
            <View style={Styles.contentContainer}>
            <Text style={Styles.InnerText}>{`Amount:`}</Text>
            <Text style={Styles.InnerText2}>{`${item.Amount} Rs`}</Text>
           </View>
           
            <View style={Styles.iconContainer}>
                {/* <TouchableOpacity>
                    <Ionicons name="create-outline" size={24} color="#3498db" style={styles.icon} />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={()=>deleteData(item.key)}>
                    <Ionicons name="trash-outline" size={24} color="#e74c3c" style={Styles.icon} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
       
    </View>


);


const renderItem1=({item,index})=>{
   
    const isSelected = SelectedCementbrand?.filter((i) => i === item.Brand ).length > 0;
    return(
    <View style={{marginVertical:10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',}}>
    <TouchableOpacity onPress={()=>{
      if(isSelected){
            setSelectedCementbrand((prev)=>prev.filter((i)=>i!==item.Brand))
        }
        else{
            setSelectedCementbrand((prev)=>[...prev,item.Brand])
        }}}>
        <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item.Brand}</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>
</View>
        </View>
    )
}
const renderItem2=({item,index})=>{
   
    const isSelected = SelectedPaintbrand?.filter((i) => i === item.Brand ).length > 0;
    return(
    <View style={{marginVertical:10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>{
      if(isSelected){
            setSelectedPaintbrand((prev)=>prev.filter((i)=>i!==item.Brand))
        }
        else{
            setSelectedPaintbrand((prev)=>[...prev,item.Brand])
        }}}>
        <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item.Brand}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>
                    </View>
        </View>
    )
}

const renderItem3=({item,index})=>{
   
    const isSelected = SelectedSteelbrand?.filter((i) => i === item.Brand ).length > 0;
    return(
    <View style={{marginVertical:10}}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>{
      if(isSelected){
            setSelectedSteelbrand((prev)=>prev.filter((i)=>i!==item.Brand))
        }
        else{
            setSelectedSteelbrand((prev)=>[...prev,item.Brand])
        }}}>
        <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item.Brand}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>
                    </View>
        </View>
    )
}
const renderItem4=({item,index})=>{
   
    const isSelected = SelectedEWCbrand?.filter((i) => i === item.Brand ).length > 0;
    return(
    <View style={{marginVertical:10}}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>{
      if(isSelected){
            setSelectedEWCbrand((prev)=>prev.filter((i)=>i!==item.Brand))
        }
        else{
            setSelectedEWCbrand((prev)=>[...prev,item.Brand])
        }}}>
        <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item?.Brand}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>
                    </View>
        </View>
    )
}
const renderItem5=({item,index})=>{
   
    const isSelected = SelectedGlassbrand?.filter((i) => i === item.Brand ).length > 0;
    return(
    <View style={{marginVertical:10}}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>{
      if(isSelected){
            setSelectedGlassbrand((prev)=>prev.filter((i)=>i!==item.Brand))
        }
        else{
            setSelectedGlassbrand((prev)=>[...prev,item.Brand])
        }}}>
        <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item.Brand}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>
                    </View>
        </View>
    )
}
const renderItem6=({item,index})=>{
   
    const isSelected = SelectedPipebrand?.filter((i) => i === item.Brand ).length > 0;
    return(
    <View style={{marginVertical:10}}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>{
      if(isSelected){
            setSelectedPipebrand((prev)=>prev.filter((i)=>i!==item.Brand))
        }
        else{
            setSelectedPipebrand((prev)=>[...prev,item.Brand])
        }}}>
        <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item.Brand}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>
                    </View>
        </View>
    )
}
const renderItem7=({item,index})=>{
   
    const isSelected = SelectedWirebrand?.filter((i) => i === item.Brand ).length > 0;
    return(
    <View style={{marginVertical:10}}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>{
      if(isSelected){
            setSelectedWirebrand((prev)=>prev.filter((i)=>i!==item.Brand))
        }
        else{
            setSelectedWirebrand((prev)=>[...prev,item.Brand])
        }}}>
        <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item.Brand}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>
                    </View>
        </View>
    )
}
const renderItem8=({item,index})=>{
   
    const isSelected = SelectedFloorTilebrand?.filter((i) => i === item.Brand ).length > 0;
    return(
    <View style={{marginVertical:10}}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>{
      if(isSelected){
            setSelectedFloorTilebrand((prev)=>prev.filter((i)=>i!==item.Brand))
        }
        else{
            setSelectedFloorTilebrand((prev)=>[...prev,item.Brand])
        }}}>
        <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item.Brand}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>
        </View>
        </View>
    )
}
const renderItem9=({item,index})=>{
   
    const isSelected = SelectedKitchenTilebrand?.filter((i) => i === item.Brand ).length > 0;
    return(
    <View style={{marginVertical:10}}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>{
      if(isSelected){
            setSelectedKitchenTilebrand((prev)=>prev.filter((i)=>i!==item.Brand))
        }
        else{
            setSelectedKitchenTilebrand((prev)=>[...prev,item.Brand])
        }}}>
        <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item.Brand}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>
                    </View>
        </View>
    )
}
const renderItem10=({item,index})=>{
   
    const isSelected = SelectedBathTilebrand?.filter((i) => i === item.Brand ).length > 0;
    return(
    <View style={{marginVertical:10}}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>{
      if(isSelected){
            setSelectedBathTilebrand((prev)=>prev.filter((i)=>i!==item.Brand))
        }
        else{
            setSelectedBathTilebrand((prev)=>[...prev,item.Brand])
        }}}>
        <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item.Brand}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>
                    </View>
        </View>
    )
}
const renderItem11=({item,index})=>{
   
    const isSelected = SelectedGranitebrand?.filter((i) => i === item.Brand ).length > 0;
    return(
    <View style={{marginVertical:10}}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>{
      if(isSelected){
            setSelectedGranitebrand((prev)=>prev.filter((i)=>i!==item.Brand))
        }
        else{
            setSelectedGranitebrand((prev)=>[...prev,item.Brand])
        }}}>
        <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item.Brand}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>
                    </View>
        </View>
    )
}
const renderItem12=({item,index})=>{
   
    const isSelected = SelectedHandrailbrand?.filter((i) => i === item.Brand ).length > 0;
    return(
    <View style={{marginVertical:10}}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>{
      if(isSelected){
            setSelectedHandRailbrand((prev)=>prev.filter((i)=>i!==item.Brand))
        }
        else{
            setSelectedHandRailbrand((prev)=>[...prev,item.Brand])
        }}}>
        <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item.Brand}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>
                    </View>
        </View>
    )
}
const renderItem13=({item,index})=>{
   
    const isSelected = SelectedWaterTankbrand?.filter((i) => i === item.Brand ).length > 0;
    return(
    <View style={{marginVertical:10}}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>{
      if(isSelected){
            setSelectedWaterTankbrand((prev)=>prev.filter((i)=>i!==item.Brand))
        }
        else{
            setSelectedWaterTankbrand((prev)=>[...prev,item.Brand])
        }}}>
        <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item.Brand}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>

                    </View>
        </View>
    )
}
const renderItem14=({item,index})=>{
   
    const isSelected = SelectedWhiteCementbrand?.filter((i) => i === item.Brand ).length > 0;
    return(
    <View style={{marginVertical:10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>{
      if(isSelected){
            setSelectedWhiteCementbrand((prev)=>prev.filter((i)=>i!==item.Brand))
        }
        else{
            setSelectedWhiteCementbrand((prev)=>[...prev,item.Brand])
        }}}>
        <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,width:20,height:20,alignItems:'center',justifyContent:'center'}}>
          {isSelected? (<Octicons style={{ color:'green',  position: 'absolute' }} name='check' size={20} />):null}
      </View>
        <Text style={{fontSize:15,marginLeft:20,color:'black'}}>{item.Brand}</Text>
        </View>
        </TouchableOpacity>
                <TouchableOpacity onPress={()=>deleteData(item)}>
                        <Ionicons name="trash-outline" size={24} color="#e74c3c"  />
                    </TouchableOpacity>
                    </View>
        </View>
    )
}
// const outerScrollViewRef = useRef(null);
// const innerScrollViewRef = useRef(null);

// const handleOuterScroll = (event) => {
//     // Calculate the desired scroll position for the inner ScrollView
//     const scrollY = event.nativeEvent.contentOffset.y;
//     innerScrollViewRef.current.scrollTo({ y: scrollY, animated: false });
//   };
  return (
    <Provider>
    <View style={{flex:1, backgroundColor: '#ECF0F1' }}>
    <Spinner
          visible={spinner}
          textContent={'Loading...'}
         
        />
    
   
        <Portal>
            <Dialog visible={popup}>
                 {/* <Dialog.Title style={{fontSize:17}}>Meterial </Dialog.Title> */}
                 <Dialog.Content>
                 <View style={{height:50,width:50,borderRadius:50,borderWidth:0,alignSelf:'center',alignItems:'center',justifyContent:'center',marginTop:-50,backgroundColor:'#2f4f4f'}}>
                    <AntDesign name="check" size={35} color={'white'} style={{}}/>

                </View>
                <Text style={{alignSelf:'center',fontSize:20,color:'black',marginTop:5}}>Material</Text>
                  <Text style={{alignSelf:'center',fontSize:15,marginTop:10}}>Material Details Updated Success</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                     
              
                <Button buttonColor='#2f4f4f' textColor='white' mode='outlined'  style={{alignSelf:'center',width:100,marginRight:responsiveWidth(25)}} onPress={()=>setpopup(false)}>ok</Button>
             </Dialog.Actions>
                   
                 </Dialog>
            </Portal>
            <Portal>
            <Dialog visible={selectbrand} onDismiss={()=>{setselectbrand(false)
             slectbrandfalse()
         
            }}>
                 {/* <Dialog.Title style={{fontSize:17}}>Meterial </Dialog.Title> */}
                 <Dialog.Content>
                
                <Text style={{alignSelf:'center',fontSize:20,color:'black',marginTop:5}}>Select Material Brand</Text>
                 <View style={{marginTop:20}}>
             {isSwitchesbrand &&(    
                  <FlatList
                  data={SwitchBrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem}
               />
             )}
             {isCementbrand&&(
              <FlatList
                  data={CementBrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem1}
               />
               )}
                 {isPaintbrand&&(
              <FlatList
                  data={PaintBrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem2}
               />
               )}
                 {isSteelbrand&&(
              <FlatList
                  data={SteelBrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem3}
               />
               )}
                 {isEwcbrand&&(
              <FlatList
                  data={EWCBrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem4}
               />
               )}
                 {isGlassbrand&&(
              <FlatList
                  data={GlassBrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem5}
               />
               )}
                 {isPipebrand&&(
              <FlatList
                  data={PipeBrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem6}
               />
               )}
                 {isWirebrand&&(
              <FlatList
                  data={WireBrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem7}
               />
               )}
                 {isFloorbrand&&(
              <FlatList
                  data={FloorTileBrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem8}
               />
               )}
                 {isKitchenbrand&&(
              <FlatList
                  data={KitchenTileBrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem9}
               />
               )}
                 {isBathtilebrand&&(
              <FlatList
                  data={BathTileBrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem10}
               />
               )}
                 {isGranitebrand&&(
              <FlatList
                  data={GraniteBrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem11}
               />
               )}
                 {ishandrailbrand&&(
              <FlatList
                  data={HandRailBrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem12}
               />
               )}
                 {isWaterbrand&&(
              <FlatList
                  data={WaterTankBrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem13}
               />
               )}
                 {isWhiteCementbrand&&(
              <FlatList
                  data={WhiteCementbrandList}
                  keyExtractor={(item) => item.key}
                  renderItem={renderItem14}
               />
               )}
               
               </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                     
              
                <Button buttonColor='#2f4f4f' textColor='white' mode='outlined'  style={{alignSelf:'center',width:100,marginRight:responsiveWidth(25)}} onPress={()=>{
                    if(isSwitchesbrand===true){
                        const formatSelectedItems = SelectedSwitchbrand.join(', '); 
                    onChangeSwitchesbrand(formatSelectedItems)
                    }
                    else if(isCementbrand===true){
                        const formatSelectedItems = SelectedCementbrand.join(', '); 
                        onChangecementbrand(formatSelectedItems)
                    }
                    else if(isPaintbrand===true){
                        const formatSelectedItems = SelectedPaintbrand.join(', '); 
                        onChangepaintbrand(formatSelectedItems)
                    }
                    else if(isWhiteCementbrand===true){
                      const formatSelectedItems = SelectedWhiteCementbrand.join(', '); 
                      setWhiteCementbrand(formatSelectedItems)
                  }
                    else if(isSteelbrand===true){
                        const formatSelectedItems = SelectedSteelbrand.join(', '); 
                        onChangesteelbrand(formatSelectedItems)
                    }
                    else if(isEwcbrand===true){
                        const formatSelectedItems = SelectedEWCbrand.join(', '); 
                        onChangeEWCbrand(formatSelectedItems)
                    }
                    else if(isGlassbrand===true){
                        const formatSelectedItems = SelectedGlassbrand.join(', '); 
                        onChangeIndianglasssetbrand(formatSelectedItems)
                    }
                    else if(isPipebrand===true){
                        const formatSelectedItems = SelectedPipebrand.join(', '); 
                        onChangepipefittingbrand(formatSelectedItems)
                    }
                    else if(isWirebrand===true){
                        const formatSelectedItems = SelectedWirebrand.join(', '); 
                        onChangewirebrand(formatSelectedItems)
                    }
                    else if(isFloorbrand===true){
                        const formatSelectedItems = SelectedFloorTilebrand.join(', '); 
                        onChangeFloortilebrand(formatSelectedItems)
                    }
                    else if(isKitchenbrand===true){
                        const formatSelectedItems = SelectedKitchenTilebrand.join(', '); 
                        onChangekitchentilebrand(formatSelectedItems)
                    }
                    else if(isBathtilebrand===true){
                        const formatSelectedItems = SelectedBathTilebrand.join(', '); 
                        onChangebathroomtilebrand(formatSelectedItems)
                    }
                    else if(isGranitebrand===true){
                        const formatSelectedItems = SelectedGranitebrand.join(', '); 
                        onChangegranitetilebrand(formatSelectedItems)
                    }
                    else if(ishandrailbrand===true){
                        const formatSelectedItems = SelectedHandrailbrand.join(', '); 
                        onChangehandrailsbrand(formatSelectedItems)
                    }
                    else if(isWaterbrand===true){
                        const formatSelectedItems = SelectedWaterTankbrand.join(', '); 
                        onChangewatertankbrand(formatSelectedItems)
                    }
                    else if(isSepticbrand===true){
                        const formatSelectedItems = SelectedSeptictankbrand.join(', '); 
                        onChangeseptictankbrand(formatSelectedItems)
                    }
                    else{
                        console.log('error')
                    }
                    setselectbrand(false)
                    slectbrandfalse()
                    }}>ok</Button>
             </Dialog.Actions>
                   
                 </Dialog>
                 </Portal>

                 <Portal>
                 <Dialog visible={BrandDialog} onDismiss={()=>{setBrandDialog(false)
                   slectbrandfalse()}
                }>
                 <Dialog.Title style={{fontSize:17}}>Add New Brands</Dialog.Title>
                 <Dialog.Content>
                <TextInput
                  placeholder="Type something..."
                 value={AddNewBrand}
                 onChangeText={handleInputBrand}
                  style={{ borderWidth: 1, borderColor: '#ccc', padding: 8,marginTop:20 }}
                />
                  <TouchableOpacity onPress={()=>{
                   brandSubmit()

                  }}>
                <View style={{padding:10,marginLeft:responsiveWidth(10),marginTop:20,marginRight:responsiveWidth(10),
                    borderWidth:0,borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:'#ff9900'}}>
                    <Text style={{fontSize:15,color:'white'}}>Submit</Text>
                </View>
                </TouchableOpacity>
                 
                </Dialog.Content>
                </Dialog>

            </Portal>

            <ScrollView>
                          <View style={{ margin: 10,  justifyContent: 'center', }}>
 
   
    <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
       <View style={[Styles.ItemView,{justifyContent:'space-between'}]}>
        
        <TouchableOpacity onPress={()=>{setselectbrand(true)
        setisSwitchesbrand(true)}}>
       <Text style={Styles.Label}>Add Brand</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>{
         setisSwitchesbrand(true)
        setBrandDialog(true)
   
    }}>
       <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>

        <Text style={{color:'white',fontSize:14,padding:10}}>Add Brand</Text>
       </View>
       </TouchableOpacity>

       </View>
       
            <View style={[Styles.ItemView]}>
          
            <Text style={Styles.Label}>Switches Brand:</Text>
            <TouchableOpacity onPress={()=>{setselectbrand(true)
        setisSwitchesbrand(true)}}
        style={{flex:1}}
        >
            <TextInput
                style={Styles.TextInput}
                onChangeText={onChangeSwitchesbrand}
                textAlign="center"
                multiline={true}
                editable={false}
                value={Switchesbrand}
            />
            </TouchableOpacity>
            </View>
           
       
        <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                
                onChangeText={handleInputChange}
                value={Switchesrate}
            />
        </View>
        </ImageBackground>
        </View>
        <View >
        <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
       
        <View style={[Styles.ItemView,{justifyContent:'space-between'}]}>
        
        
        <Text style={Styles.Label}>Add Brand</Text>
        <TouchableOpacity onPress={()=>{
          setisCementbrand(true)
         setBrandDialog(true)
    
     }}>
        <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>
 
         <Text style={{color:'white',fontSize:14,padding:10}}>Add Brand</Text>
        </View>
        </TouchableOpacity>
 
        </View>
        
        
            <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Cement Brand:</Text>
            <TouchableOpacity onPress={()=>{setselectbrand(true)
            setisCementbrand(true)
            }} style={{flex:1}} >
            <TextInput
                style={Styles.TextInput}
                onChangeText={onChangecementbrand}
                textAlign="center"
                multiline={true}
                editable={false}
                value={cementbrand}
            />
            </TouchableOpacity>
            </View>
       
        <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange1}
                value={cementrate}
            />
        </View>
      
        </ImageBackground>
        </View>
        </View>
        <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
       
        <View style={[Styles.ItemView,{justifyContent:'space-between'}]}>
        
        
        <Text style={Styles.Label}>Add Brand</Text>
        <TouchableOpacity onPress={()=>{
          setisWhiteCementbrand(true)
         setBrandDialog(true)
    
     }}>
        <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>
 
         <Text style={{color:'white',fontSize:14,padding:10}}>Add Brand</Text>
        </View>
        </TouchableOpacity>
 
        </View>
        
        
            <View style={Styles.ItemView} >
            <Text style={Styles.Label}>WhiteCement Brand:</Text>
            <TouchableOpacity onPress={()=>{setselectbrand(true)
            setisWhiteCementbrand(true)
            }} style={{flex:1}} >
            <TextInput
                style={Styles.TextInput}
                onChangeText={setWhiteCementbrand}
                textAlign="center"
                multiline={true}
                editable={false}
                value={WhiteCementbrand}
            />
            </TouchableOpacity>
            </View>
       
        <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange19}
                value={WhiteCementrate}
            />
        </View>
      
        </ImageBackground>
        </View>
        
        <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
       
        <View style={[Styles.ItemView,{justifyContent:'space-between'}]}>
        
        
        <Text style={Styles.Label}>Add Brand</Text>
        <TouchableOpacity onPress={()=>{
          setisPaintbrand(true)
         setBrandDialog(true)
    
     }}>
        <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>
 
         <Text style={{color:'white',fontSize:14,padding:10}}>Add Brand</Text>
        </View>
        </TouchableOpacity>
 
        </View>
            <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Paint Brand:</Text>
            <TouchableOpacity onPress={()=>{setselectbrand(true)
            setisPaintbrand(true)
            }} style={{flex:1}} >
            <TextInput
                style={Styles.TextInput}
                onChangeText={onChangepaintbrand}
                textAlign="center"
                multiline={true}
                editable={false}
                value={paintbrand}
            />
            </TouchableOpacity>
            </View>
       
        <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange2}
                value={paintrate}
            />
        </View>
      
        </ImageBackground>
        </View>
        <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
        <View style={[Styles.ItemView,{justifyContent:'space-between'}]}>
        
        
        <Text style={Styles.Label}>Add Brand</Text>
        <TouchableOpacity onPress={()=>{
          setisSteelbrand(true)
         setBrandDialog(true)
    
     }}>
        <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>
 
         <Text style={{color:'white',fontSize:14,padding:10}}>Add Brand</Text>
        </View>
        </TouchableOpacity>
 
        </View>
            <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Steel Brand:</Text>
            <TouchableOpacity onPress={()=>{setselectbrand(true)
            setisSteelbrand(true)
            }} style={{flex:1}} >
            <TextInput
                style={Styles.TextInput}
                onChangeText={onChangesteelbrand}
                textAlign="center"
                multiline={true}
                editable={false}
                value={steelbrand}
            />
            </TouchableOpacity>
            </View>
       
        <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange3}
                value={steelrate}
            />
        </View>
        </ImageBackground>
        </View>
        <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
        <View style={[Styles.ItemView,{justifyContent:'space-between'}]}>
        
        
        <Text style={Styles.Label}>Add Brand</Text>
        <TouchableOpacity onPress={()=>{
          setisEwcbrand(true)
         setBrandDialog(true)
    
     }}>
        <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>
 
         <Text style={{color:'white',fontSize:14,padding:10}}>Add Brand</Text>
        </View>
        </TouchableOpacity>
 
        </View>
            <View style={Styles.ItemView} >
            <Text style={Styles.Label}>EWC Brand:</Text>
            <TouchableOpacity onPress={()=>{setselectbrand(true)
            setisEwcbrand(true)
            }} style={{flex:1}} >
            <TextInput
                style={Styles.TextInput}
                onChangeText={onChangeEWCbrand}
                textAlign="center"
                multiline={true}
                editable={false}
                value={EWCbrand}

            />
            </TouchableOpacity>
            </View>
       
        <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange4}
                value={EWCrate}
            />
        </View>
        </ImageBackground>
        </View>
        <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
        <View style={[Styles.ItemView,{justifyContent:'space-between'}]}>
        
        
        <Text style={Styles.Label}>Add Brand</Text>
        <TouchableOpacity onPress={()=>{
          setisGlassbrand(true)
          setBrandDialog(true)
    
     }}>
        <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>
 
         <Text style={{color:'white',fontSize:14,padding:10}}>Add Brand</Text>
        </View>
        </TouchableOpacity>
 
        </View>
            <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Indian Glass Set Brand:</Text>
            <TouchableOpacity onPress={()=>{setselectbrand(true)
            setisGlassbrand(true)
            }} style={{flex:1}} >
            <TextInput
                style={Styles.TextInput}
                onChangeText={onChangeIndianglasssetbrand}
                textAlign="center"
                multiline={true}
                editable={false}
               
               value={Indianglasssetbrand}
            />
            </TouchableOpacity>
            </View>
       
        <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange5}
                value={Indianglasssetrate}
            />
        </View>
        </ImageBackground>
        </View>
        <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
        <View style={[Styles.ItemView,{justifyContent:'space-between'}]}>
        
        
        <Text style={Styles.Label}>Add Brand</Text>
        <TouchableOpacity onPress={()=>{
          setisPipebrand(true)
         setBrandDialog(true)
    
     }}>
        <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>
 
         <Text style={{color:'white',fontSize:14,padding:10}}>Add Brand</Text>
        </View>
        </TouchableOpacity>
 
        </View>
            <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Pipe Fitting Brand:</Text>
            <TouchableOpacity onPress={()=>{setselectbrand(true)
            setisPipebrand(true)
            }} style={{flex:1}} >
            <TextInput
                style={Styles.TextInput}
                onChangeText={onChangepipefittingbrand}
                textAlign="center"
                multiline={true}
                editable={false}
               
               value={pipefittingbrand}
            />
            </TouchableOpacity>
            </View>
       
        <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange6}
                value={pipefittingrate}
            />
        </View>
        </ImageBackground>
        </View>
        <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
        <View style={[Styles.ItemView,{justifyContent:'space-between'}]}>
        
        
        <Text style={Styles.Label}>Add Brand</Text>
        <TouchableOpacity onPress={()=>{
          setisWirebrand(true)
         setBrandDialog(true)
    
     }}>
        <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>
 
         <Text style={{color:'white',fontSize:14,padding:10}}>Add Brand</Text>
        </View>
        </TouchableOpacity>
 
        </View>
            <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Wire Brand:</Text>
            <TouchableOpacity onPress={()=>{setselectbrand(true)
            setisWirebrand(true)
            }} style={{flex:1}} >
            <TextInput
                style={Styles.TextInput}
                onChangeText={onChangewirebrand}
                textAlign="center"
                multiline={true}
                editable={false}
               
               value={wirebrand}
            />
            </TouchableOpacity>
            </View>
       
        <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange7}
                value={wirerate}
            />
        </View>
        </ImageBackground>
        </View>
      
        <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
        <View style={[Styles.ItemView,{justifyContent:'space-between'}]}>
        
        
        <Text style={Styles.Label}>Add Brand</Text>
        <TouchableOpacity onPress={()=>{
          setisFloorbrand(true)
         setBrandDialog(true)
    
     }}>
        <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>
 
         <Text style={{color:'white',fontSize:14,padding:10}}>Add Brand</Text>
        </View>
        </TouchableOpacity>
 
        </View>
            <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Floor Tiles Brand:</Text>
            <TouchableOpacity onPress={()=>{setselectbrand(true)
            setisFloorbrand(true)
            }} style={{flex:1}} >
            <TextInput
                style={Styles.TextInput}
                onChangeText={onChangeFloortilebrand}
                textAlign="center"
                multiline={true}
                editable={false}
                value={Floortilebrand}
            />
            </TouchableOpacity>
            </View>
       
        <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange8}
                value={Floortilerate}
            />
        </View>
        </ImageBackground>
        </View>
        <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
        <View style={[Styles.ItemView,{justifyContent:'space-between'}]}>
        
        
        <Text style={Styles.Label}>Add Brand</Text>
        <TouchableOpacity onPress={()=>{
          setiskitchenbrand(true)
         setBrandDialog(true)
    
     }}>
        <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>
 
         <Text style={{color:'white',fontSize:14,padding:10}}>Add Brand</Text>
        </View>
        </TouchableOpacity>
 
        </View>
            <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Kitchen Tiles Brand:</Text>
            <TouchableOpacity onPress={()=>{setselectbrand(true)
            setiskitchenbrand(true)
            }} style={{flex:1}} >
            <TextInput
                style={Styles.TextInput}
                onChangeText={onChangekitchentilebrand}
                textAlign="center"
                multiline={true}
                editable={false}
             
               value={Kitchentilebrand}
            />
            </TouchableOpacity>
           
        </View>
        <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange9}
                value={Kitchentilerate}
            />
        </View>
        </ImageBackground>
        </View>
        <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
        <View style={[Styles.ItemView,{justifyContent:'space-between'}]}>
        
        
        <Text style={Styles.Label}>Add Brand</Text>
        <TouchableOpacity onPress={()=>{
          setisbathtilebrand(true)
         setBrandDialog(true)
    
     }}>
        <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>
 
         <Text style={{color:'white',fontSize:14,padding:10}}>Add Brand</Text>
        </View>
        </TouchableOpacity>
 
        </View>
            <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Bathroom Tiles Brand:</Text>
            <TouchableOpacity onPress={()=>{setselectbrand(true)
            setisbathtilebrand(true)
            }} style={{flex:1}} >
            <TextInput
                style={Styles.TextInput}
                onChangeText={onChangebathroomtilebrand}
                textAlign="center"
                multiline={true}
                editable={false}
                value={Bathroomtilebrand}
            />
            
           </TouchableOpacity>
        </View>
        <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange10}
                value={Bathroomtilerate}
            />
        </View>
        </ImageBackground>
        </View>
      
        <View style={Styles.card}>
       
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
        <View style={[Styles.ItemView,{justifyContent:'space-between'}]}>
        
        
        <Text style={Styles.Label}>Add Brand</Text>
        <TouchableOpacity onPress={()=>{
          setisgranitebrand(true)
         setBrandDialog(true)
    
     }}>
        <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>
 
         <Text style={{color:'white',fontSize:14,padding:10}}>Add Brand</Text>
        </View>
        </TouchableOpacity>
 
        </View>
            <View style={Styles.ItemView}>
            <Text style={Styles.Label}>Granite Brand:</Text>
            <TouchableOpacity onPress={()=>{setselectbrand(true)
            setisgranitebrand(true)
            }} style={{flex:1}} >
            <TextInput
                style={Styles.TextInput}
                onChangeText={onChangegranitetilebrand}
                textAlign="center"
                multiline={true}
                editable={false}
                value={Granitetilebrand}
            />
            </TouchableOpacity>
           
        </View>
       
        <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange11}
                value={Granitetilerate}
            />
        </View>
        </ImageBackground>
        </View>
      
        <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
        <View style={[Styles.ItemView,{justifyContent:'space-between'}]}>
        
        
       <Text style={Styles.Label}>Add Brand</Text>
       <TouchableOpacity onPress={()=>{
         setishandrailbrand(true)
        setBrandDialog(true)
   
    }}>
       <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>

        <Text style={{color:'white',fontSize:14,padding:10}}>Add Brand</Text>
       </View>
       </TouchableOpacity>

       </View>
            <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Hand Rails Brand:</Text>
            <TouchableOpacity onPress={()=>{setselectbrand(true)
            setishandrailbrand(true)
            }} style={{flex:1}} >
            <TextInput
                style={Styles.TextInput}
                onChangeText={onChangehandrailsbrand}
                textAlign="center"
                editable={false}
                multiline={true}
                value={handrailsbrand}
            />
           </TouchableOpacity> 
           
        </View>
        <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange12}
                value={handrailsrate}
            />
        </View>
        </ImageBackground>
        </View>
      
        
      <Text style={{fontSize:17,fontWeight:'bold',color:'black'}}>Additional Works</Text>
      <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
         <View style={[Styles.ItemView]}>
            <Text style={Styles.Label}>Under Ground Sump(lit):</Text>
            <TextInput
                style={Styles.TextInput}
                onChangeText={handleInputChange13}
                textAlign="center"
                keyboardType='number-pad'
                value={UnderGroundSumpQuantity}
            />
            </View>
           <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange14}
                value={UnderGroundSumpRate}
            />
        </View>
        </ImageBackground>
        </View>
        <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
         <View style={[Styles.ItemView]}>
            <Text style={Styles.Label}>Overhead Tank Sintex(lit):</Text>
            <TextInput
                style={Styles.TextInput}
                onChangeText={handleInputChange15}
                textAlign="center"
                keyboardType='number-pad'
                value={OverHeadTankQuantity}
            />
            </View>
           <View style={Styles.ItemView} >
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange16}
                value={OverHeadTankRate}
            />
        </View>
        </ImageBackground>
        </View>
        <View style={Styles.card}>
        <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
         <View style={[Styles.ItemView]}>
            <Text style={Styles.Label}>Septic Tank(lit):</Text>
            <TextInput
                style={Styles.TextInput}
                onChangeText={handleInputChange17}
                textAlign="center"
                keyboardType='number-pad'
                value={SepticTankQuantity}
            />
            </View>
           <View style={Styles.ItemView}>
            <Text style={Styles.Label}>Rate:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={handleInputChange18}
                value={SepticTankRate}
            />
        </View>
        </ImageBackground>
        </View>
       
  
   
    <Text style={{fontSize:17,fontWeight:'bold',color:'black'}}>Other Material Rate</Text>
                 
                  <View style={[Styles.card]}>
                  <ImageBackground source={require('../const5.jpg')} resizeMode="cover" style={{padding:20}}  >
    
         <View style={[Styles.ItemView]}>
            <Text style={[Styles.Label]}>Tabs for wash basins/sinks/bathing:</Text>
            <TextInput
                style={Styles.TextInput}
                onChangeText={text=>handleonChangetext(text,'Tabs')}
                textAlign="center"
                keyboardType='number-pad'
                value={TabsRate}
            />
            </View>
           <View style={Styles.ItemView}>
            <Text style={[Styles.Label]}>Accessories for main door:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={text=>handleonChangetext(text,'Maindoor')}
                value={MaindoorRate}
            />
        </View>
        <View style={Styles.ItemView}>
            <Text style={[Styles.Label]}>Accessories for other door:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={text=>handleonChangetext(text,'Otherdoor')}
                value={OtherdoorRate}
            />
        </View>
        <View style={Styles.ItemView}>
            <Text style={[Styles.Label]}>Accessories for toilet door:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={text=>handleonChangetext(text,'Toiletdoor')}
                value={ToiletdoorRate}
            />
        </View>
        <View style={Styles.ItemView}>
            <Text style={[Styles.Label]}>Accessories for all windows:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={text=>handleonChangetext(text,'Windows')}
                value={WindowRate}
            />
        </View>
        <View style={Styles.ItemView}>
            <Text style={[Styles.Label]}>Indian Water closet:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={text=>handleonChangetext(text,'IndianWatercloset')}
                value={indianWatercloset}
            />
        </View>
        <View style={Styles.ItemView}>
            <Text style={[Styles.Label,]}>European Water closet:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={text=>handleonChangetext(text,'EuropeanWatercloset')}
                value={EuropeanWatercloset}
            />
        </View>
        <View style={Styles.ItemView}>
            <Text style={[Styles.Label]}>Wash Basin:</Text>

            <TextInput
                style={Styles.TextInput}
                keyboardType='number-pad'
                textAlign="center"
                onChangeText={text=>handleonChangetext(text,'Washbasin')}
                value={WashBasin}
            />
        </View>
        
      </ImageBackground>
        </View>
        </View>
        <View style={{marginBottom:30,flexDirection:'row',alignItems:'center',justifyContent:'center'
                }}>
    <TouchableOpacity onPress={()=>{
        onSubmit()
      // onSubmit1()
    }} style={{
                    backgroundColor: '#ff9900', alignItems: 'center', justifyContent: 'center', width: 150,
                    alignSelf: 'center',borderRadius:10}}>
               
                    <Text style={{ fontSize: 14, padding: 10, color: 'white' }}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onEditData} style={{
                    backgroundColor: '#ff9900', alignItems: 'center', justifyContent: 'center', width: 150,marginLeft:20,
                    alignSelf: 'center',borderRadius:10}}>
               
                    <Text style={{ fontSize: 14, padding: 10, color: 'white' }}>Edit</Text>
                    </TouchableOpacity>
                </View>


                <View >
    
                  </View>
                  
                <Text style={{fontSize:17,fontWeight:'bold',color:'black',marginLeft:20}}>Floor Details</Text>
                <TouchableOpacity onPress={()=>{setShow(true)}} style={{alignSelf:'flex-end',marginRight:20}}>
        <View style={[{backgroundColor:'#ff9900',borderRadius:10}]}>
        <Portal>
                <Dialog visible={Show} onDismiss={()=>setShow(false)} >
                <Dialog.Title style={{fontSize:17}}>Add Floor</Dialog.Title>
                <Dialog.Content>
                <View style={Styles.ItemView} >
   <Text style={Styles.Label1}>Floor Name:</Text>

   <TextInput
       style={Styles.TextInput}
      
       textAlign="center"
       onChangeText={setFloorName}
       value={FloorName}
   />
</View>
   <View style={Styles.ItemView} >
   <Text style={Styles.Label1}>Length :</Text>
  
   <TextInput
       style={Styles.TextInput}
       onChangeText={FloorLength}
       value={Length}
       keyboardType='number-pad'
       textAlign="center"
      />
   
  
</View>
<View style={Styles.ItemView} >
   <Text style={Styles.Label1}>Breadth:</Text>

   <TextInput
       style={Styles.TextInput}
       keyboardType='number-pad'
       textAlign="center"
      
       onChangeText={FloorWidth}
       value={Breath}
   />
</View>
<View style={Styles.ItemView} >
   <Text style={Styles.Label1}>Rate(Rs):</Text>

   <TextInput
       style={Styles.TextInput}
       keyboardType='number-pad'
       textAlign="center"
       onChangeText={FloorRate}
       value={Rate}
   />
    </View>
            <TouchableOpacity onPress={onSubmitFloor}>
                <View style={{padding:10,marginLeft:responsiveWidth(10),marginTop:20,marginRight:responsiveWidth(10),
                    borderWidth:0,borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:'#ff9900'}}>
                    <Text style={{fontSize:15,color:'white'}}>Submit</Text>
                </View>
                </TouchableOpacity>

                </Dialog.Content>
                 </Dialog>
                 </Portal>

        <Text style={{color:'white',fontSize:14,padding:10}}>Add Floor</Text>

        </View>
      
        </TouchableOpacity>
       
  
        <View style={{margin:25}} >
                    <FlatList
                        data={FloorData}
                        keyExtractor={(item) => item.key}
                        scrollEnabled={false}
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
                {/* <TouchableOpacity onPress={()=>navigation.navigate('Quotegenerator')} style={{ backgroundColor: '#ff9900', alignItems: 'center', justifyContent: 'center', width: 150,
                                 alignSelf: 'center',borderRadius:10}}>
                                <Text style={{ fontSize: 14, padding: 10, color: 'white' }}>Generate Pdf</Text>
                                  </TouchableOpacity> */}
                                


                                  </ScrollView>
</View>
</Provider>
  );
};

const Styles = StyleSheet.create({
  ItemView: {
    flexDirection: 'row', marginVertical: 10, alignItems: 'center'
},
TextInput: {
    borderWidth: 1, padding: 8,fontSize: 14,color:'black', flex: 1, borderColor: '#2f4f4f', borderRadius: 10,backgroundColor:'white'
},
Label: {
    marginRight: 10,fontWeight:'bold', fontSize: 14, color: 'white',width:responsiveWidth(40)
},
Label1: {
    marginRight: 10,fontWeight:'bold', fontSize: 14, color: 'black',width:responsiveWidth(40)
},



buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },

  contentContainer:{
    flexDirection:'row',marginVertical:4
},
InnerText:{
    color: 'black' ,width:responsiveWidth(50),fontSize:14

},
InnerText2:{
    color: 'black' ,fontSize:14

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
  invoiceDetails: {
    marginBottom: 20,
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  items: {
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemName: {
    flex: 1,
  },
  itemPrice: {
    marginLeft: 10,
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
},
icon: {
    marginLeft: 15,
},
projectItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
     marginTop:10,
    elevation: 3,
    borderWidth:0
},
projectName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
},
});

export default QuoteView;