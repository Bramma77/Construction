import React, { useRef,useState ,useEffect} from 'react';
import { View,TextInput, Button, Text, Linking, StyleSheet,TouchableOpacity ,RefreshControl} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import Share from 'react-native-share';
import RenderHtml from 'react-native-render-html';
import { PermissionsAndroid } from 'react-native';
import Pdf from 'react-native-pdf';
import database from '@react-native-firebase/database';
import RNFS from 'react-native-fs';
import storage from '@react-native-firebase/storage'
import moment from 'moment';

import { ScrollView } from 'react-native-gesture-handler';
import { responsiveWidth } from 'react-native-responsive-dimensions';


const Invoiceshare = ({route}) => {
    const{item}=route.params;
  const pdfRef = useRef();
const[path,setpath]=useState(false);
const[Data,setData]=useState([]);
const[Amount,setAmount]=useState(0);
const[AddItems,onChangeAddItems]=useState("");
const[InvoiceTo,onChangeInvoiceTo]=useState("");
const[phoneno,onChangephoneno]=useState("");

const [zoomLevel, setZoomLevel] = useState(1);
const[logourl,setlogourl]=useState("");

// const imageToBase64 = async (imagePath) => {
//     try {
//       const imageBase64 = await RNFS.readFile(imagePath, 'base64');
//       return `data:image/png;base64,${imageBase64}`;
//     } catch (error) {
//       console.error('Error converting image to Base64:', error);
//       return null;
//     }
//   };

//   const imagePath = '../assets/cons.png';
// useEffect(()=>{
//        console.log('item',item) 
//     const dataRef = database().ref('Construction').child('ProjectView').child('Quote').child(item.key);
//     console.log(dataRef)
//     const onValueChange = dataRef.on('value', (snapshot) => {
      
//       //  setManpower(snapshot.val())
//     //  console.log(snapshot.val())
//       console.log('material',snapshot.val())
      
//       const bathroomtilerate=snapshot.val().Bathroomtilebrand===""?0:parseInt(snapshot.val().Bathroomtilebrand)
      
//       const Cementrate=snapshot.val().Cementrate===""?0:parseInt(snapshot.val().Cementrate)
     
//       const EWCrate=snapshot.val().EWCrate==""?0:parseInt(snapshot.val().EWCrate)
     
//       const Floortilerate=snapshot.val().Floortilerate===""?0:parseInt(snapshot.val().Bathroomtilerate)
    
//       const Graniterate=snapshot.val().Graniterate===""?0:parseInt(snapshot.val().Graniterate)
     
//       const Handrailsrate=snapshot.val().Handrailsrate===""?0:parseInt(snapshot.val().Handrailsrate)
    
//       const Indianglasssetrate=snapshot.val().Indianglasssetrate===""?0:parseInt(snapshot.val().Indianglasssetrate)
     
//       const Kitchentilerate=snapshot.val().Kitchentilerate===""?0:parseInt(snapshot.val().Kitchentilerate)
     
//       const Piperate=snapshot.val().Piperate===""?0:parseInt(snapshot.val().Piperate)
      
//       const Steelrate=snapshot.val().Steelrate===""?0:parseInt(snapshot.val().Steelrate)
   
//       const Switchesrate=snapshot.val().Switchesrate===""?0:parseInt(snapshot.val().Switchesrate)
    
//       const Watertankrate=snapshot.val().Watertankrate===""?0:parseInt(snapshot.val().Watertankrate)
//       const Wirerate=snapshot.val().Wirerate===""?0:parseInt(snapshot.val().Wirerate)
//       const Paintrate=snapshot.val().Paintrate===""?0:parseInt(snapshot.val().Paintrate)

//       const totalamount=`${bathroomtilerate+Cementrate+EWCrate+Floortilerate+Kitchentilerate+Wirerate+Watertankrate+Switchesrate+Steelrate+Piperate+Graniterate+Handrailsrate+Indianglasssetrate}`
      
// console.log(totalamount)
//       setData(snapshot.val())
//       setAmount(totalamount);
       
//       });
  
//       return () => {
//         dataRef.off('value', onValueChange);
//       };
// },[])

const reference = database().ref('Construction').child('ProjectView').child('Invoice');

useEffect(() => {
      
  console.log(item)
 
    
     const onValueChange = reference.child(`${item.key}`).on('value', (snapshot) => {
       const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
       const formattedData = items.map(([key, value]) => ({ key, ...value }));
       console.log(formattedData)
       setData(formattedData.reverse());
    
     
      
         const amount3= formattedData.reduce((sum,item)=>{
          const masonamount=item.Amount===""?0:parseInt(item.Amount)
        return isNaN(masonamount)?sum:sum+masonamount;
         },0)

     
         setAmount(amount3)
     });
 
     return () => {
       reference.off('value', onValueChange);
     };
   }, []);
 

const zoomIn = () => {
  setZoomLevel(zoomLevel * 1.5);
};

const zoomOut = () => {
  setZoomLevel(zoomLevel * 0.5);
};
  
  async function convertAndSaveToPDF(htmlContent) {
    
    try {
     const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      
          )
        
         
            
       
      // Request permission for Android
      // const granted = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      //   {
      //     title: 'Storage Permission',
      //     message: 'App needs access to your storage to save PDF files.',
      //     buttonPositive: 'OK',
      //   }
      // );
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Convert HTML to PDF
        const options = {
          html: htmlContent,
          fileName: `${new Date()}`,
          directory: 'Documents',
        };
        console.log(options)
      
  
        const pdf = await RNHTMLtoPDF.convert(options);
  
        // Access the PDF file path
        const { filePath } = pdf;
        console.log('PDF File Path:', filePath);
  
        // You can now use the filePath to do further operations (e.g., display or share the PDF)
      } else {
        console.error('Storage permission denied');
      }
    } catch (error) {
      console.error('Error converting HTML to PDF:', error);
    }
  }
