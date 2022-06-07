import React, {useCallback, useEffect, useRef, useState} from "react";
import {downloadFiles, getUserJoinedFiles} from "../../services/axios";
import Swal from "sweetalert2";
import axios from "axios";
import ReactToPrint from "react-to-print";
import {Bar, Bubble, Pie, PolarArea} from "react-chartjs-2";
import JoinedChartAlert from "../alerts/JoinedChartAlert";



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
            console.log(response)

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
                console.log(response.data)
                const values = returnedData.map((element)=>parseFloat(element))
                console.log(labels)
                console.log(values)
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


                setSaved(response.data._id)
                 const Toast = Swal.mixin({
                  toast: true,
                  position: "bottom-right",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                });
          
                Toast.fire({
                  icon: "success",
                  title: 'chart Saved , You can chek your dashboards List',
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
    return (
        <div  style={{ marginTop: -200, marginLeft: -300 }}>
            <div>
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
            </div>

                {headers1.length > 0 && (
                    <>
                    <div>
                    <select className="select2"
                            value={attribut1}
                            onChange={(e) => setAttribut1(e.target.value)}
                    >
                        <option value={""}>_please select an attribut_</option>
                        {headers1.map((element, index) => {
                            let subElt = element.substring(2, element.length - 2);
                            if (index === 0) {
                                subElt = subElt.substring(1);
                            } else if (index === headers1.length - 1) {
                                subElt = subElt.substring(0, subElt.length - 2);
                            }

                            return <option value={element}>{element}</option>;
                        })}
                    </select>
                    </div>
                        <div>
                            <select className="select3"
                                    value={attribut2}
                                    onChange={(e) => setAttribut2(e.target.value)}
                            >
                                <option value={""}>_please select an attribut_</option>
                                {headers1.map((element, index) => {


                                    return <option value={element}>{element}</option>;
                                })}
                            </select>
                        </div>
                        <div>
                            <select
                                className="select8"
                                defaultValue="Select Chart"
                                onChange={(e) => setChart(e.target.value)}
                            >
                                <option value="type">choose type of chart</option>
                                <option value="bar">Bar Chart</option>
                                <option value="pie">pie Chart</option>
                                <option value="bubble">Bubble Chart</option>
                                <option value="polararea">PolarArea Chart</option>
                            </select>
                        </div>

                        <button className="buttonShow" onClick={handleProcess} >
                            View
                        </button>
                        <button className="buttonShow"  onClick={saveInfoDashboard}>
                            Save
                        </button>
                        <button  className="buttondownloadasimage" onClick={downloadImage}>download as image</button>
                    </>

                )}

            <div>
                {
                    show && (
                        <>
                            { chart ==="bar" && (
                                <div style={{height : '720px' , width : '750px',marginLeft : '-70px'}}>

                                    <Bar  ref={ref} options={options} data={graph} />
                                    <button   onClick={downloadImage}>download as image</button>
                                </div>
                            )}
                            { chart ==="polararea" && (
                                <div style={{height : '720px' , width : '750px',marginLeft : '-70px',marginTop:'-120px'}}>

                                    {<PolarArea  ref={ref} options={options} data={graph} />}
                                    <button  onClick={downloadImage}>download as image</button>
                                </div>
                            )}
                            { chart ==="pie" && (
                                <div style={{height : '720px' , width : '750px',marginLeft : '-70px',marginTop:'-120px'}}>

                                    {<Pie  ref={ref} options={options} data={graph} />}
                                    <button  onClick={downloadImage}>download as image</button>
                                </div>
                            )}
                            { chart ==="bubble" && (
                                <div style={{height : '720px' , width : '750px',marginLeft : '-70px',marginTop:'-120px'}}>

                                    {<Bubble  ref={ref} options={options} data={graph} />}
                                    <button  onClick={downloadImage}>download as image</button>
                                </div>

                            )}
                            <div >
                            <JoinedChartAlert  attributes={alertAttributes}
                                               labels={alertLabels}
                                               data={alertData}
                                               saved={saved}
                                               setSaved={setSaved}
                                               attribut1={attribut1}
                                               attribut2={attribut2}
                                               fileId={fileToDraw}
                                               typeOfDashboard={chart}
                            />
                            </div>
                        </>
                    )
                }


            </div>

        </div>
    )
}


export default JoinedChart