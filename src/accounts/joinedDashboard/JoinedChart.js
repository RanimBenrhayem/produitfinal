import React, {useCallback, useEffect, useRef, useState} from "react";
import {downloadFiles, getUserJoinedFiles} from "../../services/axios";
import Swal from "sweetalert2";
import axios from "axios";
import ReactToPrint from "react-to-print";
import {Bar, Bubble, Pie, PolarArea} from "react-chartjs-2";
import JoinedChartAlert from "../alerts/JoinedChartAlert";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);





const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Your  Chart',
        },
    },
};

const JoinedChart = ()=> {

    const [files, setFiles] = useState([])
    const [fileToDraw , setFileToDraw] = useState("")
    const [headers1, setHeaders1] = useState([]);
    const [headers2, setHeaders2] = useState([]);
    const [attribut1, setAttribut1] = useState("");
    const [attribut2, setAttribut2] = useState("");
    const [graph,setGraph] = useState({}) ;
    const [show,setShow] = useState(false);
    const[alertLabels,setAlertLabels] = useState([])
    const [alertData,setAlertData] = useState([])
    const [alertAttributes,setAlertAttributes] = useState([])
    const ref = useRef(null);
    const [saved,setSaved] = useState("")
    const [chart, setChart] = React.useState();




    useEffect(()=>{
        async function fetchUserJoinedFiles(){
            const response = await getUserJoinedFiles()
            if (response.success === true) {

                setFiles(response.data);
                console.log(response.data);
            } else {
                Swal.fire({
                    icon: "error",
                    title: response.data,
                    showCancelButton: false,

                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        }
        fetchUserJoinedFiles()
    } , [])

    async function handleFileOptions(e) {
        console.log(e.target.value);
        setFileToDraw(e.target.value);
        if (e.target.value !== "") {
            const response = await axios({
                method : "get" ,
                url : `/uploads/files/joined/getbyid/${e.target.value}`
            });

                const keys = Object.keys(response.data[0])
                const filteredKeys = keys.filter((element) => element && element.length>0)
               setHeaders1(filteredKeys)
                setHeaders2(filteredKeys)

        }
    }
    const handleProcess = async ()=> {
        try{
            if (fileToDraw.length > 0) {


                const response =await axios({
                    method :"post",
                    url : `http://localhost:8080/chart/joined/draw/${fileToDraw}`,
                    data : {xaxis:attribut1 , yaxis : attribut2}
                })
                const {xaxis,yaxis,labels,returnedData} = response.data
                
                const values = returnedData.map((element)=>parseFloat(element))
                
                setAlertLabels(labels)
                setAlertData(returnedData)
                setAlertAttributes([xaxis,yaxis])
                setGraph({
                    labels,
                    datasets: [
                        {
                            label: `${yaxis} = fn(${xaxis})`,
                            data: values,
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(60, 179, 113)',
                                'rgb(255, 205, 86)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 255, 0)',



                            ],
                            hoverOffset: 8

                        },



                    ],
                })
            }

            setShow(true)

        }catch (e) {
            console.log(e)
        }
    }
    const saveInfoDashboard = async ()=> {
        try {


            if (fileToDraw.length > 0) {
                const response =await axios({
                    method :"post",
                    url : `http://localhost:8080/chart/save/database`,
                    data : {attribut1 ,  attribut2,fileId : `${fileToDraw}` , typeOfDashboard:chart , isJoined:true}
                })


                setSaved(response.data.result._id)
                 const Toast = Swal.mixin({
                  toast: true,
                  position: "bottom-right",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                });
          
                Toast.fire({
                  icon: "success",
                  title: response.data.msg,
                });
            }







        } catch (error) {
            console.log(error)
        }
    }
    const downloadImage = useCallback (()=>{
        const link = document.createElement('a');
        link.download = 'chart.png'
        link.href = ref.current.toBase64Image()
        link.click();
    },[])

   

    function Chart(e) {
      if (e.value === "bar") {
        return (
          <div style={{height : '450px' , width : '750px',marginLeft : '20px',marginTop:'-100px'}}>
            
            {show && <Bar   ref={ref} options={options} data={graph} />}
          </div>
        );
      } else if (e.value === "pie") {
        return (
          <div style={{height : '450px' , width : '450px',marginLeft : '20px',marginTop:'-100px'}}>
            {show && <Pie ref={ref} options={options} data={graph}  />}
          </div>
        );
      } else if (e.value === "bubble") {
        return (
          <div style={{height : '450px' , width : '750px',marginLeft : '20px',marginTop:'-100px'}}>
            {show && (
              <Bubble ref={ref} options={options} data={graph}  />
            )}
            
          </div>
        );
      } else if (e.value === "polararea") {
          return (
            <div style={{height : '450px' , width : '450px',marginLeft : '20px',marginTop:'-100px'}}>
              {show && (
                <PolarArea ref={ref} options={options} data={graph}  />
              )}
      </div>
          )
      
    }}

    const componentRef = React.useRef()
    return (
        <React.Fragment>
         
    
      <div
       style={{ marginTop: -200, marginLeft: -300 }}
      
      >
        <select value={fileToDraw} onChange={handleFileOptions} className="select1">
          <option value={""}>__please choose a file__</option>
          {files.map((element) => {
            return (
              <option value={element._id}>
                {element.metadata.originalFileName}
              </option>
            );
          })}
        </select>
        <div >
          {headers1.length > 0 && (
            <select className="select2"
              value={attribut1}
              onChange={(e) => setAttribut1(e.target.value)}
            >
              <option value={""}>please select an attribute</option>
              {headers1.map((element, index) => {
                return <option value={element}>{element}</option>;
              })}
            </select>
          )}
        </div>
        <div >
          {headers1.length > 0 && (
            <select className="select3"
              value={attribut2}
              onChange={(e) => setAttribut2(e.target.value)}
            >
              <option value={""}>please select an attribute</option>
              {headers1.map((element, index) => {
             

                return <option value={element}>{element}</option>;
              })}
            </select>
          )}
            {headers1.length > 0 && (
                <>
          <button className="buttonShow" onClick={handleProcess} >
           View
          </button>
           <button className="buttonShow"  onClick={saveInfoDashboard}>
           Save
          </button>
          <button  className="buttondownloadasimage" onClick={downloadImage}>download as image</button>
          <div style={{ marginLeft: 100 }}>
        <ReactToPrint
          trigger={() => <button className="printButton">Print this out!</button>}
          content={() => componentRef.current}
        />
        


      </div>
          </> )}

        </div>
        <div>
          {headers1.length > 0 && (
            <>
              <select 
               className="select4"
                defaultValue="Select Chart"
                onChange={(e) => setChart(e.target.value)}
              >
                   <option value="type">choose type of chart</option>
                <option value="bar">Bar Chart</option>
                <option value="pie">pie Chart</option>
                <option value="bubble">Bubble Chart</option>
                <option value="polararea">PolarArea Chart</option>
              </select>
              <div ref={componentRef}  > 
              <h1 className="selectechart">Selected Chart: {chart}</h1>
              <Chart   value={chart} /></div>
             
            </>
          )}
        </div>
      </div>

        <div>
            { show && (<JoinedChartAlert
                     attributes={alertAttributes}
                     labels={alertLabels}
                     data={alertData}
                     saved={saved}
                     setSaved={setSaved}
                     attribut1={attribut1}
                     attribut2={attribut2}
                     fileId={fileToDraw}
                     typeOfDashboard={chart}
  />
  )}
        </div>
        
    </React.Fragment>
    )
}


export default JoinedChart