const [imgurl,setimgurl]=useState(false)
  const getImageUrlFromFirebase = async () => {
    const reference = storage().ref('sign.jpeg'); // Replace with the correct path in Firebase Storage
    try {
      const url = await reference.getDownloadURL();
      console.log('Image URL:', url);
      setimgurl(url)
      return url;
    } catch (error) {
      console.error('Error getting image URL:', error);
      return null;
    }
    
  };

  const logojpg=async()=>{
    const reference = storage().ref('Construction.jpg'); // Replace with the correct path in Firebase Storage
    try {
      const url = await reference.getDownloadURL();
      console.log('Image URL:', url);
      setlogourl(url)
      return url;
    } catch (error) {
      console.error('Error getting image URL:', error);
      return null;
    }
  }
  const imageUrl =  getImageUrlFromFirebase();
  useEffect(()=>{
    getImageUrlFromFirebase();
    logojpg();
  },[])
// const imagefilepath="file:///android/app/src/main/assets/sign.jpeg"
  const generatePDF = async () => {
   
    const invoiceHtml = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SRI VAARI BUILDERS AND CONSULTANTS</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }

        header,
        footer {
            background-color: #fff;
            padding: 0px;

            color: black;
        }

        header h1,
        footer p {
            margin: 0;


        }

        .headerinner {
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
            display: flex;
          }

        .content {
            margin-top: 20px;
           
           
        }

        h1 {
            font-size: 17px;
            font-weight: bold;
            margin-bottom: 5px;

        }

        h2 {
            font-size: 13px;
            font-weight: bold;
            /* text-decoration: underline; */
        }
        h4 {
            font-size: 13px;
            color: white;
            font-weight: bold;
           
          }

        .lineheight{
            line-height: 26pt
        }

        h3 {
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
            text-decoration: underline;

        }

        p {
            font-size: 12px;
        }



        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
            font-size: 12px;
        }

        th {
            background-color: #f2f2f2;
        }

        .page-break {
            page-break-before: always;
        }

        .line {
            border-bottom: 1px solid #ddd;
            margin-bottom: 20px;
        }

        footer {
            position: fixed;
            bottom: 0;
        }

        /* p{
            margin: 5px 0;
            font-size: 16px;
            margin-top: 0px;
      
        } */
        .contentrow {
            display: flex;
            flex-direction: row;
          
                }
         

        .headeralign {
           
       text-align: center;
        }
        .subtotal{
         
          border-width: 1px black;
          display: flex;
         justify-content:flex-end;
         align-items: center;
        
         margin-top:20pt;
        }
        .innersubtotal{
           background-color: green;
           display: flex;
           width: 50%;
           align-items: center;
         justify-content: space-between;
           padding-top: 1px;
           padding-bottom: 1px;
           padding-left: 10px;
           padding-right: 5px;
           flex-direction: row;
           color: white;
          }
        .subtotal1{
         
         border-width: 1px black;
         display: flex;
        justify-content:flex-end;
        align-items: center;
       
       
       }
       .innersubtotal1{
         
          display: flex;
          width: 50%;
          align-items: center;
        justify-content: space-between;
          padding-top: 1px;
          padding-bottom: 1px;
          padding-left: 10px;
          padding-right: 5px;
          flex-direction: row;
          color: Black;
         
           
       }
    </style>
