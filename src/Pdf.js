import React, { useRef,useState ,useEffect} from 'react';
import { View, Button, Text, Linking, StyleSheet,TouchableOpacity ,RefreshControl} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Invoice from './Invoice'; // Import the Invoice component
import Share from 'react-native-share';
import RenderHtml from 'react-native-render-html';
import { PermissionsAndroid } from 'react-native';
import Pdf from 'react-native-pdf';
import database from '@react-native-firebase/database';
import { ScrollView } from 'react-native-gesture-handler';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import moment from 'moment';


const Pdfs = ({route}) => {
    const{item}=route.params;
  const pdfRef = useRef();
const[path,setpath]=useState(false);
const[Data,setData]=useState([]);
const[Amount,setAmount]=useState(0);
const[Data1,setData1]=useState([]);
const reference = database().ref('Construction').child('ProjectView').child('Floors');
const[feet,setfeet]=useState("");
const[tAmount,settAmount]=useState("");
const[AdditionalWork,setAdditionalWork]=useState([])


const ref = database().ref('Construction').child('ProjectView').child('AdditionalWork').child(`${item.key}`);
useEffect(() => {
  
    
    const onValueChange = ref.on('value', (snapshot) => {
        const items = snapshot.val() ? snapshot.val() : {};
      
      //  setManpower(snapshot.val())
    // console.log(snapshot.val())

      console.log('material',items)
      setAdditionalWork(items)
    
      const OverheadTank=items.OverheadTankQuantity===""?0:parseInt(snapshot.val().OverheadTankQuantity)
     })
     return () => {
        ref.off('value', onValueChange);
      };
    },[]);

useEffect(() => {
      
    console.log(item)
   
      
       const onValueChange = reference.child(`${item.key}`).on('value', (snapshot) => {
         const items = snapshot.val() ? Object.entries(snapshot.val()) : [];
         const formattedData = items.map(([key, value]) => ({ key, ...value }));
         console.log(formattedData)
         setData1(formattedData.reverse());
      
       
        
           const amount3= formattedData.reduce((sum,item)=>{
            const masonamount=item.Amount===""?0:parseInt(item.Amount)
          return isNaN(masonamount)?sum:sum+masonamount;
           },0)

       
           settAmount(amount3)
       });
   
       return () => {
         reference.off('value', onValueChange);
       };
     }, []);
   
const [zoomLevel, setZoomLevel] = useState(1);
useEffect(()=>{
        
    const dataRef = database().ref('Construction').child('ProjectView').child('Quote').child(item.key);
    console.log(dataRef)
    const onValueChange = dataRef?.on('value', (snapshot) => {
      
      //  setManpower(snapshot.val())
    // console.log(snapshot.val())

      console.log('material',snapshot.val())
      const data=snapshot.val()
      if(data){
      const bathroomtilerate=snapshot.val().Bathroomtilerate===""?0:parseInt(snapshot.val().Bathroomtilerate)
      
      const Cementrate=snapshot.val().Cementrate===""?0:parseInt(snapshot.val().Cementrate)
     
      const EWCrate=snapshot.val().EWCrate==""?0:parseInt(snapshot.val().EWCrate)
     
      const Floortilerate=snapshot.val().Floortilerate===""?0:parseInt(snapshot.val().Bathroomtilerate)
    
      const Graniterate=snapshot.val().Graniterate===""?0:parseInt(snapshot.val().Graniterate)
     
      const Handrailsrate=snapshot.val().Handrailsrate===""?0:parseInt(snapshot.val().Handrailsrate)
    
      const Indianglasssetrate=snapshot.val().Indianglasssetrate===""?0:parseInt(snapshot.val().Indianglasssetrate)
     
      const Kitchentilerate=snapshot.val().Kitchentilerate===""?0:parseInt(snapshot.val().Kitchentilerate)
     
      const Piperate=snapshot.val().Piperate===""?0:parseInt(snapshot.val().Piperate)
      
      const Steelrate=snapshot.val().Steelrate===""?0:parseInt(snapshot.val().Steelrate)
   
      const Switchesrate=snapshot.val().Switchesrate===""?0:parseInt(snapshot.val().Switchesrate)
    
    //   const Watertankrate=snapshot.val().Watertankrate===""?0:parseInt(snapshot.val().Watertankrate)
      const Wirerate=snapshot.val().Wirerate===""?0:parseInt(snapshot.val().Wirerate)
      const Paintrate=snapshot.val().Paintrate===""?0:parseInt(snapshot.val().Paintrate)

      const totalamount=`${bathroomtilerate+Cementrate+EWCrate+Floortilerate+Kitchentilerate+Wirerate+Switchesrate+Steelrate+Piperate+Graniterate+Handrailsrate+Indianglasssetrate+Paintrate}`
      setData(snapshot.val())
      setAmount(totalamount);
      console.log(totalamount)
    }

     
       
      });
  
      return () => {
        dataRef.off('value', onValueChange);
      };
},[])

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
    @page{
      margin-top:70px;
      margin-bottom:70px;
    }
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }

        header,
        footer {
            background-color: #2f4f4f;
            padding: 20px;
        
         color: white;
        }

       

        .headerinner {
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
            display: flex;
          }

        .content {
            margin-top: 50px;
        }

        h1 {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 5px;

        }

        h2 {
            font-size: 13px;
            font-weight: bold;
            text-decoration: underline;
        }
        h4 {
            font-size: 13px;
            font-weight: bold;
            margin-bottom: -5px;
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
        .roompoints{
            display: flex;
            flex-direction: row;
          
           height: 20pt;

        }        

        .contentrowleft {

            width: 30%;

        }

        .contentright {
            width: 70%;
            ;
        }

        .headeralign {
            text-align: center;

        }
        @media print{
          .header{
            display:table-header-group;
          }
        }
    </style>
</head>

<body>
    <header>
        <div class="headeralign">
            <h1>SRI VAARI BUILDERS AND CONSULTANTS</h1>
        </div>
        <div class="headerinner">
            <p>Email: Srivaariconsultants@gmail.com </p>
            <p>Phone:+91 9585282794/9884911344</p>
        </div>
    </header>

    <div class="line"></div>
    <main>
    <div class="content">
        <div class="headeralign">
            <h2> QUOTE FOR PROPOSED RESIDENCE FOR Mr.MAHALAKSHMI AT DINDIGUL</h2>
        </div>
        <div class="headerinner">
            <h3>Detailed Specification</h3>
            <h3>Dated:${moment(new Date()).format('DD-MM-YYYY')}</h3>
        </div>
        <h2>CIVIL WORK</h2>
        <div class="contentrow">
            <div class="contentrowleft">
                <p>Foundation:</p>
            </div>
            <div class="contentright">
                <p>6' deep (subject to structural drawings)</p>
            </div>
        </div>
        <div class="contentrow">
            <div class="contentrowleft">
                <p>Floor level:</p>
            </div>
            <div class="contentright">
                <p>3'-0" from Existing Ground Lvl</p>
            </div>
        </div>
        <div class="contentrow">
            <div class="contentrowleft">
                <p>Total ceiling height:</p>
            </div>
            <div class="contentright">
                <p>10'-0" from finished floor level in all rooms</p>
            </div>
        </div>

        <div class="contentrow">
            <div class="contentrowleft">
                <p>Brickwork:</p>
            </div>
            <div class="contentright">
                <p>4 1/2" brick work for partition walls and 9" brick work for main Walls</p>
            </div>
        </div>
        <div class="contentrow">
            <div class="contentrowleft">
                <p>Lintel:</p>
            </div>
            <div class="contentright">
                <p>Discontinuous R.C.C lintel above doors and windows</p>
            </div>
        </div>
        <div class="contentrow">
            <div class="contentrowleft">
                <p>Plinth band:</p>
            </div>
            <div class="contentright">
                <p> 3" thick R.C.C band with water proofing chemical</p>
            </div>
            </div>
            <div class="contentrow">
                <div class="contentrowleft">
                    <p>Concrete:</p>
                </div>
                <div class="contentright">
                    <p> Hand/power driven machine mixed concrete prepared at site</p>
                </div>
            </div>
            <div class="contentrow">
                <div class="contentrowleft">
                   <p>Joinery:</p>
                   </div>
                   <div class="contentright">
               <p> All doors to be fixed along with brickwork</p>
           </div>
           </div>
           <div class="contentrow">
            <div class="contentrowleft">
               <p>Parapet wall:</p>
               </div>
               <div class="contentright">
           <p> 4 1/2" brick work 2'-9" height</p>
       </div>
       </div>
       <div class="contentrow">
        <div class="contentrowleft">
           <p>Shelves:</p>
           </div>
           <div class="contentright">
       <p> Using 3" thick brick work in all workers rooms as per drawings</p>
   </div>
   </div>
   <div class="contentrow">
    <div class="contentrowleft">
       <p>Midshelves:</p>
       </div>
       <div class="contentright">
   <p>Using 1" thick one side polished Cuddapah slab</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Plastering:</p>
       </div>
       <div class="contentright">
   <p>Sponge finish for all areas (interior, exterior and ceiling)Ratioà 1:4 for ceiling, 1:5 for 4” brickwork, 1:6 for 9”         
      Brickwork up to floor level, 1:6 for all other 9” brickwork</p>
</div>
</div>
<h2>DOORS AND WINDOWS</h2>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Main door:</p>
       </div>
       <div class="contentright">
   <p>6” x 4” African teak wood section for frame and 1 ¼” x 4”  
African teak wood section for shutter cost not more than Rs.15000.00 per door </p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Other doors:</p>
       </div>
       <div class="contentright">
   <p>4” x 3” v EMBU wood section for frame and 30 mm thick     
Flush door of cost not more than Rs. 3,000 per shutter </p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Lock for Main door:</p>
       </div>
       <div class="contentright">
   <p>Godrej lock in the range of Rs. 1000/- to Rs. 1,200/- on one side only</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Window grills:</p>
       </div>
       <div class="contentright">
   <p>M.S. grill weighing not more than 1.8 kg per sft </p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>All windows:</p>
       </div>
       <div class="contentright">
   <p>Side hung casement windows made of quality KUMIL wood/ Indian brand UPVC sliding windows </p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Toilet windows:</p>
       </div>
       <div class="contentright">
   <p>Top hung casement windows made of second quality African teak 
Wood/ Indian brand UPVC ventilators </p>
</div>
</div>
<h2>ELECTRICAL WORK </h2>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Main board and MCB:</p>
       </div>
       <div class="contentright">
   <p>Orbit/equivalent make with manual changeover switches  </p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Distribution board:</p>
       </div>
       <div class="contentright">
   <p>Orbit/equivalent make in each floor</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Switches, sockets and regulators:</p>
       </div>
       <div class="contentright">
   <p>Lisha make modular switches [Rs. 25/-] </p>
</div>
</div>
<h2> POWER POINTS IN ROOMS </h2>
<h4> LIVING ROOM </h4>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Fan point:</p>
       </div>
       <div class="contentright">
   <p>2 nos.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Light point:</p>
       </div>
       <div class="contentright">
   <p>2 nos.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Telephone point:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p >TV point:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>5 amp socket:</p>
       </div>
       <div class="contentright">
   <p>4 nos.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>15 amp socket:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Regulator:</p>
       </div>
       <div class="contentright">
   <p>2 nos.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Fan point:</p>
       </div>
       <div class="contentright">
   <p>2 nos.</p>
</div>
</div>
<h4>DINING ROOM</h4>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Fan point:</p>
       </div>
       <div class="contentright">
   <p>2 nos.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Light point:</p>
       </div>
       <div class="contentright">
   <p>2 nos.</p>
</div>
</div>

<div class="roompoints">
    <div class="contentrowleft">
       <p>5 amp socket:</p>
       </div>
       <div class="contentright">
   <p>4 nos.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>15 amp socket:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Regulator:</p>
       </div>
       <div class="contentright">
   <p>2 nos.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Fan point:</p>
       </div>
       <div class="contentright">
   <p>2 nos.</p>
</div>
</div>
<h4> BED ROOMS </h4>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Fan point:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Light point:</p>
       </div>
       <div class="contentright">
   <p>2 nos.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Telephone point:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p >TV point:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>5 amp socket:</p>
       </div>
       <div class="contentright">
   <p>2 nos.</p>
</div>
</div>

<div class="roompoints">
    <div class="contentrowleft">
       <p>Regulator:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>A/C point:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<h4> TOILETS </h4>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Exhaust fan point:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Light point:</p>
       </div>
       <div class="contentright">
   <p>2 nos.</p>
</div>
</div>


<div class="roompoints">
    <div class="contentrowleft">
       <p>5 amp socket:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>15 amp socket:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<h4> KITCHEN </h4>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Exhaust fan point:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Light points:</p>
       </div>
       <div class="contentright">
   <p>2 nos.</p>
</div>
</div>


<div class="roompoints">
    <div class="contentrowleft">
       <p>5 amp socket:</p>
       </div>
       <div class="contentright">
   <p>4 nos.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>15 amp socket:</p>
       </div>
       <div class="contentright">
   <p>2 nos.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Fan point:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<h4> OTHER AREAS </h4>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Setback area light points:</p>
       </div>
       <div class="contentright">
   <p>1 light in each side.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Compound wall light point:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>


<div class="roompoints">
    <div class="contentrowleft">
       <p>Verandah light point:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<div class="roompoints">
    <div class="contentrowleft">
       <p>Balcony light point:</p>
       </div>
       <div class="contentright">
   <p>1 no.</p>
</div>
</div>
<h2>TILES</h2>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Floor tiiles:</p>
       </div>
       <div class="contentright">
   <p> 600 mm x 600 mm fully vitrified tiles of cost Rs. 50 per sft </p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Skirting :</p>
       </div>
       <div class="contentright">
   <p> Using same vitrified for a height of 3” </p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Bathroom & toilets:</p>
       </div>
       <div class="contentright">
   <p>300 mm x 300 mm ceramic tiles for a height of 7’-0” cost of Rs.35 per sft </p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Staircase:</p>
       </div>
       <div class="contentright">
   <p> 300 mm x 300 mm ceramic tiles Rs 30/Sft</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Staircase handrail:</p>
       </div>
       <div class="contentright">
   <p> ½” x ½” M.S. baluster with 2” dia.  MS Handrail</p>
</div>
</div>

<h2>PLUMBING WORK</h2>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Bathroom fittings:</p>
       </div>
       <div class="contentright">
   <p>Using ISI make CP fittings (Rs. 750 range)</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Wash basin:</p>
       </div>
       <div class="contentright">
   <p>Parry ware wall hung without pedestal (Rs.1200 range)</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Water closets:</p>
       </div>
       <div class="contentright">
   <p>Parry ware EWC closet (Rs. 3500 range)</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Pipes for hot water:</p>
       </div>
       <div class="contentright">
   <p>ISI Branded CPVC pipes</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Floor trap:</p>
       </div>
       <div class="contentright">
   <p>4” depth PVC floor trap with cp grating</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Inspection chambers:</p>
       </div>
       <div class="contentright">
   <p>Wherever required shall be provided with GI cover</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Water proofing for toilets:</p>
       </div>
       <div class="contentright">
   <p>Pidilite URP / equivalent in cement mortar for fixing tiles</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Rain water harvesting:</p>
       </div>
       <div class="contentright">
   <p>max two soak pits </p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Rain water drain pipe:</p>
       </div>
       <div class="contentright">
   <p>4” dia. PVC pipe</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>All plumbing accessories:</p>
       </div>
       <div class="contentright">
   <p> Star / Prince make PVC accessories (reducer, coupling). </p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Sewage removal pipe:</p>
       </div>
       <div class="contentright">
   <p>4” dia.  4kg PVC pipe </p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Sullage removal pipe:</p>
       </div>
       <div class="contentright">
   <p>2 ½” dia. 4 kg PVC pipe </p>
</div>
</div>
<h2>PAINTING</h2>
<div class="contentrow">
    <div class="contentrowleft">
       <p>All steel items:</p>
       </div>
       <div class="contentright">
   <p>Two coats of enamel over Zinc chromate primer</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>All inner walls:</p>
       </div>
       <div class="contentright">
   <p>One coat of wall primer and putty</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>All outer walls:</p>
       </div>
       <div class="contentright">
   <p>One coat wall primer</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>All wood work:</p>
       </div>
       <div class="contentright">
   <p>Main door – Hand / machine polish  
Other doors- Two coats Enamel over one coat of primer </p>
</div>
</div>
<h2>OTHER WORKS THAT ARE INCLUDED IN CONTRACTOR’S SCOPE OF WORK</h2>

<div class="contentrow">
    <div class="contentrowleft">
       <p>Anti-termite treatment:</p>
       </div>
       <div class="contentright">
   <p>During foundation, ground flooring, filling of earth in setback and joinery </p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Terrace finish:</p>
       </div>
       <div class="contentright">
   <p>Chips concrete </p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Sunshade:</p>
       </div>
       <div class="contentright">
   <p>2” thick R.C.C. sunshade along with discontinuous lintel </p>
</div>
</div>
<h2> FOLLOWING ARE THE ITEMS NOT INCLUDED IN CONTRACTOR’S SCOPE OF WORK</h2>

<p>  Site preparation work such as demolition of existing structures, construction of material storage room, water supply, cutting of trees, filling of well and items such as wood work for shelves and lofts, grill gate for entrance doors to house, bore well with motor, EB connection, Electricity for Full tenure of work sewage & sullage connection, construction / erection of water tank, septic tank, setback filling, sump, landscaping, sky light roofing and mezzanine floor are not included in the contractor’s scope of work. Execution of such works shall attract due compensation from the client. </p>
<h4>MATERIALS TO BE USED </h4>
<table>
<thead>
    <tr>
        <th>No</th>
        <th>MATERIALS</th>
        <th>BRAND</th>
        <th>RATE</th>
      
    </tr>
</thead>
<tbody>
    <tr>
        <td>1</td>
        <td>Switches</td>
        <td>${Data.Switchesbrand}</td>
        <td>${Data.Switchesrate}</td>
       
        
    </tr>
    <tr>
        <td>2</td>
        <td>Paint</td>
        <td>${Data.Paintbrand}</td>
        <td>${Data.Paintrate}</td>
       
    </tr>
    <tr>
        <td>3</td>
        <td>Cement</td>
        <td>${Data.Cementbrand}</td>
        <td>${Data.Cementrate}</td>
       
    </tr>
    <tr>
        <td>4</td>
        <td>Steel</td>
        <td>${Data.Steelbrand}</td>
        <td>${Data.Steelrate}</td>
       
    </tr>
    <tr>
        <td>5</td>
        <td>EWC</td>
        <td>${Data.EWCbrand}</td>
        <td>${Data.EWCrate}</td>
       
    </tr>
    <tr>
        <td>6</td>
        <td>Indian Glass Set</td>
        <td>${Data.Indianglasssetbrand}</td>
        <td>${Data.Indianglasssetrate}</td>
       
    </tr>
    <tr>
        <td>7</td>
        <td>Pipe Fitting</td>
        <td>${Data.Pipebrand}</td>
        <td>${Data.Piperate}</td>
       
    </tr>
    <tr>
        <td>8</td>
        <td>Wire</td>
        <td>${Data.Wirebrand}</td>
        <td>${Data.Wirerate}</td>
       
    </tr>
    <tr>
        <td>9</td>
        <td>Floor Tile</td>
        <td>${Data.Floortilebrand}</td>
        <td>${Data.Floortilerate}</td>
       
    </tr>
    <tr>
        <td>10</td>
        <td>Kitchen Tile(wall)</td>
        <td>${Data.Kitchentilebrand}</td>
        <td>${Data.Kitchentilerate}</td>
       
    </tr>
    <tr>
        <td>11</td>
        <td>Bathroom Tile</td>
        <td>${Data.Bathroomtilebrand}</td>
        <td>${Data.Bathroomtilerate}</td>
       
    </tr>
    <tr>
        <td>12</td>
        <td>Granite</td>
        <td>${Data.Granitebrand}</td>
        <td${Data.Graniterate}></td>
       
    </tr>
    <tr>
        <td>13</td>
        <td>Hand Rails</td>
        <td>${Data.Handrailsbrand}</td>
        <td>${Data.Handrailsrate}</td>
       
    </tr>
    
  
   


      <tr>
    <td></td>
    <td>Total </td>
    <td></td>
   
    <td>${Amount}</td>
</tr>
</table>
</thead>

<h3> BASIC COST OF MATERIALS TO BE ASSUMED FOR THE PREPARATION OF QUOTE </h3>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Taps for wash basins / sinks / bathing:</p>
       </div>
       <div class="contentright">
   <p>Rs. 750/- </p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Accessories for main door:</p>
       </div>
       <div class="contentright">
   <p>Rs. 2,000/- (lock, tower bolt, handles, aldrop, hinges)</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Accessories for other doors:</p>
       </div>
       <div class="contentright">
   <p>Rs. 1,500/- (lock, tower bolt, handles, aldrop, hinges)</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Accessories for toilet doors:</p>
       </div>
       <div class="contentright">
   <p>Rs. 1,500/- (lock, tower bolt, handles, aldrop, hinges)</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Accessories for all windows:</p>
       </div>
       <div class="contentright">
   <p>Rs. 300/- (lock, bolt, handles, friction stay, hinges)</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Switches :</p>
       </div>
       <div class="contentright">
   <p>Rs. 25/-</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Floor tiles :</p>
       </div>
       <div class="contentright">
   <p>Rs. 50/- per sft</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Wall tiles  :</p>
       </div>
       <div class="contentright">
   <p>Rs. 35/- per sft</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Granite:</p>
       </div>
       <div class="contentright">
   <p>Rs. 120/- per sft</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Exterior tiles in balcony, entrance& stair :</p>
       </div>
       <div class="contentright">
   <p>Rs. 30/- per sft</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Indian water closet:</p>
       </div>
       <div class="contentright">
   <p>Rs. 1,500/- per piece including ‘S’ trap</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Indian water closet:</p>
       </div>
       <div class="contentright">
   <p>Rs. 1,500/- per piece including ‘S’ trap</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>European water closet:</p>
       </div>
       <div class="contentright">
   <p>Rs. 3500/set (S/P trap, flush tank, seat cover)</p>
</div>
</div>
<div class="contentrow">
    <div class="contentrowleft">
       <p>Wash Basin :</p>
       </div>
       <div class="contentright">
   <p>Rs. 1,200/- including basin, SS bottle trap, full / half thread coupling, clamps, expansion fasteners, hot water hose and all other related accessories but excluding tap </p>
</div>
</div>
<h3>GENERAL TERMS </h3>
<ul>
   <li><p>For tiles / closets / fittings / etc or any other items mentioned in this quote, in case the client opted for different quality brands the difference in cost shall be paid. </p></li> 
  <li> <p>Client and contractor shall maintain separate book of accounts to monitor the payment made and received respectively. </p></li> 
    <li><p>In the event of termination of contract, the bills shall be settled to the contractor purely on the basis of unit rate method (item wise). </p></li>
<li><p>For all construction purposes metro water shall be used and it is the client’s responsibility to provide free potable water and power (electricity) for construction purpose.   </p></li>
</ul>
<div class="page-break"></div>
<h3>AREA STATEMENT AND COST OF CONSTRUCTION FOR ALL SUB-STRUCTURE AND SUPER STRUCTURE </h3>
            <table>
                <thead>
                    <tr>
                      
                        <th>DESCRIPTION</th>
                        <th>UNIT</th>
                        <th>QUANTITY</th>
                        <th>RATE(RS)</th>
                        <th>AMOUNT(RS)</th>
                    </tr>
                </thead>
                <tbody>
                ${Data1.map(data=>`
                    <tr>
                       
                        <td>${data.FloorName}</td>
                        <td>Sft</td>
                        <td>${data.Quantity}</td>
                        <td>${data.Rate}</td>
                        <td>${data.Amount}</td>
                        
                    </tr>`
                    )}
                   
                  
                    <td>Total A</td>
                    <td>Sft</td>
                    <td></td>
                    <td></td>
                    <td>${tAmount}</td>
                    <!-- Add more items as needed -->
                </tbody>
            </table>

            <h3>AREA STATEMENT AND COST OF CONSTRUCTION FOR ALL ADDITIONAL WORKS </h3>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>DESCRIPTION</th>
                        <th>UNIT</th>
                        <th>QUANTITY</th>
                        <th>RATE(RS)</th>
                        <th>AMOUNT(RS)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Underground sump   ( Brick wall ) </td>
                        <td>Litres </td>
                        <td>${AdditionalWork.UnderGroundSumpQuantity}/lit</td>
                        <td>${AdditionalWork.UnderGroundSumpRateP}</td>
                        <td>${AdditionalWork.UnderGroundSumpAmount}</td>
                        
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Overhead tank sintex </td>
                        <td>Litres </td>
                        <td>${AdditionalWork.OverHeadTankQuantity}/lit</td>
                        <td>${AdditionalWork.OverHeadTankRate}</td>
                        <td>${AdditionalWork.OverHeadTankAmount}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Septic tank  </td>
                        <td>Litres </td>
                        <td>${AdditionalWork.SepticTankQuantity}/lit</td>
                        <td>${AdditionalWork.SepticTankRate}</td>
                        <td>${AdditionalWork.SepticTankAmount}</td>
                    </tr>
                   
                    <tr>
                    <td></td>
                    <td>Total B</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>${AdditionalWork.SepticTankAmount+AdditionalWork.OverHeadTankAmount+AdditionalWork.UnderGroundSumpAmount}</td>
                    </tr>
                    <tr>
                    <td></td>
                    <td>GRAND TOTAL(A+B)</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>${AdditionalWork.SepticTankAmount+AdditionalWork.OverHeadTankAmount+AdditionalWork.UnderGroundSumpAmount+tAmount}</td>
                    </tr>
                   
                </tbody>
            </table>
            
            <h2>PAYMENT SCHEDULE</h2>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>DESCRIPTION</th>
                        <th>PERCENTAGE(%)</th>
                        <th>AMOUNT(RS.)</th>
                      
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Advance </td>
                        <td>20% </td>
                        <td></td>
                       
                        
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Upon completion of foundation, and plinth beam </td>
                        <td>10%</td>
                        <td></td>
                       
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Upon completion of lintel slab  </td>
                        <td>20%</td>
                        <td></td>
                       
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Upon completion of internal plastering in all floors </td>
                        <td>20%</td>
                        <td></td>
                       
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Upon completion of external plastering </td>
                        <td>10%</td>
                        <td></td>
                       
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Upon completion of tile fixing in all areas </td>
                        <td>10%</td>
                        <td></td>
                       
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>Upon completion of fixing of all electrical and plumbing fixtures </td>
                        <td>8%</td>
                        <td></td>
                       
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>Upon handing over of site </td>
                        <td>2%</td>
                        <td></td>
                       
                    </tr>
                    <tr>
                        <td></td>
                        <td>Total</td>
                        <td>100%</td>
                        <td></td>
                       
                    </tr>
                    
                   
                   
                </tbody>
            </table>
          
         


       </main>
      
</body>

</html>
    `;
   

    const options = {
      html: invoiceHtml,
      fileName: `${item.Clientname} Quote`,
      directory: 'Documents',
     
    };
   // convertAndSaveToPDF(invoiceHtml);
  
    const pdf = await RNHTMLtoPDF.convert(options);
    pdfRef.current = pdf.filePath;

   
    console.log(path)
   
    const file=`file://${pdf.filePath}`
    const file1=`${pdf.filePath}.pdf`
    setpath(file);
    console.log(file)
    handleRefreshPdf()
  
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
  return (
    <View style={{ flex:1,backgroundColor:'white' }}>
     <ScrollView
       refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={handleRefresh}
        progressBackgroundColor={'white'}
        colors={['#007AFF','black']} // Color of the refresh indicator on Android
        tintColor={'black'} // Color of the refresh indicator on iOS
      />
       }
     >
        <View style={{padding:20}}>

      <View style={{}}>
                    <TouchableOpacity onPress={generatePDF} style={{ backgroundColor: '#ff9900', alignItems: 'center', justifyContent: 'center', width: 150,
                                 alignSelf: 'center',borderRadius:10}}>
                                <Text style={{ fontSize: 14, padding: 10, color: 'white' }}>Generate Pdf</Text>
                                  </TouchableOpacity>
                                </View>
   
      <View style={{
        flex:1,
         justifyContent: 'flex-start',
         alignItems: 'center',
         marginTop: 25,
         height:500
      }}>
    <Pdf
     style={{flex:1,borderWidth:1,width:responsiveWidth(85),}}
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
export default Pdfs;
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
})