</head>

<body>
    <header>
        <div class="headerinner">
            <div>
        <div >
            <h1>SRI VAARI BUILDERS AND CONSULTANTS</h1>
        </div>
       
       <div>
            <p>Email: Srivaariconsultants@gmail.com </p>
            <p>Phone:+91 9585282794/9884911344</p>
        </div>
    </div>
         
    <img src="${logourl}" alt="Local Image" width="80" height="60">
   
            </div>
    </header>

    <div class="line"></div>
    <div class="content">
        <div class="headeralign">
            <h2> Tax Invoice</h2>
        </div>
        <h2>Bill To:</h2>
        <div class="headerinner">
        <div >
        <h2>${InvoiceTo}</h2>
       
        <p>Contact No:${phoneno}</p>
    </div>
    <div>
        <h2>Invoice No:1</h2>
        <h2>${moment(new Date()).format('DD-MM-YYYY')}</h2>
    </div>
</div>
<table>
    <thead>
    
        <tr>
            <th>No</th>
            <th>Item Name</th>
           
            <th>Quantity</th>
            <th>Price/Unit</th>
            <th>Amount</th>
        </tr>
    </thead>
    <tbody>
    ${Data.map(data=>`
    <tr>
       
        <td>${data.SNo}</td>
      
        <td>${data.Description}</td>
        <td>${data.Quantity}</td>
        <td>${data.Rate}</td>
        <td>${data.Amount}</td>
        
    </tr>`
    )}
       
       
    </table>
</thead>
<div class="subtotal">
    <div class="innersubtotal">
<h2>Total</h2>
<div>
    <h2>${Amount}</h2>
</div>
</div>

</div>
<div class="subtotal1">
    <div class="innersubtotal1">
<h2>Received</h2>
<div>
    <h2>${item.Initialamount}</h2>
</div>
</div>

</div>
<div class="subtotal1">
    <div class="innersubtotal1">
<h2>Balance</h2>
<div>
    <h2>${Amount-item.Initialamount}</h2>
</div>
</div>

</div>

<div class="subtotal">
    <p>For, Sri vaari builders and Consultants</p>
  
    </div>
    <div class="subtotal">
    <img src="${imgurl}" alt="Local Image" width="100" height="50">
    </div>
    <div class="subtotal">
    <h2>Authorized signature</h2>
    </div>
  

</body>

</html>
    `;
 

    const options = {
      html: invoiceHtml,
      fileName: `${item.Clientname} invoice`,
      directory: 'Documents',
     
    };
   // convertAndSaveToPDF(invoiceHtml);
  
    const pdf = await RNHTMLtoPDF.convert(options);
    pdfRef.current = pdf.filePath;

    // Open the generated PDF using the default viewer
  //  Linking.openURL(`file://${pdf.filePath}`);
    console.log(path)
   
    const file=`file://${pdf.filePath}`
    const file1=`${pdf.filePath}.pdf`
    setpath(file);
    handleRefreshPdf()
    console.log(file)
   
     
    
  };

  const sharepdf=()=>{
    Share.open({
        url:path,
        type:'application/pdf'
    })
  }
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);
   
    setTimeout(() => {
      handleRefreshPdf()
      setRefreshing(false);
    }, 2000);
   
  };

  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefreshPdf = () => {
    // Increment the key to force a re-render of the PDF viewer
    setRefreshKey((prevKey) => prevKey + 1);
  };
  const handleInputChange= (text) => {
    const numericInput = text.replace(/[^0-9]/g, '');
     onChangephoneno(numericInput);
   };
  return (
   
    <View style={{ flex:1,backgroundColor:'white' }}>
         <ScrollView
         refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#007AFF']} // Color of the refresh indicator on Android
          tintColor={'#007AFF'} // Color of the refresh indicator on iOS
        />
         }
         >
<View style={{padding: 20}}>
     
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
        onChangeText={handleInputChange}
        value={phoneno}
        
        
        />

                  <View style={{marginTop:20}}>
                    <TouchableOpacity onPress={generatePDF} style={{ backgroundColor: '#ff9900', alignItems: 'center', justifyContent: 'center', width: 150,
                                 alignSelf: 'center',borderRadius:10}}>
                                <Text style={{ fontSize: 14, padding: 10, color: 'white' }}>Generate Pdf</Text>
                                  </TouchableOpacity>
                                </View>
   
      <View style={{
        flex:1,
        height:400,
         justifyContent: 'flex-start',
         alignItems: 'center',
         marginTop: 25,
      }}>
    <Pdf
     style={{flex:1,borderWidth:1,width:responsiveWidth(85)}}
     ref={pdfRef}
     key={refreshKey}
        source={{uri:path,cache:true}}
        onLoadComplete={(numberOfPages,filePath)=>{
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        scale={zoomLevel}
        onPageChanged={(page,numberOfPages)=>{
          console.log(`Current page: ${page}`);
        }}
        onError={(error)=>{
          console.log(error);
        }}
/>
<View style={styles.buttonContainer}>
        <TouchableOpacity onPress={zoomIn} style={styles.button}>
          <Text>Zoom In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={zoomOut} style={styles.button}>
          <Text>Zoom Out</Text>
        </TouchableOpacity>
      </View>
</View>
                 <View style={{marginTop:10,marginBottom:20}}>
                    <TouchableOpacity onPress={sharepdf} style={{ backgroundColor: '#ff9900', alignItems: 'center', justifyContent: 'center', width: 150,
                                 alignSelf: 'center',borderRadius:10}}>
                                <Text style={{ fontSize: 14, padding: 10, color: 'white' }}>Share Pdf</Text>
                                  </TouchableOpacity>
                                </View>
                                </View>
</ScrollView>

    </View>
   
  );
};
export default Invoiceshare;
const styles=StyleSheet.create({
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
      pdfbutton:{
        paddingLeft:25,paddingRight:25,paddingTop:10,paddingBottom:10,marginTop:20,borderRadius:10,backgroundColor:"#ff9900",alignItems:'center',justifyContent:'center'
      },
      Text:{
        fontSize:14,
        color:'black',
        marginTop:10
      },
      TextInput: {
        borderWidth: 1, padding: 8, flex: 1, borderColor: '#2f4f4f', borderRadius: 10,color:'black'
    },
})